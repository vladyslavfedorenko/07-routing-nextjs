import { fetchNotes } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";

interface FilteredNotesPageProps {
  params: Promise<{ tag?: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag?.[0];

  const queryTag = tag === "all" ? undefined : tag;

  const data = await fetchNotes({ q: queryTag });

  return <NotesClient initialNotes={data.notes} />;
}
