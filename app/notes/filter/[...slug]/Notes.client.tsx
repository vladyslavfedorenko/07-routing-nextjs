"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

export default function Notes({ tag }: { tag: string }) {
  const [search, setSearch] = useState("");

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", tag, search],
    queryFn: () => fetchNotes({ tag, search }),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  return (
    <div className={css.wrapper}>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={css.search}
      />
      <ul className={css.list}>
        {notes?.map((note) => (
          <li key={note.id} className={css.item}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
