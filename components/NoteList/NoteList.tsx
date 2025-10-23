"use client";

import { Note } from "@/types/note";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Failed to delete note:", error);
    },
  });

  if (notes.length === 0) {
    return <p className={styles.empty}>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.item}>
          <div className={styles.header}>
            <h3 className={styles.title}>{note.title}</h3>
            <p className={styles.tag}>Tag: {note.tag}</p>
          </div>

          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            {/* ✅ переход открывает модалку с перехватом маршрута */}
            <Link href={`/notes/${note.id}`} className={styles.link}>
              View details
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
