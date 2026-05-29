export type CapabilityIcon = "automation" | "design" | "software" | "experiences";

export interface Capability {
  num: string;
  title: string;
  body: string;
  icon: CapabilityIcon;
}

export const capabilities: Capability[] = [
  {
    num: "— 01",
    title: "Automation",
    body: "Internal tools, integrations and quietly-running services that take the boring out of your day.",
    icon: "automation",
  },
  {
    num: "— 02",
    title: "Design",
    body: "Interfaces, identity systems and motion — drawn with the care of someone who is going to use them every day.",
    icon: "design",
  },
  {
    num: "— 03",
    title: "Software",
    body: "Web apps, desktop tools and the odd CLI. Boringly reliable on the inside, delightful on the outside.",
    icon: "software",
  },
  {
    num: "— 04",
    title: "Experiences",
    body: "Installations, microsites, weird little websites — the kind of work people screenshot and send to a friend.",
    icon: "experiences",
  },
];
