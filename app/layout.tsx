import type { Metadata } from "next";
import { MesubRoot } from "@/components/mesub-root";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desk",
  description: "Rent a desk at the London hacker house",
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
