import type { Metadata } from "next";
import css from "./LayoutNotes.module.css";

export const metadata: Metadata = {
  title: "Notes | NoteHub",
  description: "Browse and manage your notes easily",
};

export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.main}>{children}</section>
    </div>
  );
}
