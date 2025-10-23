import axios from "axios";
import { Note } from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL, // ✅ не "/api", а абсолютный адрес
});

/**
 * Получение списка заметок
 */
export const fetchNotes = async ({
  page = 1,
  q = "",
}: {
  page?: number;
  q?: string;
}): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (q && q.trim() !== "") params.q = q.trim();

  const res = await api.get<NotesResponse>("/notes", {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params,
  });

  return res.data;
};

/**
 * Получение одной заметки
 */
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};

/**
 * Создание новой заметки
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
 * Удаление заметки
 */
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};
