import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "ARSY Frucht | Най-вкусните ябълки в България",
  description: "ARSY Frucht - 100% натурално производство на ябълки, сокове, оцет и ракия от сърцето на планината в Първомай, България.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
