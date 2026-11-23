import { ui } from "@/data/ui";
import type { LText } from "@/lib/i18n";

export type NavItem = { id: string; label: LText };

/** Section ids must match the <section id> values on the home page. */
export const navItems: NavItem[] = [
  { id: "about", label: ui.nav.about },
  { id: "classes", label: ui.nav.classes },
  { id: "projects", label: ui.nav.projects },
  { id: "skills", label: ui.nav.skills },
  { id: "experience", label: ui.nav.experience },
  { id: "contact", label: ui.nav.contact },
];
