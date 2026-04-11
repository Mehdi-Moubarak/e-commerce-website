import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} — ArtBS` : "ArtBS";
    return () => {
      document.title = "ArtBS";
    };
  }, [title]);
};

export default usePageTitle;
