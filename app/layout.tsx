import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — manage your notes easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
