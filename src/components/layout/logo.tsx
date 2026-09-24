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


export function PremiumLogo({ showSlogan = false }: { showSlogan?: boolean }) {
  return (
    <Link className="fm-premium-lockup" href="/" aria-label="FM Tecnologia — início">
      <span className="fm-premium-lockup__mark" aria-hidden="true"><i /><i /></span>
      <span className="fm-premium-lockup__text">
        <strong>FM Tecnologia</strong>
        {showSlogan ? <small>IA para melhorar hoje e evoluir o amanhã.</small> : null}
      </span>
    </Link>
  );
}
