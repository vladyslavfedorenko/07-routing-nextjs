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

  // Получаем заметку вне try/catch JSX
  let note;
  try {
    note = await fetchNoteById(id);
  } catch (error) {
    console.error("❌ Ошибка при получении заметки:", error);
    // Возвращаем безопасный JSX уже вне try
    return <p>Note not found</p>;
  }

  // ✅ Теперь JSX вне блока try — линтер доволен
  return <NotePreview note={note} />;
}
