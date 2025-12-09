import { api } from "./axiosInstance";
import type { Note } from "@/types/note";

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams) {
  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: {
  title: string;
  content: string;
  tag?: string;
}) {
  const response = await api.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}
