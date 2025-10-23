"use client";

import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Если модалка закрыта — не рендерим
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри
      >
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>{children}</div>

        <button type="button" className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
