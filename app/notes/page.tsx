import { fetchNotes } from "@/lib/api";
import NotesClient from "./filter/[...slug]/Notes.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const data = await fetchNotes({ page: 1 });

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {}
      <NotesClient initialNotes={data.notes} />
    </HydrationBoundary>
  );
}
