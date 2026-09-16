import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo logo--approved" href="/" aria-label="FM Tecnologia — início">
      <Image
        className="logo-image"
        src="/brand/fm-tecnologia-approved.svg"
        alt="FM Tecnologia"
        width={660}
        height={150}
        priority
        unoptimized
      />
      <span className="logo-slogan">IA para melhorar hoje e evoluir o amanhã.</span>
    </Link>
  );
}
