import { Metadata } from "next";

const url = "https://www.onefileapp.com";

export const metadata: Metadata = {
  title: "OneFile Blog - Tips & Guides for AI File Uploads",
  description:
    "Explore guides, tips, and tutorials on bypassing AI upload limits. Learn how to use OneFile with ChatGPT, Claude, Gemini, and more.",
  openGraph: {
    title: "OneFile Blog - Tips & Guides for AI File Uploads",
    description:
      "Explore guides, tips, and tutorials on bypassing AI upload limits. Learn how to use OneFile with ChatGPT, Claude, Gemini, and more.",
    url: `${url}/blog`,
    type: "website",
  },
  twitter: {
    title: "OneFile Blog - Tips & Guides for AI File Uploads",
    description:
      "Explore guides, tips, and tutorials on bypassing AI upload limits. Learn how to use OneFile with ChatGPT, Claude, Gemini, and more.",
  },
  alternates: {
    canonical: `${url}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
