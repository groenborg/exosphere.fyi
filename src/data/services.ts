export interface Service {
  num: string;
  name: string;
  desc: string;
  duration: string;
}

export const services: Service[] = [
  {
    num: "/ 001",
    name: "Product design",
    desc: "End-to-end design from kickoff to launch. Research, IA, UI, motion and a built prototype.",
    duration: "6–14 weeks",
  },
  {
    num: "/ 002",
    name: "Automation systems",
    desc: "Internal tooling, scripts and integrations that quietly run your operation in the background.",
    duration: "2–8 weeks",
  },
  {
    num: "/ 003",
    name: "Build & ship",
    desc: "A small team building your product. Full-stack, native or web — staying through launch and beyond.",
    duration: "Ongoing",
  },
  {
    num: "/ 004",
    name: "Studio residency",
    desc: "Embed with us for a sprint. We pair, we ship, your team leaves with the keys and the muscle memory.",
    duration: "2 weeks",
  },
  {
    num: "/ 005",
    name: "Joyful experiments",
    desc: "A weird microsite, a launch toy, an interactive press kit. We love these. Bring us yours.",
    duration: "1–3 weeks",
  },
];
