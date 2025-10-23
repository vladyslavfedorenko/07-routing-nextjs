import axios from "axios";
import { Note } from "@/types/note";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

// ✅ Создаем axios-инстанс с правильным baseURL
const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * ✅ Получение списка заметок с поддержкой фильтрации по тегу, поиску и пагинации
 */
export const fetchNotes = async ({
  page = 1,
  q,
  tag,
}: {
  page?: number;
  q?: string;
  tag?: string;
} = {}): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page };

  if (q && q.trim() !== "") params.q = q.trim();
  if (tag && tag.trim() !== "") params.tag = tag.trim();

  const res = await api.get<NotesResponse>("/notes", {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params,
  });

  return res.data;
};

/**
 * ✅ Получение одной заметки по id
 */
export const fetchNoteById = async (id: string): Promise<Note> => {
  console.log("🟡 [fetchNoteById] Запрашиваем заметку с ID:", id); // <-- вот этот лог

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  console.log("🟢 [fetchNoteById] Успешно получили заметку:", res.data?.title); // <-- лог успешного ответа

  return res.data;
};

/**
 * ✅ Создание новой заметки
 */
export const createNote = async (
  note: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {
  const res = await api.post<Note>("/notes", note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};

/**
 * ✅ Удаление заметки
 */
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};
