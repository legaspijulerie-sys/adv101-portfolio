import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "../data";

const KEY = "portfolio-photo";

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// A tiny shared store so the sidebar avatar and the About photo stay in sync.
let current: string | null = read();
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const emit = () => listeners.forEach((l) => l());

export function setPhoto(dataUrl: string | null) {
  current = dataUrl;
  try {
    if (dataUrl) localStorage.setItem(KEY, dataUrl);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage full or blocked: the photo still works until the page is closed */
  }
  emit();
}

/** Shrinks a chosen image so it is small enough to store in the browser. */
export function fileToDataUrl(file: File, max = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file is not an image"));
    };
    img.src = url;
  });
}

// Is there a file at public/profile.jpg?  (checked once)
let fileCheck: Promise<boolean> | null = null;
function checkFile(): Promise<boolean> {
  fileCheck ??= new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = profile.photoPath;
  });
  return fileCheck;
}

/**
 * Returns the picture to show:
 * 1. the one chosen in the browser, otherwise
 * 2. the file at public/profile.jpg, otherwise
 * 3. null (a placeholder is shown).
 */
export function usePhoto() {
  const uploaded = useSyncExternalStore(subscribe, () => current);
  const [fileOk, setFileOk] = useState(false);

  useEffect(() => {
    let alive = true;
    checkFile().then((ok) => alive && setFileOk(ok));
    return () => {
      alive = false;
    };
  }, []);

  const src = profile.photoEditable
    ? uploaded ?? (fileOk ? profile.photoPath : null)
    : fileOk
      ? profile.photoPath
      : null;
  return { src, uploaded: profile.photoEditable && uploaded !== null };
}
