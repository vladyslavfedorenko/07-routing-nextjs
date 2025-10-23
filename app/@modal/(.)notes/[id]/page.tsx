import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}
export default async function NoteModalPage({ params }: NoteModalProps) {
  const { id } = await params;

  if (!id) {
    console.error("❌ Нет ID заметки");
    return <p>Note ID is missing</p>;
  }
  console.log("🟡 [NoteModalPage] Загружаем заметку с ID:", id);
  let note;
  try {
    note = await fetchNoteById(id);
  } catch (error) {
    console.error("❌ Ошибка при получении заметки:", error);

    return <p>Note not found</p>;
  }

  return <NotePreview note={note} />;
}
