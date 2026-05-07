export type Course = {
  id: string;
  title: string;
  code: string;
  description: string;
  price: number;
  hours: number;
  lessons: number;
  instructor: string;
  semester: number;
  accent: string;
};

export const courses: Course[] = [
  {
    id: "constitutional-law-i",
    title: "Constitutional Law I",
    code: "LB-201",
    description: "Foundational doctrines, fundamental rights, and landmark judgments shaping the Indian Constitution.",
    price: 1499,
    hours: 28,
    lessons: 42,
    instructor: "Prof. Aarav Mehta",
    semester: 2,
    accent: "from-amber-400/30 to-rose-400/20",
  },
  {
    id: "law-of-contracts",
    title: "Law of Contracts",
    code: "LB-103",
    description: "Indian Contract Act 1872 with case-driven analysis of offer, acceptance, consideration & remedies.",
    price: 1299,
    hours: 22,
    lessons: 36,
    instructor: "Dr. Ishita Rao",
    semester: 1,
    accent: "from-emerald-400/30 to-teal-400/20",
  },
  {
    id: "criminal-law",
    title: "Criminal Law (IPC)",
    code: "LB-104",
    description: "Indian Penal Code in depth — mens rea, actus reus, general exceptions and offences against the body.",
    price: 1599,
    hours: 30,
    lessons: 48,
    instructor: "Adv. Karan Singh",
    semester: 1,
    accent: "from-rose-400/30 to-orange-400/20",
  },
  {
    id: "law-of-torts",
    title: "Law of Torts & CPA",
    code: "LB-102",
    description: "Negligence, nuisance, defamation and Consumer Protection Act with PYQs and model answers.",
    price: 1199,
    hours: 20,
    lessons: 32,
    instructor: "Prof. Naina Kapoor",
    semester: 1,
    accent: "from-sky-400/30 to-indigo-400/20",
  },
  {
    id: "family-law",
    title: "Family Law I",
    code: "LB-202",
    description: "Hindu Law — marriage, succession, adoption and maintenance with comparative perspectives.",
    price: 1299,
    hours: 24,
    lessons: 38,
    instructor: "Dr. Vikram Joshi",
    semester: 2,
    accent: "from-violet-400/30 to-fuchsia-400/20",
  },
  {
    id: "jurisprudence",
    title: "Jurisprudence",
    code: "LB-301",
    description: "Schools of legal thought — Austin, Hart, Kelsen, Dworkin — distilled into exam-ready frameworks.",
    price: 1399,
    hours: 26,
    lessons: 40,
    instructor: "Prof. Aarav Mehta",
    semester: 3,
    accent: "from-yellow-400/30 to-amber-400/20",
  },
];
