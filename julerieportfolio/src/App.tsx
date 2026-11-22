import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Background from "./components/Background";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";

export type PageId = "about" | "projects" | "skills" | "contact";

const pages: Record<PageId, () => JSX.Element> = {
  about: About,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};

function fromHash(): PageId {
  const id = window.location.hash.replace("#", "") as PageId;
  return id in pages ? id : "about";
}

export default function App() {
  const [page, setPage] = useState<PageId>(fromHash());

  useEffect(() => {
    const onHash = () => setPage(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Start each page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const Page = pages[page];

  return (
    <div className="layout">
      <Background />
      <Sidebar current={page} />
      <main className="content" id="main">
        {/* key = replay the entrance animation on every page change */}
        <div className="page" key={page}>
          <Page />
        </div>
      </main>
    </div>
  );
}
