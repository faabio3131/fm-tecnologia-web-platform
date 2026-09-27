import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
type Props = { children: ReactNode; variant?: "primary"|"secondary"|"ghost" } & ComponentProps<typeof Link>;
export function ButtonLink({children,variant="primary",className="",...props}:Props){return <Link className={`button button--${variant} ${className}`} {...props}>{children}<span aria-hidden="true">→</span></Link>}
