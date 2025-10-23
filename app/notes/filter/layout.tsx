import type { Metadata } from "next";
import css from "./LayoutNotes.module.css";
import SidebarNotes from "./@sidebar/SidebarNotes";

export const metadata: Metadata = {
  title: "Notes | NoteHub",
  description: "Browse and manage your notes easily",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.layout}>
      {/* Сайдбар */}
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>

      {/* Основной контент */}
      <section className={css.main}>{children}</section>
    </div>
  );
}
