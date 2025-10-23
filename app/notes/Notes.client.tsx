"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  initialNotes: Note[];
  tag?: string; // ✅ добавили тег для фильтрации
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["notes", page, tag],
    queryFn: () => fetchNotes({ page, tag }),
    initialData: { notes: initialNotes, totalPages: 1 },
    refetchOnMount: false,
  });

  // ✅ если тег изменился — обновляем список
  useEffect(() => {
    refetch();
  }, [tag, refetch]);

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes 😢</p>;

  return (
    <div>
      <NoteList notes={data?.notes || []} />

      {/* Пагинация — по желанию */}
      {data?.totalPages && data.totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span style={{ margin: "0 8px" }}>Page {page}</span>
          <button
            onClick={() =>
              setPage((p) =>
                data?.totalPages ? Math.min(p + 1, data.totalPages) : p + 1
              )
            }
            disabled={page === data?.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
