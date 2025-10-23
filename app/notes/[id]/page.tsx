import axios from "axios";
import css from "./NotePage.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

export async function getNoteById(id: string): Promise<Note> {
  const res = await axios.get(`https://your-api-url/notes/${id}`);
  return res.data;
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id);

  return (
    <div className={css.note}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>#{note.tag}</span>
    </div>
  );
}
