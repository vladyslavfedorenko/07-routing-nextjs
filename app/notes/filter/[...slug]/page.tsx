import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

interface FilteredNotesPageProps {
  // ⚡ В Next.js 15 params может быть Promise
  params: Promise<{ tag?: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  // ✅ Достаём params асинхронно (чтобы не было ошибки “params is a Promise”)
  const resolvedParams = await params;
  const tag = resolvedParams.tag?.[0];

  // ✅ Если "all" — тег не передаём, иначе фильтруем по тегу
  const queryTag = tag === "all" ? undefined : tag;

  // ✅ Запрашиваем заметки с фильтром
  const data = await fetchNotes({ q: queryTag });

  // ✅ Передаём их в клиентский компонент
  return <NotesClient initialNotes={data.notes} />;
}
