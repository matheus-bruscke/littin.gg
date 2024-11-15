import { useEffect, useState } from "react";

enum MEDIA_QUERIES {
  MOBILE = "(max-width: 768px)",
  TABLET = "(max-width: 1024px)",
  DESKTOP = "(min-width: 1024px)",
}

const useMedia = (query: MEDIA_QUERIES) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export { MEDIA_QUERIES };
export default useMedia;
