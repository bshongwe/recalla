//import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Recalla App",
  description: "An app that lets users create flashcards to streamline their study process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased")}>{children}</body>
    </html>
  );
}