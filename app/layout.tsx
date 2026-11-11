import type { Metadata } from "next";
import { MesubRoot } from "@/components/mesub-root";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rent-a-desk.vercel.app"),
  title: "Desk 01, London",
  description: "Too many builders, not enough desks. Rent mine at the London hacker house, 5 USDC an hour.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <MesubRoot>{children}</MesubRoot>
      </body>
    </html>
  );
}
