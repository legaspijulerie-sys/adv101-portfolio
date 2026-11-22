import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "../data";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  // Default: the file you place at public/resume.pdf.
  // Optional: a file picked in the browser (preview only, not saved).
  const [src, setSrc] = useState<string>(profile.resumePath);
  const [missing, setMissing] = useState(false);
  const objectUrl = useRef<string | null>(null);

  // Check whether public/resume.pdf exists yet.
  useEffect(() => {
    fetch(profile.resumePath, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        setMissing(!r.ok || type.includes("text/html"));
      })
      .catch(() => setMissing(true));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, [onClose]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setSrc(objectUrl.current);
    setMissing(false);
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <h2>Resume</h2>
          <div className="modal-actions">
            <label className="btn btn-light">
              Upload a file
              <input type="file" accept="application/pdf" onChange={onPick} hidden />
            </label>
            {!missing && (
              <a className="btn btn-light" href={src} download="resume.pdf">
                Download
              </a>
            )}
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </header>
        {missing ? (
          <div className="modal-empty">
            <p><strong>No resume uploaded yet.</strong></p>
            <p>
              Save your PDF as <code>public/resume.pdf</code> and refresh, or use
              “Upload a file” to preview one now.
            </p>
          </div>
        ) : (
          <iframe title="Resume" src={src} className="modal-frame" />
        )}
      </div>
    </div>,
    document.body
  );
}
