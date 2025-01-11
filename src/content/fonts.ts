import localFont from "next/font/local";

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

const aspekta = localFont({
  variable: "--font-aspekta",
  src: [
    {
      path: "../../public/fonts/aspekta/light.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/regular.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export { fragmentMono, aspekta };
