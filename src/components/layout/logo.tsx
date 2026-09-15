import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo logo--approved" href="/" aria-label="FM Tecnologia — início">
      <Image
        className="logo-image"
        src="/brand/fm-tecnologia-approved.svg"
        alt=""
        width={264}
        height={162}
        priority
        unoptimized
      />
    </Link>
  );
}
