import { useRef, useState, type DragEvent } from "react";
import { profile } from "../data";
import { fileToDataUrl, setPhoto, usePhoto } from "../hooks/usePhoto";

const initials = profile.name
  .split(" ")
  .map((n) => n[0])
  .join("");

/** Small round version used in the sidebar (not editable). */
export function MiniAvatar() {
  const { src } = usePhoto();
  return (
    <div className="avatar" aria-hidden="true">
      {src ? <img src={src} alt="" /> : initials}
    </div>
  );
}

function Orbit() {
  return (
    <div className="orbit" aria-hidden="true">
      <span className="chip c1"><i>&lt;/&gt;</i></span>
      <span className="chip c2"><i>{"{ }"}</i></span>
      <span className="chip c3"><i>Java</i></span>
      <span className="chip c4"><i>CSS</i></span>
    </div>
  );
}

/** The big photo slot on the About page. Click it, or drop an image on it. */
export default function ProfilePhoto() {
  const { src, uploaded } = usePhoto();
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  // Visitors of the finished site: show the photo only, no edit controls.
  if (!profile.photoEditable) {
    return (
      <div className="photo-wrap">
        <Orbit />
        <div className="photo static has-img">
          {src ? <img src={src} alt={`Portrait of ${profile.name}`} /> : <span className="photo-initials">{initials}</span>}
        </div>
      </div>
    );
  }

  const handle = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    try {
      setError("");
      setPhoto(await fileToDataUrl(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that image.");
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handle(e.dataTransfer.files[0]);
  };

  return (
    <div className="photo-wrap">
      <Orbit />

      <button
        type="button"
        className={"photo" + (src ? " has-img" : "") + (drag ? " drag" : "")}
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        aria-label={src ? "Change your photo" : "Add your photo"}
      >
        {src ? (
          <img src={src} alt={`Portrait of ${profile.name}`} />
        ) : (
          <span className="photo-empty">
            <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z M12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              />
            </svg>
            <strong>Add your photo</strong>
            <small>Click or drop an image here</small>
          </span>
        )}
        <span className="photo-hover">{src ? "Change photo" : "Choose photo"}</span>
        {src && <span className="photo-badge" aria-hidden="true">✎</span>}
      </button>

      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handle(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {uploaded && (
        <button type="button" className="photo-remove" onClick={() => setPhoto(null)}>
          Remove photo
        </button>
      )}
      {error && <p className="photo-error" role="alert">{error}</p>}
    </div>
  );
}
