import { fetchNotes } from "@/lib/api";
import NotesClient from "./filter/[...slug]/Notes.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // 🔹 Загружаем данные с сервера
  const data = await fetchNotes({ page: 1 });

  // 🔹 Префетчим их в кэш для React Query
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  // 🔹 Возвращаем готовую страницу с начальными данными
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* ✅ Обязательно передаём initialNotes */}
      <NotesClient initialNotes={data.notes} />
    </HydrationBoundary>
  );
}
