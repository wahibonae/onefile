import { NextRequest, NextResponse } from "next/server";
import { Innertube } from "youtubei.js";

interface CaptionTrack {
  base_url: string;
  name?: { text?: string };
  language_code?: string;
  vss_id?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { videoId } = await req.json();

    if (!videoId || typeof videoId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid videoId" },
        { status: 400 }
      );
    }

    // Validate video ID format (11 characters, alphanumeric with - and _)
    if (!/^[\w-]{11}$/.test(videoId)) {
      return NextResponse.json(
        { error: "Invalid video ID format" },
        { status: 400 }
      );
    }

    // Create Innertube client
    const yt = await Innertube.create({
      generate_session_locally: true,
    });

    // Get video info
    const info = await yt.getInfo(videoId);

    if (!info) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Get caption tracks from the video info
    const captionTracks = info.captions?.caption_tracks as CaptionTrack[] | undefined;

    if (!captionTracks || captionTracks.length === 0) {
      return NextResponse.json(
        {
          error:
            "No captions available for this video. The video may not have subtitles enabled.",
        },
        { status: 404 }
      );
    }

    // Prefer English captions, fallback to first available
    let selectedTrack = captionTracks.find(
      (track) =>
        track.language_code === "en" ||
        track.language_code?.startsWith("en-") ||
        track.vss_id?.includes(".en")
    );

    if (!selectedTrack) {
      // Try to find auto-generated English captions
      selectedTrack = captionTracks.find(
        (track) =>
          track.vss_id?.includes("a.en") || track.name?.text?.toLowerCase().includes("english")
      );
    }

    if (!selectedTrack) {
      // Fallback to first available track
      selectedTrack = captionTracks[0];
    }

    if (!selectedTrack?.base_url) {
      return NextResponse.json(
        { error: "Could not find a valid caption track" },
        { status: 404 }
      );
    }

    // Fetch the captions XML - request JSON format for easier parsing
    const captionUrl = new URL(selectedTrack.base_url);
    captionUrl.searchParams.set("fmt", "json3");

    const captionResponse = await fetch(captionUrl.toString());

    if (!captionResponse.ok) {
      // Fallback to XML format if JSON fails
      const xmlResponse = await fetch(selectedTrack.base_url);
      if (!xmlResponse.ok) {
        throw new Error("Failed to fetch captions");
      }

      const xmlText = await xmlResponse.text();
      const transcriptText = parseXmlCaptions(xmlText);

      if (!transcriptText) {
        return NextResponse.json(
          { error: "Failed to parse captions" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        videoId,
        videoTitle: info.basic_info?.title || null,
        channelName: info.basic_info?.author || null,
        transcript: transcriptText,
        language: selectedTrack.language_code || "unknown",
      });
    }

    const captionData = await captionResponse.json();
    const transcriptText = parseJsonCaptions(captionData);

    if (!transcriptText) {
      return NextResponse.json(
        { error: "Transcript is empty" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      videoId,
      videoTitle: info.basic_info?.title || null,
      channelName: info.basic_info?.author || null,
      transcript: transcriptText,
      language: selectedTrack.language_code || "unknown",
    });
  } catch (error) {
    console.error("YouTube transcript error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("Video unavailable")) {
        return NextResponse.json(
          { error: "Video is unavailable or private" },
          { status: 404 }
        );
      }
      if (error.message.includes("Sign in")) {
        return NextResponse.json(
          { error: "Video requires sign-in to access" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch transcript. Please try again." },
      { status: 500 }
    );
  }
}

function parseJsonCaptions(data: { events?: Array<{ segs?: Array<{ utf8?: string }> }> }): string {
  if (!data.events) return "";

  const texts: string[] = [];

  for (const event of data.events) {
    if (event.segs) {
      for (const seg of event.segs) {
        if (seg.utf8 && seg.utf8.trim() !== "\n") {
          texts.push(seg.utf8);
        }
      }
    }
  }

  return texts
    .join("")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseXmlCaptions(xml: string): string {
  // Parse XML captions format: <text start="0" dur="5.2">Caption text</text>
  const textMatches = Array.from(xml.matchAll(/<text[^>]*>([^<]*)<\/text>/g));
  const texts: string[] = [];

  for (const match of textMatches) {
    const text = match[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .trim();

    if (text) {
      texts.push(text);
    }
  }

  return texts.join(" ").replace(/\s+/g, " ").trim();
}
