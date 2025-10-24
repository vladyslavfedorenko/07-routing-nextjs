"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <button onClick={() => router.back()} className={css.closeBtn}>
          ✖
        </button>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
      </div>
    </div>
  );
}
