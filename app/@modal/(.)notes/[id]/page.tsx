import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

function getQueryClient() {
  return new QueryClient();
}

export default async function NoteModalPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={params.id} />
    </HydrationBoundary>
  );
}
