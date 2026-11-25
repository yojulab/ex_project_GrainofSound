export type SceneId = "seuil" | "cour" | "echo" | "lettre";

export interface SceneMeta {
  id: SceneId;
  roman: string;
  title: string;
  subtitle: string;
}

export const PARCOURS_SCENES: SceneMeta[] = [
  {
    id: "seuil",
    roman: "I",
    title: "Le Seuil",
    subtitle: "Ouverture & Tissage",
  },
  {
    id: "cour",
    roman: "II",
    title: "La Cour",
    subtitle: "Trois axes d’action",
  },
  {
    id: "echo",
    roman: "III",
    title: "L’Écho",
    subtitle: "Éthique & Archives",
  },
  {
    id: "lettre",
    roman: "IV",
    title: "La Lettre",
    subtitle: "Correspondance",
  },
];

export const SEUIL_CONTENT = {
  eyebrow: "Yeonheedan Gyeol · Le Grain du Son",
  headline: "Tissage du bois, du cuir et du souffle",
  tissageQuote:
    "« Gyeol (결) désigne le fil invisible qui relie la fibre du bois, la tension du cuir et la respiration humaine — un tissage patient entre mémoire et présent. »",
  circlePrompt: "Entrer dans le cercle",
  circleOpenedLabel: "Récit ouvert",
  revealedNarrative: [
    "Née à Bucheon, l’association artistique à but non lucratif Yeonheedan Gyeol aborde le yeonhee — les arts traditionnels coréens de percussion, de danse et de rituel — non comme un vestige figé, mais comme une matière vivante.",
    "À travers chaque battement de janggu et chaque pas dans la cour, nous tissons un espace d’écoute silencieuse et de résonance partagée.",
  ],
  nextHint: "Poursuivre vers La Cour",
};

export interface CourAxis {
  id: "partage" | "dialogue" | "transmission";
  index: string;
  title: string;
  koreanSubtitle: string;
  lead: string;
  details: string[];
  actionLabel: string;
}

export const COUR_AXES: CourAxis[] = [
  {
    id: "partage",
    index: "01",
    title: "Partage & Scènes solidaires",
    koreanSubtitle: "Scènes de proximité",
    lead: "Porter le rythme traditionnel là où l’art se fait rare : maisons de retraite, centres sociaux et lieux de soin.",
    details: [
      "Programmes acoustiques adaptés à l’intimité des lieux d’accueil et aux publics fragiles.",
      "Rencontres participatives où le battement devient un langage immédiat d’apaisement et de lien.",
    ],
    actionLabel: "Solliciter une intervention",
  },
  {
    id: "dialogue",
    index: "02",
    title: "Dialogue culturel Corée–France",
    koreanSubtitle: "Échanges & Festivals",
    lead: "Inscrire la tradition coréenne dans un dialogue contemporain avec la scène francophone et internationale.",
    details: [
      "Créations et formes scéniques pensées pour les festivals, institutions culturelles et résidences.",
      "Mise en résonance du répertoire traditionnel coréen avec l’esthétique de la scène contemporaine.",
    ],
    actionLabel: "Proposer un projet culturel",
  },
  {
    id: "transmission",
    index: "03",
    title: "Transmission & Ateliers",
    koreanSubtitle: "Pédagogie du rythme",
    lead: "Transmettre la discipline du souffle, du geste et de l’écoute collective aux nouvelles générations.",
    details: [
      "Ateliers d’initiation au janggu, au buk et aux rythmes fondamentaux (jangdan).",
      "Parcours pédagogiques conçus pour les écoles, les universités et les curieux de culture coréenne.",
    ],
    actionLabel: "Organiser un atelier",
  },
];

export const ECHO_CONTENT = {
  eyebrow: "Éthique d’ensemble",
  title: "Non un simple cercle amateur, mais une maison artistique à but non lucratif",
  statements: [
    {
      num: "01",
      heading: "Rigueur de l’interprétation",
      body: "Chaque scène est préparée avec l’exigence d’un ensemble professionnel : justesse du jangdan, maîtrise du corps et respect de la acoustique du lieu.",
    },
    {
      num: "02",
      heading: "Engagement non lucratif",
      body: "Constituée en association artistique à but non lucratif, Gyeol consacre l’intégralité de ses ressources à la création, au partage et à la transmission.",
    },
    {
      num: "03",
      heading: "Mémoire vivante",
      body: "Nos archives conservent la trace de chaque rencontre — non comme une vitrine promotionnelle, mais comme un carnet de route.",
    },
  ],
  fallbackArchives: [
    {
      id: "echo-1",
      category: "welfare" as const,
      title: "Résonance dans la cour d’automne",
      subtitle: "Scène solidaire · Bucheon",
      description:
        "Rencontre acoustique autour du janggu et du sogo auprès des aînés, dans une atmosphère d’écoute et de proximité.",
      imageUrl: "/images/hero-janggu-ink.webp",
      imageAlt: "Illustration à l'encre d'un janggu traditionnel coréen",
      aspectRatio: "4:5" as const,
    },
    {
      id: "echo-2",
      category: "festival" as const,
      title: "Le fil et le souffle",
      subtitle: "Dialogue culturel · Scène ouverte",
      description:
        "Exploration scénique du tissage entre percussions coréennes et dramaturgie contemporaine.",
      imageUrl: "/og-gyeol-hanji.png",
      imageAlt: "Esthétique éditoriale Hanji de Yeonheedan Gyeol",
      aspectRatio: "1:1" as const,
    },
  ],
};

export const LETTRE_PLACEHOLDERS = {
  phoneAndKakao: "+82 10-6767-3553",
  email: "[contact@y-gyeol.kr]",
  registrationNumber: "[000-82-00000]",
  representativeName: "[Nom du représentant]",
  location: "Bucheon-si, Gyeonggi-do, République de Corée",
  koreanNotice:
    "Pour toute demande en coréen, vous pouvez également nous joindre via KakaoTalk (+82 10-6767-3553) ou par e-mail.",
};
