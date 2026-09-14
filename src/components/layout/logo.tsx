import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="FM Tecnologia — início">
      <span>FM <b>TECNOLOGIA</b></span>
    </Link>
  );
}
