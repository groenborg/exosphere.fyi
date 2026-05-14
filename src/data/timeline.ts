export interface TimelineEntry {
  year: string;
  title: string;
  desc: string;
  current?: boolean;
  titleHtml?: string;
  descHtml?: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: '2014',
    title: 'Liftoff.',
    desc: 'Astrid, Mikkel and June quit their day jobs, rent a one-room studio above a bakery, and ship the first thing: a printable monthly calendar that nobody asked for. It does well.',
  },
  {
    year: '2015',
    title: 'First long-form client.',
    desc: 'A six-month engagement with a regional broadcaster turns into an internal toolset still in use today. The studio learns the long-haul taste of “ship and stay around.”',
  },
  {
    year: '2017',
    title: 'Move to the loft.',
    desc: 'We outgrow the bakery and move into a glass-roofed loft with a view of three church spires. Saoirse and Theo join. The motion practice is born.',
  },
  {
    year: '2019',
    title: '“Joyful experiments” becomes a service line.',
    desc: 'A weekend project — a generative greeting-card site — goes mildly viral. We start charging for the weird stuff.',
  },
  {
    year: '2020',
    title: 'Remote orbits.',
    desc: 'The studio goes hybrid. Lena, Otieno and Noor join from three different countries. The first all-hands happens on a video call with everyone in their kitchens.',
  },
  {
    year: '2022',
    title: 'Foundry CMS & Pocket Observatory.',
    desc: 'Two of our favourite projects ship in the same quarter. One is for ten-year-olds, the other for stargazers. We notice they have the same heartbeat.',
  },
  {
    year: '2024',
    title: 'Helios Control goes live.',
    desc: 'Our largest engagement to date, running quietly across forty off-grid power stations. We learn how to design for a screen nobody wants to look at.',
  },
  {
    year: '2026',
    title: '',
    titleHtml: '<em>Now</em> — twelve years in, still grinning.',
    desc: '',
    descHtml:
      'Eight humans, one mantra, and a steady queue of work we’d happily do for free if we had to. We don’t have to. We’re <a href="mailto:hello@exosphere.studio" style="color:var(--accent);">open for new orbits</a>.',
    current: true,
  },
];
