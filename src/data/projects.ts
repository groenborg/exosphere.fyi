export interface Project {
  title: string;
  meta: string;
  body: string;
  tags: string[];
  size: 'lg' | 'md' | 'sm';
  visualLabel?: string;
}

export const projects: Project[] = [
  {
    title: 'Helios Control',
    meta: '2024 · Industrial',
    body: 'A monitoring console for a fleet of off-grid power stations. We turned a 14-tab dashboard into a single, calm room you can run from your phone.',
    tags: ['Design', 'Software', 'Automation'],
    size: 'lg',
    visualLabel: '[ Helios Control · screenshot slot ]',
  },
  {
    title: 'Pocket Observatory',
    meta: '2023 · Consumer',
    body: 'A pocket-sized app that turns your phone toward the sky and whispers the names of the stars overhead.',
    tags: ['Design', 'iOS'],
    size: 'md',
    visualLabel: '[ Observatory · screenshot slot ]',
  },
  {
    title: 'Tinpot',
    meta: '2023 · Experiment',
    body: 'A toy synth that turns office Slack into ambient music. Yes, really.',
    tags: ['Joyful', 'Audio'],
    size: 'sm',
  },
  {
    title: 'Foundry CMS',
    meta: '2022 · Internal',
    body: 'A bespoke CMS we built for a children’s magazine. Editing feels like decorating a notebook.',
    tags: ['Software', 'Editorial'],
    size: 'sm',
  },
  {
    title: 'Routine',
    meta: '2021 · Self-initiated',
    body: 'A weather-aware calendar that gently nudges you outside on the good days.',
    tags: ['Design', 'macOS'],
    size: 'sm',
  },
];
