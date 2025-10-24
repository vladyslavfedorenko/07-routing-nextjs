import Notes from "./Notes.client";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] || "all";

  return <Notes tag={tag} />;
}
