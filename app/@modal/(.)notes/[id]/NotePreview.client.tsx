"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";
import styles from "@/components/NotePreview/NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // возвращаемся на предыдущий маршрут
  };

  return (
    <Modal isOpen={true} onClose={handleClose} title={note.title}>
      <div className={styles.noteContent}>
        <p className={styles.tag}>Tag: {note.tag}</p>
        <p className={styles.content}>{note.content}</p>
      </div>
    </Modal>
  );
}
