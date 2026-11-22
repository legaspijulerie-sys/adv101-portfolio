import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "../data";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const [missing, setMissing] = useState(false);

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
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
            {!missing && (
              <a className="btn btn-light" href={profile.resumePath} download="resume.pdf">
                Download
              </a>
            )}
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </header>
        {missing ? (
          <div className="modal-empty">
            <p><strong>No resume is available yet.</strong></p>
            <p>Save your PDF as <code>public/resume.pdf</code> and redeploy.</p>
          </div>
        ) : (
          <iframe title="Resume" src={profile.resumePath} className="modal-frame" />
        )}
      </div>
    </div>,
    document.body
  );
}
