import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

interface FilteredNotesPageProps {
  params: Promise<{ tag?: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { tag } = await params;

  // Берём тег из URL
  const selectedTag = tag?.[0];

  // Если "all" — убираем фильтр
  const queryTag =
    selectedTag && selectedTag !== "all" ? selectedTag : undefined;

  // ✅ Передаём "tag", не "q"
  const data = await fetchNotes(queryTag ? { tag: queryTag } : {});

  return <NotesClient initialNotes={data.notes} />;
}
