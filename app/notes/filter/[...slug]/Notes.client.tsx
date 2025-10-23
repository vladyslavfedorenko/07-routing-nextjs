"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  initialNotes: Note[];
}

export default function NotesClient({ initialNotes }: NotesClientProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ page, q: "" }),
    initialData: { notes: initialNotes, totalPages: 1 },
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return <NoteList notes={data?.notes || []} />;
}
