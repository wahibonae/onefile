import { FileWithContent } from "@/types";

const DB_NAME = "onefile-storage";
const STORE_NAME = "files";
const FILES_KEY = "temp-files";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveFiles(files: FileWithContent[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(files, FILES_KEY);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export async function loadFiles(): Promise<FileWithContent[] | null> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const request = tx.objectStore(STORE_NAME).get(FILES_KEY);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      db.close();
      const result = request.result as FileWithContent[] | undefined;
      resolve(result && Array.isArray(result) && result.length > 0 ? result : null);
    };
    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

export async function clearFiles(): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(FILES_KEY);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}
