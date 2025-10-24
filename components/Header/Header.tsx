import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link> {}
          </li>
        </ul>
      </nav>
    </header>
  );
}
