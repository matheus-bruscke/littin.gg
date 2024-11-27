import localFont from "next/font/local";

const helveticaNeue = localFont({
  variable: "--font-body",
  src: [
    {
      path: "../../public/fonts/helvetica-neue/thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-neue/black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

const fragmentMono = localFont({
  variable: "--font-mono",
  src: [
    {
      path: "../../public/fonts/fragment-mono/regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fragment-mono/italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

export { helveticaNeue, fragmentMono };
