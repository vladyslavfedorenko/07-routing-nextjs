import axios from "axios";
import type { Note } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes({
  search,
  tag,
}: {
  search?: string;
  tag?: string;
}): Promise<Note[]> {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (tag && tag !== "all") params.tag = tag;

  const { data } = await axiosInstance.get("/notes", { params });

  // API GoIT возвращает объект с массивом внутри
  return Array.isArray(data) ? data : data.notes || [];
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(
  note: Pick<Note, "title" | "content" | "tag">
): Promise<Note> {
  const { data } = await axiosInstance.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
  return data;
}
