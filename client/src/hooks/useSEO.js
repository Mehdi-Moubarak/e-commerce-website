import { useEffect } from "react";

const useSEO = ({ title, description, keywords } = {}) => {
  useEffect(() => {
    if (title) document.title = `${title} — ArtBS`;

    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setOG = (property, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setOG("og:title", title ? `${title} — ArtBS` : undefined);
    setOG("og:description", description);
    setOG("og:type", "website");
  }, [title, description, keywords]);
};

export default useSEO;
