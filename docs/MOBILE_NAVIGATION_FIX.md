# Mobile navigation correction — 2026-09-14

User testing on Android exposed a persistent dropdown obscuring content while the page scrolled behind it. The header also allowed background text to show through.

- Replace the native details dropdown with a client component using a modal dialog.
- Opaque viewport-sized panel with a visible close button and independently scrolling navigation.
- Lock background scrolling while open; native modal behavior isolates keyboard focus and background interaction.
- Close on navigation, Escape, and transition to desktop width. Remove scroll lock on close and unmount.
- Preserve existing routes, commercial labels, contact details, and visual palette.
- Make the site header opaque.

Validation: source reviewed against parent 935ccf94f4a767d51a45273bad75c9a079907d47. Local shell/browser unavailable in this session, so no local build, automated interaction, or touch test is claimed. Cloudflare build status must be checked after commit. User retest required: open after scrolling, try scrolling background, reach final contact link, close via button, choose route (including current route), reopen, rotate device, and verify restored page scrolling. Keyboard Escape/focus and short landscape viewport also require runtime verification.

No merge, authentication, trial activation, product claims, or other SaaS changes.
