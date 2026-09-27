"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/src/config/site";
import { approvedCtaLabels } from "@/src/catalog/commerce";
import { ButtonLink } from "@/src/components/ui/button-link";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.documentElement.classList.remove("mobile-navigation-open");
    };
  }, []);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add("mobile-navigation-open");
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
    document.documentElement.classList.remove("mobile-navigation-open");
    setIsOpen(false);
  }

  return (
    <div className="mobile-menu">
      <button type="button" className="mobile-menu-toggle" aria-label="Abrir menu"
        aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={isOpen}
        onClick={openMenu}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <dialog ref={dialogRef} id="mobile-navigation" className="mobile-dialog"
        aria-labelledby="mobile-menu-title" onClose={closeMenu}>
        <div className="mobile-dialog-header">
          <strong id="mobile-menu-title">Menu · FM Tecnologia</strong>
          <button type="button" className="mobile-menu-close" onClick={closeMenu}>
            Fechar <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Navegação móvel" className="mobile-dialog-nav">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
          ))}
          <Link href="/entrar" onClick={closeMenu}>Entrar</Link>
          <div className="mobile-dialog-actions">
            <ButtonLink href="/precos" onClick={closeMenu}>{approvedCtaLabels.plans}</ButtonLink>
            <ButtonLink href="/contato" variant="secondary" onClick={closeMenu}>{approvedCtaLabels.specialist}</ButtonLink>
          </div>
        </nav>
      </dialog>
    </div>
  );
}
