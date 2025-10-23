import { fetchNotes } from "@/lib/api";
import NotesClient from "../Notes.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

/**
 * Главная страница списка заметок (/notes)
 * Выполняет SSR-загрузку заметок и передаёт их в клиентский компонент
 */
export default async function NotesPage() {
  const queryClient = new QueryClient();

  // 🔹 Получаем список заметок на первой странице
  const data = await fetchNotes({ page: 1 });

  // 🔹 Префетчим их в React Query кэш
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  // 🔹 Возвращаем клиентский компонент с начальными заметками
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={data.notes} />
    </HydrationBoundary>
  );
}
