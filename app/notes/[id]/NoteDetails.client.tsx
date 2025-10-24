"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";

export default function NoteDetails({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>Tag: {note.tag}</p>
        <p className={css.date}>
          Created:{" "}
          {note.createdAt
            ? new Date(note.createdAt).toLocaleDateString()
            : "Unknown date"}
        </p>
        <button className={css.button} onClick={() => router.back()}>
          Close
        </button>
      </div>
    </div>
  );
}
