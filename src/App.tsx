import { useMemo, useState } from "react";
import heroBackdrop from "./assets/youware-bg.png";

type Language = "en" | "es";

type NavLink = {
  label: string;
  href: string;
};

type HighlightCard = {
  title: string;
  description: string;
};

type SectionResource = {
  title: string;
  description: string;
  url?: string;
  tag?: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
};

type SectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  backgroundClass: string;
  accentClass: string;
  resources: SectionResource[];
  footnote?: string;
  citationKeys?: string[];
};

type CTAContent = {
  title: string;
  description: string;
  primary: string;
  primaryHref: string;
  secondary?: string;
  secondaryHref?: string;
};

type PageContent = {
  nav: NavLink[];
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    definitions: string;
    ctaPrimary: string;
    highlightCards: HighlightCard[];
  };
  sections: SectionContent[];
  citationsHeading: string;
  citationsSubheading: string;
  cta: CTAContent;
};

const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

// TODO: Replace static content with live data from the YouWare backend once endpoints are approved.
const parseWorkshops = (language: Language) => {
  return [
    {
      month: language === "en" ? "December 2025" : "Diciembre 2025",
      sessions: [
        {
          date: language === "en" ? "December 5, 2025" : "5 de diciembre de 2025",
          time: language === "en" ? "6:00 PM – English" : "6:00 p. m. – inglés",
        },
        {
          date: language === "en" ? "December 12, 2025" : "12 de diciembre de 2025",
          time: language === "en" ? "6:00 PM – Spanish" : "6:00 p. m. – español",
        },
      ],
    },
    {
      month: language === "en" ? "January 2026" : "Enero 2026",
      sessions: [
        {
          date: language === "en" ? "January 9, 2026" : "9 de enero de 2026",
          time: language === "en" ? "6:00 PM – English" : "6:00 p. m. – inglés",
        },
        {
          date: language === "en" ? "January 16, 2026" : "16 de enero de 2026",
          time: language === "en" ? "6:00 PM – Spanish" : "6:00 p. m. – español",
        },
      ],
    },
  ];
};

const citationEntries: { key: string; text: string }[] = [
  {
    key: "HESAA Alternative Application",
    text: "Higher Education Student Assistance Authority. (2025). NJ Alternative Financial Aid Application. https://www.hesaa.org/Pages/NJAlternativeApplication.aspx",
  },
  {
    key: "TheDream.US National Scholarship",
    text: "TheDream.US. (2025). National scholarship. https://www.thedream.us/scholarships/national-scholarship/",
  },
  {
    key: "Garden State Guarantee",
    text: "Higher Education Student Assistance Authority. (2025). Garden State Guarantee. https://www.hesaa.org/Pages/gsg.aspx",
  },
  {
    key: "NJ EOF",
    text: "New Jersey Office of the Secretary of Higher Education. (2025). Educational Opportunity Fund eligibility. https://www.nj.gov/highereducation/EOF/EOF_Eligibility.shtml",
  },
  {
    key: "Immigrants Rising Scholarships",
    text: "Immigrants Rising. (2025). List of scholarships and fellowships. https://immigrantsrising.org/resource/list-of-scholarships-and-fellowships/",
  },
  {
    key: "Rutgers Scarlet Hub",
    text: "Rutgers University. (2025). Apply for financial aid: How to apply. https://scarlethub.rutgers.edu/financial-services/apply-for-aid/how-to-apply/",
  },
  {
    key: "Montclair Dreamer Resources",
    text: "Montclair State University. (2025). Immigration & DACA student resources. https://www.montclair.edu/immigration-daca/daca-dreamer-student-resources/",
  },
  {
    key: "NJCU Undocumented Support",
    text: "New Jersey City University. (2025). DACA and undocumented student information. https://www.njcu.edu/academics/academic-success-resources/daca-and-undocumented-student-information",
  },
  {
    key: "Stockton Dreamers",
    text: "Stockton University. (2025). DACA and immigrant students. https://stockton.edu/financial-aid/daca-immigrant-students.html",
  },
  {
    key: "Saint Peter's Financial Aid",
    text: "Saint Peter's University. (2025). FAFSA information for undocumented and DACA students. https://www.saintpeters.edu/fafsa-information/",
  },
  {
    key: "Rowan Community Partnerships",
    text: "Rowan University. (2025). Community partnerships. https://admissions.rowan.edu/student-experience/community-partnerships.html",
  },
  {
    key: "William Paterson OSDI",
    text: "William Paterson University. (2025). Undocumented students – Office of Student Diversity and Inclusion. https://www.wpunj.edu/osdi/undocumented-students",
  },
  {
    key: "NJIT Admissions",
    text: "New Jersey Institute of Technology. (2025). How to apply. https://www.njit.edu/admissions/how-apply",
  },
  {
    key: "Princeton Undocumented Applicants",
    text: "Princeton University. (2025). Undocumented or DACA students. https://admission.princeton.edu/apply/undocumented-or-daca-students",
  },
  {
    key: "Harvard Undocumented Aid",
    text: "Harvard College. (2025). I am undocumented; am I still eligible for financial aid? https://college.harvard.edu/resources/faq/i-am-undocumented-am-i-still-eligible-financial-aid",
  },
  {
    key: "Columbia International Aid",
    text: "Columbia University. (2025). International applicants: Financial aid. https://undergrad.admissions.columbia.edu/apply/international/aid",
  },
  {
    key: "Yale Undocumented Support",
    text: "Yale University. (2025). Dacamented and undocumented students. https://oiss.yale.edu/getting-started/new-students/dacamented-undacamented",
  },
  {
    key: "CCM Dreamer Aid",
    text: "County College of Morris. (2025). State aid for Dreamer students. https://www.ccm.edu/financial-aid/state-aid-for-dreamer-students/",
  },
  {
    key: "CCM Workforce Development",
    text: "County College of Morris. (2025). Center for Workforce Development. https://www.ccm.edu/workforce/",
  },
  {
    key: "Morris County Vocational Adult Programs",
    text: "Morris County Vocational School District. (2025). Adult continuing education. https://mcvts.augusoft.net",
  },
  {
    key: "NJ Pathways",
    text: "New Jersey Council of County Colleges. (2025). NJ Pathways to Career Opportunities. https://njpathways.org/",
  },
  {
    key: "HESAA GIVS",
    text: "Higher Education Student Assistance Authority. (2025). Garden State GIVS scholarship. https://public.youware.com/users-website-assets/prod/7eb96829-c8f0-4ccc-8e93-53bd92f17441/aee766a007a848edb48a5126199e8688.pdf",
  },
  {
    key: "BLS Software Developers",
    text: "U.S. Bureau of Labor Statistics. (2024). Software developers. https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
  {
    key: "BLS Information Security Analysts",
    text: "U.S. Bureau of Labor Statistics. (2024). Information security analysts. https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm",
  },
  {
    key: "BLS Registered Nurses",
    text: "U.S. Bureau of Labor Statistics. (2024). Registered nurses. https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
  },
  {
    key: "BLS Dental Hygienists",
    text: "U.S. Bureau of Labor Statistics. (2024). Dental hygienists. https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
  },
  {
    key: "BLS Construction Managers",
    text: "U.S. Bureau of Labor Statistics. (2024). Construction managers. https://www.bls.gov/ooh/management/construction-managers.htm",
  },
];

const content: Record<Language, PageContent> = {
  en: {
    nav: [
      { label: "Financial Aid", href: "#financial-aid" },
      { label: "Dreamer Colleges", href: "#dreamer-colleges" },
      { label: "Ivy League", href: "#ivy-league" },
      { label: "Parents", href: "#parent-guidance" },
      { label: "Community & Trades", href: "#community-trade" },
      { label: "Careers", href: "#careers" },
    ],
    hero: {
      kicker: "NJ Dreamers Hub",
      title: "Your roadmap to college as an undocumented student in New Jersey",
      subtitle:
        "Find tuition support, colleges that welcome NJ Dreamers, and guides for your family — all in one place.",
      definitions:
        "A DACA recipient has Deferred Action protections with work authorization, while an NJ Dreamer is an undocumented student who meets New Jersey’s residency and high school requirements for in-state tuition and state aid. Many students qualify as both, but NJ Dreamer support remains available even without DACA.",
      ctaPrimary: "Explore your path",
      highlightCards: [
        {
          title: "$50M+ state aid",
          description:
            "NJ investments in need-based grants are open to Dreamers through the Alternative Financial Aid Application.",
        },
        {
          title: "20+ partner colleges",
          description: "Public and private NJ institutions enroll Dreamers with in-state tuition pathways and campus allies.",
        },
        {
          title: "Full-ride options",
          description: "Ivy League aid offices meet 100% of demonstrated need for undocumented students.",
        },
      ],
    },
    sections: [
      {
        id: "financial-aid",
        eyebrow: "Financial Aid & Scholarships",
        title: "Unlock financial support in New Jersey",
        description:
          "Use these programs to cover tuition, fees, and living costs — all available to undocumented or DACA students living in NJ.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "NJ Alternative Financial Aid Application (HESAA)",
            description:
              "State application that opens Tuition Aid Grants, EOF, and state scholarships to NJ Dreamers. Requires a NJ high school diploma or GED.",
            url: "https://www.hesaa.org/Pages/NJAlternativeApplication.aspx",
            tag: "State Grant",
            meta: "Deadline: May 15, 2025 (priority)",
          },
          {
            title: "TheDream.US National Scholarship",
            description:
              "Full-tuition scholarships for NJ partner colleges like Rutgers–Newark, NJCU, and Saint Peter's, plus a $1,000 annual stipend.",
            url: "https://www.thedream.us/scholarships/national-scholarship/",
            tag: "Full Tuition",
          },
          {
            title: "Garden State Guarantee",
            description:
              "Tuition-free coverage for NJ residents in their third and fourth years at public colleges when family income is under $150,000; Dreamers qualify through the alternative application.",
            url: "https://www.hesaa.org/Pages/gsg.aspx",
            tag: "Tuition Support",
          },
          {
            title: "NJ Educational Opportunity Fund (EOF)",
            description:
              "Counseling stipends and summer bridge programs; Dreamers qualify when they meet income guidelines and submit the alternative application.",
            url: "https://www.nj.gov/highereducation/EOF/EOF_Eligibility.shtml",
            tag: "Support Services",
          },
          {
            title: "Immigrants Rising Scholarship Finder",
            description:
              "Search scholarships that do not require citizenship or Social Security numbers, with filters for major, GPA, and due date.",
            url: "https://immigrantsrising.org/resource/list-of-scholarships-and-fellowships/",
            tag: "Search Tool",
          }
        ],
        footnote:
          "Tip: Submit tax transcripts or sworn statements if your family files without a Social Security number — HESAA accepts ITIN documentation.",
        citationKeys: [
          "HESAA Alternative Application",
          "TheDream.US National Scholarship",
          "Garden State Guarantee",
          "NJ EOF",
          "Immigrants Rising Scholarships",
        ],
      },
      {
        id: "dreamer-colleges",
        eyebrow: "NJ Dreamer-Friendly Colleges",
        title: "Colleges that welcome NJ Dreamers",
        description:
          "These New Jersey institutions openly support undocumented students with admissions, aid, and campus services tailored to Dreamers.",
        backgroundClass: "bg-[#EEF2F8]",
        accentClass: "border-[#E07A5F]/30",
        resources: [
          {
            title: "Rutgers University",
            description:
              "Scarlet Hub outlines how undocumented students apply for aid, including the NJ Alternative Application and emergency grants.",
            url: "https://scarlethub.rutgers.edu/financial-services/apply-for-aid/how-to-apply/",
            tag: "Financial Aid",
          },
          {
            title: "Montclair State University",
            description:
              "Immigration & DACA hub offers legal clinics, scholarship coaching, and faculty allies trained to support undocumented students.",
            url: "https://www.montclair.edu/immigration-daca/daca-dreamer-student-resources/",
            tag: "Allies Network",
          },
          {
            title: "New Jersey City University",
            description:
              "Academic Success Center houses Undocumented Student Support with campus jobs guidance, legal referrals, and bilingual advising.",
            url: "https://www.njcu.edu/academics/academic-success-resources/daca-and-undocumented-student-information",
            tag: "Support Hub",
          },
          {
            title: "Stockton University",
            description:
              "Stockton’s DREAM Team, Coastal Connections, and EOF staff partner to deliver legal webinars and emergency aid for undocumented students.",
            url: "https://stockton.edu/financial-aid/daca-immigrant-students.html",
            tag: "Coastal Support",
          },
          {
            title: "Saint Peter's University",
            description:
              "Jesuit social justice mission drives wraparound aid counseling, TheDream.US partnership, and mental health care for Dreamers.",
            url: "https://www.saintpeters.edu/fafsa-information/",
            tag: "Scholarship Partner",
          },
          {
            title: "Rowan University",
            description:
              "Community partnerships office highlights Dreamer support, tuition flexibility, and service opportunities for undocumented students.",
            url: "https://admissions.rowan.edu/student-experience/community-partnerships.html",
            tag: "In-State Tuition",
          },
          {
            title: "William Paterson University",
            description:
              "Office of Student Diversity and Inclusion guides undocumented students through admissions, state aid, and on-campus advocacy.",
            url: "https://www.wpunj.edu/osdi/undocumented-students",
            tag: "Advising",
          },
          {
            title: "New Jersey Institute of Technology (NJIT)",
            description:
              "Admissions outlines how NJ Dreamers submit the alternative aid application and receive in-state tuition plus targeted scholarships.",
            url: "https://www.njit.edu/admissions/how-apply",
            tag: "STEM Pathway",
          },
        ],
        footnote: "Ask each campus for an NJ Dreamer tuition waiver letter to lock in in-state rates.",
        citationKeys: [
          "Rutgers Scarlet Hub",
          "Montclair Dreamer Resources",
          "NJCU Undocumented Support",
          "Stockton Dreamers",
          "Saint Peter's Financial Aid",
          "Rowan Community Partnerships",
          "William Paterson OSDI",
          "NJIT Admissions",
        ],
      },
      {
        id: "ivy-league",
        eyebrow: "Full-Need Universities",
        title: "Ivy League pathways with full rides",
        description:
          "These Ivy League schools admit undocumented students as domestic applicants and cover 100% of demonstrated financial need.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "Princeton University",
            description:
              "Application guidance for undocumented and DACA students with full-need grant packages and legal support referrals.",
            url: "https://admission.princeton.edu/apply/undocumented-or-daca-students",
            tag: "Full Grant Aid",
          },
          {
            title: "Harvard University",
            description:
              "FAQ clarifies undocumented eligibility for Harvard’s grant-based aid and campus immigration advising network.",
            url: "https://college.harvard.edu/resources/faq/i-am-undocumented-am-i-still-eligible-financial-aid",
            tag: "Grant Only",
          },
          {
            title: "Columbia University",
            description:
              "International financial aid hub explains how undocumented domestic applicants access need-based grants without loans.",
            url: "https://undergrad.admissions.columbia.edu/apply/international/aid",
            tag: "Need-based Aid",
          },
          {
            title: "Yale University",
            description:
              "Office of International Students & Scholars outlines onboarding for DACAmented and undocumented students with full-need aid.",
            url: "https://oiss.yale.edu/getting-started/new-students/dacamented-undacamented",
            tag: "Comprehensive Support",
          },
        ],
        footnote:
          "Most Ivy League schools require the CSS Profile — request a fee waiver by citing undocumented status in the financial aid portal.",
        citationKeys: [
          "Princeton Undocumented Applicants",
          "Harvard Undocumented Aid",
          "Columbia International Aid",
          "Yale Undocumented Support",
        ],
      },
      {
        id: "parent-guidance",
        eyebrow: "Family Support",
        title: "How parents and caregivers can help",
        description:
          "Actionable steps for parents, guardians, and trusted adults supporting an undocumented student through college planning.",
        backgroundClass: "bg-[#F8F1EC]",
        accentClass: "border-[#F4A261]/30",
        resources: [
          {
            title: "Build a financing plan together",
            description:
              "Use income and expense worksheets; HESAA accepts ITIN tax returns and cash income affidavits for aid reviews.",
            tag: "Budgeting",
          },
          {
            title: "Attend NJ Dreamers info nights",
            description:
              "Monthly English and Spanish workshops share deadlines, FAFSA alternatives, and private scholarship updates.",
            url: "https://www.hesaa.org/pages/njalternativeapplication.aspx",
            tag: "Calendar",
            meta: "Use the calendar in this section for confirmed dates",
          },

          {
            title: "Schedule a counselor planning meeting",
            description:
              "Book time with your child’s guidance counselor to review transcripts, residency proof, and aid timelines together.",
            tag: "School Partner",
          },
          {
            title: "Gather identity and residency records",
            description:
              "Create a shared digital folder with proof of NJ residency, transcripts, immunization records, and passports or consular IDs.",
            tag: "Document Prep",
          },
        ],
        citationKeys: [
          "HESAA Alternative Application",
        ],
      },
      {
        id: "community-trade",
        eyebrow: "Community & Trade Programs",
        title: "Affordable two-year and career training near Morris County",
        description:
          "Start locally with colleges and training centers that partner with undocumented learners and offer payment flexibility.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "County College of Morris (Randolph)",
            description:
              "In-state tuition, Dreamers liaison, and NJ Pathways degree-to-career tracks in health, business, and engineering.",
            url: "https://www.ccm.edu/financial-aid/state-aid-for-dreamer-students/",
            tag: "Community College",
          },
          {
            title: "CCM Center for Workforce Development",
            description:
              "Short-term certificates in advanced manufacturing, cybersecurity, and UX design — many start monthly.",
            url: "https://www.ccm.edu/workforce/",
            tag: "Fast Certificates",
          },
          {
            title: "Morris County Vocational School District",
            description:
              "Adult evening programs in healthcare, welding, and IT; staff familiar with DACA/TPS documentation.",
            url: "https://mcvts.augusoft.net",
            tag: "Trade School",
          },

          {
            title: "NJ Pathways to Career Opportunities",
            description:
              "Statewide initiative led by community colleges to map high-demand jobs; includes Dreamer-friendly advising.",
            url: "https://njpathways.org/",
            tag: "Career Map",
          },
          {
            title: "HESAA: Garden State GIVS",
            description:
              "State-funded vouchers covering tuition for women and minorities entering construction, renewable energy, and advanced manufacturing.",
            url: "https://public.youware.com/users-website-assets/prod/7eb96829-c8f0-4ccc-8e93-53bd92f17441/aee766a007a848edb48a5126199e8688.pdf",
            tag: "Scholarship",
          },
        ],
        citationKeys: [
          "CCM Dreamer Aid",
          "CCM Workforce Development",
          "Morris County Vocational Adult Programs",
          "NJ Pathways",
          "HESAA GIVS",
        ],
      },
      {
        id: "careers",
        eyebrow: "Career Futures",
        title: "High-paying careers open to undocumented students",
        description:
          "Pair the right training with work authorization (DACA, TPS, or other status) to access these growing New Jersey roles.",
        backgroundClass: "bg-[#EEF2F8]",
        accentClass: "border-[#E07A5F]/30",
        resources: [
          {
            title: "Software Developer / Engineer",
            description:
              "Median NJ salary $127K (BLS 2024). Pathways include CS degrees, CCM coding bootcamps, or apprenticeships.",
            url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
            tag: "Digital",
          },
          {
            title: "Cybersecurity Analyst",
            description:
              "Median NJ salary $118K. Fast growth via SOC analyst certificates, CompTIA Security+, and NJ Pathways partnerships.",
            url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm",
            tag: "Security",
          },
          {
            title: "Registered Nurse (BSN or ADN)",
            description:
              "Median NJ salary $104K. NJ allows DACA/TPS holders to obtain nursing licenses with an ITIN and EAD.",
            url: "https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
            tag: "Healthcare",
          },
          {
            title: "Dental Hygienist",
            description:
              "Median NJ salary $96K. Two-year programs at community colleges lead to state licensure for DACA holders.",
            url: "https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
            tag: "Health Tech",
          },
          {
            title: "Construction Manager",
            description:
              "Median NJ salary $118K. Combine trade experience with CCM management certificates; state licenses accept ITINs.",
            url: "https://www.bls.gov/ooh/management/construction-managers.htm",
            tag: "Infrastructure",
          },
        ],
        footnote:
          "Salary estimates reference Bureau of Labor Statistics May 2024 Occupational Employment data for New Jersey.",
        citationKeys: [
          "BLS Software Developers",
          "BLS Information Security Analysts",
          "BLS Registered Nurses",
          "BLS Dental Hygienists",
          "BLS Construction Managers",
        ],
      },
    ],
    citationsHeading: "Sources & citations",
    citationsSubheading:
      "All resources referenced above are cited using APA style.",
    cta: {
      title: "Ready to take the next step?",
      description: "Share this guide with a counselor or community advocate and build your action plan this week.",
      primary: "Plan financial aid",
      primaryHref: "#financial-aid",
    },
  },
  es: {
    nav: [
      { label: "Ayuda financiera", href: "#financial-aid" },
      { label: "Universidades NJ", href: "#dreamer-colleges" },
      { label: "Ivy League", href: "#ivy-league" },
      { label: "Familias", href: "#parent-guidance" },
      { label: "Comunitarios y oficios", href: "#community-trade" },
      { label: "Carreras", href: "#careers" },
    ],
    hero: {
      kicker: "Centro para Soñadores de NJ",
      title: "Tu ruta hacia la universidad como estudiante indocumentado en Nueva Jersey",
      subtitle:
        "Encuentra apoyo financiero, universidades que aceptan Dreamers y consejos para tu familia — todo en un solo lugar.",
      definitions:
        "Un beneficiario de DACA cuenta con protección de Acción Diferida y permiso de trabajo, mientras que un Dreamer de NJ es un estudiante indocumentado que cumple los requisitos de residencia y estudios secundarios en el estado para acceder a matrícula estatal y ayuda económica. Muchas personas califican para ambos programas, pero el apoyo para Dreamers de NJ sigue disponible incluso sin DACA.",
      ctaPrimary: "Explora tu camino",
      highlightCards: [
        {
          title: "Más de $50M en ayuda estatal",
          description:
            "Las becas y subvenciones de NJ están abiertas a Dreamers mediante la Solicitud Alternativa de Ayuda Financiera.",
        },
        {
          title: "20+ universidades aliadas",
          description: "Instituciones públicas y privadas en NJ ofrecen matrícula estatal y aliados en campus para Dreamers.",
        },
        {
          title: "Opciones de beca total",
          description: "Las universidades Ivy League cubren el 100% de la necesidad financiera demostrada para estudiantes indocumentados.",
        },
      ],
    },
    sections: [
      {
        id: "financial-aid",
        eyebrow: "Ayuda financiera y becas",
        title: "Activa el apoyo financiero en Nueva Jersey",
        description:
          "Usa estos programas para cubrir matrícula, cuotas y gastos de vida — disponibles para estudiantes indocumentados o con DACA que viven en NJ.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "Solicitud Alternativa de Ayuda Financiera (HESAA)",
            description:
              "Abre el acceso a las becas estatales Tuition Aid Grant, EOF y otros apoyos para Dreamers de NJ. Requiere diploma o GED de NJ.",
            url: "https://www.hesaa.org/Pages/NJAlternativeApplication.aspx",
            tag: "Beca estatal",
            meta: "Fecha límite prioritaria: 15 de mayo de 2025",
          },
          {
            title: "Beca Nacional TheDream.US",
            description:
              "Cubre la matrícula completa en universidades socias de NJ como Rutgers–Newark, NJCU y Saint Peter's, más un estipendio anual de $1,000.",
            url: "https://www.thedream.us/scholarships/national-scholarship/",
            tag: "Beca total",
          },
          {
            title: "Garden State Guarantee",
            description:
              "Cubre el costo de matrícula para residentes de NJ en su tercer y cuarto año en universidades públicas cuando el ingreso familiar es menor a $150,000; los Dreamers acceden mediante la solicitud alternativa.",
            url: "https://www.hesaa.org/Pages/gsg.aspx",
            tag: "Apoyo a matrícula",
          },
          {
            title: "Fondo de Oportunidades Educativas (EOF)",
            description:
              "Ofrece mentoría, estipendios y programas de verano; los Dreamers califican al cumplir con los requisitos de ingresos y enviar la solicitud alternativa.",
            url: "https://www.nj.gov/highereducation/EOF/EOF_Eligibility.shtml",
            tag: "Servicios de apoyo",
          },
          {
            title: "Buscador de becas de Immigrants Rising",
            description:
              "Lista filtrable de becas que no requieren ciudadanía ni número de Seguro Social, con filtros por carrera y fecha de cierre.",
            url: "https://immigrantsrising.org/resource/list-of-scholarships-and-fellowships/",
            tag: "Herramienta",
          }
        ],
        footnote:
          "Consejo: Envía transcripciones de impuestos o declaraciones juradas si tu familia reporta ingresos sin número de Seguro Social — HESAA acepta documentación con ITIN.",
        citationKeys: [
          "HESAA Alternative Application",
          "TheDream.US National Scholarship",
          "Garden State Guarantee",
          "NJ EOF",
          "Immigrants Rising Scholarships",
        ],
      },
      {
        id: "dreamer-colleges",
        eyebrow: "Universidades aliadas en NJ",
        title: "Campus que reciben a los Dreamers de NJ",
        description:
          "Estas instituciones de Nueva Jersey apoyan abiertamente a estudiantes indocumentados con admisiones, ayuda financiera y servicios en campus.",
        backgroundClass: "bg-[#EEF2F8]",
        accentClass: "border-[#E07A5F]/30",
        resources: [
          {
            title: "Rutgers University",
            description:
              "El Scarlet Hub explica cómo solicitar ayuda financiera como estudiante indocumentado, incluyendo la solicitud alternativa y subvenciones de emergencia.",
            url: "https://scarlethub.rutgers.edu/financial-services/apply-for-aid/how-to-apply/",
            tag: "Ayuda financiera",
          },
          {
            title: "Montclair State University",
            description:
              "El centro de inmigración y DACA ofrece clínicas legales, asesoría de becas y enlaces con profesorado aliado para Dreamers.",
            url: "https://www.montclair.edu/immigration-daca/daca-dreamer-student-resources/",
            tag: "Red de aliados",
          },
          {
            title: "New Jersey City University",
            description:
              "El Academic Success Center brinda orientación bilingüe, referencias legales y apoyo para empleos en campus para estudiantes indocumentados.",
            url: "https://www.njcu.edu/academics/academic-success-resources/daca-and-undocumented-student-information",
            tag: "Centro de apoyo",
          },
          {
            title: "Stockton University",
            description:
              "El DREAM Team, Coastal Connections y EOF coordinan talleres legales, ayuda de emergencia y redes de bienestar para Dreamers.",
            url: "https://stockton.edu/financial-aid/daca-immigrant-students.html",
            tag: "Apoyo costero",
          },
          {
            title: "Saint Peter's University",
            description:
              "La misión jesuita respalda asesoría financiera personalizada, asociación con TheDream.US y acompañamiento de salud mental.",
            url: "https://www.saintpeters.edu/fafsa-information/",
            tag: "Socio de becas",
          },
          {
            title: "Rowan University",
            description:
              "La oficina de asociaciones comunitarias resalta apoyos para Dreamers, flexibilidad de matrícula y oportunidades de servicio para estudiantes indocumentados.",
            url: "https://admissions.rowan.edu/student-experience/community-partnerships.html",
            tag: "Matrícula estatal",
          },
          {
            title: "William Paterson University",
            description:
              "La Oficina de Diversidad e Inclusión acompaña a estudiantes indocumentados con admisión, ayuda estatal y abogacía en campus.",
            url: "https://www.wpunj.edu/osdi/undocumented-students",
            tag: "Asesoría",
          },
          {
            title: "Instituto de Tecnología de Nueva Jersey (NJIT)",
            description:
              "Admisiones explica cómo los Dreamers de NJ presentan la solicitud alternativa de ayuda y acceden a matrícula estatal y becas enfocadas.",
            url: "https://www.njit.edu/admissions/how-apply",
            tag: "Ruta STEM",
          },
        ],
        footnote: "Solicita una carta de matrícula estatal para Dreamers en cada campus y asegura la tarifa reducida.",
        citationKeys: [
          "Rutgers Scarlet Hub",
          "Montclair Dreamer Resources",
          "NJCU Undocumented Support",
          "Stockton Dreamers",
          "Saint Peter's Financial Aid",
          "Rowan Community Partnerships",
          "William Paterson OSDI",
          "NJIT Admissions",
        ],
      },
      {
        id: "ivy-league",
        eyebrow: "Universidades de necesidad total",
        title: "Rutas Ivy League con beca completa",
        description:
          "Estas universidades Ivy League admiten a estudiantes indocumentados como solicitantes domésticos y cubren el 100% de la necesidad financiera.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "Princeton University",
            description:
              "Orientación para solicitantes indocumentados o con DACA con paquetes de ayuda 100% subvenciones y apoyo legal.",
            url: "https://admission.princeton.edu/apply/undocumented-or-daca-students",
            tag: "Beca total",
          },
          {
            title: "Harvard University",
            description:
              "La sección de preguntas frecuentes confirma la elegibilidad de estudiantes indocumentados para ayuda basada en necesidad sin préstamos.",
            url: "https://college.harvard.edu/resources/faq/i-am-undocumented-am-i-still-eligible-financial-aid",
            tag: "Solo subvenciones",
          },
          {
            title: "Columbia University",
            description:
              "La oficina internacional explica cómo los solicitantes indocumentados reciben becas completas según necesidad sin préstamos.",
            url: "https://undergrad.admissions.columbia.edu/apply/international/aid",
            tag: "Ayuda según necesidad",
          },
          {
            title: "Yale University",
            description:
              "La Oficina de Estudiantes Internacionales detalla la llegada de estudiantes DACA/indocumentados y la ayuda total disponible.",
            url: "https://oiss.yale.edu/getting-started/new-students/dacamented-undacamented",
            tag: "Apoyo integral",
          }
        ],
        footnote:
          "La mayoría de las Ivy League piden el CSS Profile; solicita la exención automática explicando tu estatus en la plataforma de ayuda financiera.",
      },
      {
        id: "parent-guidance",
        eyebrow: "Apoyo familiar",
        title: "Cómo madres, padres y cuidadores pueden ayudar",
        description:
          "Pasos prácticos para que la familia acompañe a un estudiante indocumentado durante la planificación universitaria.",
        backgroundClass: "bg-[#F8F1EC]",
        accentClass: "border-[#F4A261]/30",
        resources: [
          {
            title: "Construyan un plan de financiamiento",
            description:
              "Usen hojas de presupuesto; HESAA acepta declaraciones de impuestos con ITIN y cartas de ingresos en efectivo.",
            tag: "Presupuesto",
          },
          {
            title: "Asistan a charlas para Dreamers en NJ",
            description:
              "Talleres mensuales en inglés y español actualizan sobre plazos, alternativas a FAFSA y becas privadas.",
            url: "https://www.hesaa.org/pages/njalternativeapplication.aspx",
            tag: "Calendario",
            meta: "Consulta el calendario de esta sección para las próximas fechas",
          },
          {
            title: "Agenda una cita con el orientador escolar",
            description:
              "Coordina una reunión con la consejería escolar para revisar expedientes, residencia y cronograma de ayudas en conjunto.",
            tag: "Aliado escolar",
          },
          {
            title: "Reúne documentos y comprobantes",
            description:
              "Organiza pruebas de residencia en NJ, expedientes académicos, vacunas, pasaportes o matrículas consulares.",
            tag: "Preparación",
          },
        ],
        citationKeys: [
          "HESAA Alternative Application",
        ],
      },
      {
        id: "community-trade",
        eyebrow: "Programas comunitarios y técnicos",
        title: "Opciones accesibles cerca del condado de Morris",
        description:
          "Empieza localmente con colegios y centros de capacitación que colaboran con estudiantes indocumentados y facilitan planes de pago.",
        backgroundClass: "bg-white/95",
        accentClass: "border-[#0D3B66]/30",
        resources: [
          {
            title: "County College of Morris (Randolph)",
            description:
              "Matrícula estatal, enlace para Dreamers y rutas NJ Pathways en salud, negocios e ingeniería.",
            url: "https://www.ccm.edu/financial-aid/state-aid-for-dreamer-students/",
            tag: "Colegio comunitario",
          },
          {
            title: "Centro de Desarrollo Laboral de CCM",
            description:
              "Certificados cortos en manufactura avanzada, ciberseguridad y diseño UX — muchos inician cada mes.",
            url: "https://www.ccm.edu/workforce/",
            tag: "Certificados rápidos",
          },
          {
            title: "Distrito Vocacional del Condado de Morris",
            description:
              "Programas nocturnos para adultos en salud, soldadura e informática; personal con experiencia en documentación DACA/TPS.",
            url: "https://mcvts.augusoft.net",
            tag: "Escuela de oficios",
          },
          {
            title: "NJ Pathways to Career Opportunities",
            description:
              "Iniciativa estatal liderada por colegios comunitarios que mapea empleos de alta demanda e incluye asesoría para Dreamers.",
            url: "https://njpathways.org/",
            tag: "Mapa de carreras",
          },
          {
            title: "HESAA: Garden State GIVS",
            description:
              "Vales estatales cubren matrícula para mujeres y minorías en construcción, energía renovable y manufactura avanzada.",
            url: "https://public.youware.com/users-website-assets/prod/7eb96829-c8f0-4ccc-8e93-53bd92f17441/aee766a007a848edb48a5126199e8688.pdf",
            tag: "Beca",
          },
        ],
        citationKeys: [
          "CCM Dreamer Aid",
          "CCM Workforce Development",
          "Morris County Vocational Adult Programs",
          "NJ Pathways",
          "HESAA GIVS",
        ],
      },
      {
        id: "careers",
        eyebrow: "Futuros profesionales",
        title: "Carreras bien pagadas abiertas a estudiantes indocumentados",
        description:
          "Combina la capacitación adecuada con autorización de trabajo (DACA, TPS u otro estatus) para acceder a estos roles en crecimiento en NJ.",
        backgroundClass: "bg-[#EEF2F8]",
        accentClass: "border-[#E07A5F]/30",
        resources: [
          {
            title: "Desarrollador/a de software",
            description:
              "Salario medio en NJ: $127K (BLS 2024). Opciones: licenciatura en informática, bootcamps de CCM o aprendizajes.",
            url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
            tag: "Digital",
            meta: "Las empresas contratan Dreamers con permisos de trabajo para roles remotos o híbridos.",
          },
          {
            title: "Analista de ciberseguridad",
            description:
              "Salario medio en NJ: $118K. Crece con certificados SOC, CompTIA Security+ y alianzas NJ Pathways.",
            url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm",
            tag: "Seguridad",
          },
          {
            title: "Enfermero/a registrado/a (BSN o ADN)",
            description:
              "Salario medio en NJ: $104K. El estado permite licencias para titulares de DACA/TPS con ITIN y permiso de trabajo.",
            url: "https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
            tag: "Salud",
          },
          {
            title: "Higienista dental",
            description:
              "Salario medio en NJ: $96K. Programas de dos años en colegios comunitarios conducen a la licencia estatal para personas con DACA.",
            url: "https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
            tag: "Tecnología de salud",
          },
          {
            title: "Gerente de construcción",
            description:
              "Salario medio en NJ: $118K. Combina experiencia en oficios con certificados de gestión en CCM; las licencias aceptan ITIN.",
            url: "https://www.bls.gov/ooh/management/construction-managers.htm",
            tag: "Infraestructura",
          }
        ],
        footnote:
          "Los salarios provienen de datos de empleo ocupacional de mayo de 2024 de la Oficina de Estadísticas Laborales para Nueva Jersey.",
      },
    ],
    citationsHeading: "Fuentes y citas",
    citationsSubheading:
      "Todas las fuentes mencionadas arriba están citadas con formato APA.",
    cta: {
      title: "¿Lista o listo para el siguiente paso?",
      description:
        "Comparte esta guía con un consejero o líder comunitario y arma tu plan de acción esta semana.",
      primary: "Planear ayuda financiera",
      primaryHref: "#financial-aid",
    },
  },
};

const WorkshopCalendar = ({ language }: { language: Language }) => {
  const workshops = parseWorkshops(language);

  return (
    <div className="rounded-2xl border border-[#0D3B66]/15 bg-white/80 p-4 backdrop-blur">
      <h3 className="text-sm font-semibold text-[#0D3B66]">
        {language === "en" ? "Upcoming workshops" : "Próximos talleres"}
      </h3>
      <ul className="mt-3 space-y-3 text-xs text-[#1C1C1C]/80">
        {workshops.map((entry) => (
          <li key={entry.month}>
            <p className="font-semibold text-[#0D3B66]">{entry.month}</p>
            <ul className="mt-1 space-y-1">
              {entry.sessions.map((session) => (
                <li key={`${entry.month}-${session.date}`}>{session.date} · {session.time}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Section = ({ content, language }: { content: SectionContent; language: Language }) => {
  const linkLabel = language === "en" ? "Visit resource" : "Ver recurso";

  return (
    <section
      id={content.id}
      className={`relative overflow-hidden rounded-3xl border ${content.accentClass} ${content.backgroundClass} px-6 py-10 shadow-[0_30px_60px_-40px_rgba(13,59,102,0.55)] transition hover:-translate-y-1 hover:shadow-[0_35px_80px_-45px_rgba(13,59,102,0.65)] sm:px-10 sm:py-14`}
    >
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3 space-y-4">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#0D3B66]/70">
              {content.eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#0D3B66] sm:text-3xl">
              {content.title}
            </h2>
            <p className="mt-4 text-sm text-[#1C1C1C]/80 sm:text-base">
              {content.description}
            </p>
          </div>
          {content.id === "parent-guidance" ? <WorkshopCalendar language={language} /> : null}
        </div>
        <div className="lg:w-2/3">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.resources.map((item) => {
              const imageAltFallback = language === "en" ? "Resource preview" : "Vista previa del recurso";
              return (
                <article
                  key={item.title}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/90 hover:shadow-lg"
                >
                  {item.image ? (
                    <div className="overflow-hidden rounded-xl border border-[#0D3B66]/10 bg-white">
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? imageAltFallback}
                        className="h-40 w-full object-cover object-center"
                      />
                    </div>
                  ) : null}
                  <header>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-[#0D3B66]">
                        {item.title}
                      </h3>
                      {item.tag ? (
                        <span className="rounded-full bg-[#E07A5F]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E07A5F]">
                          {item.tag}
                        </span>
                      ) : null}
                    </div>
                    {item.meta ? (
                      <p className="mt-1 text-xs text-[#0D3B66]/70">
                        {item.meta}
                      </p>
                    ) : null}
                  </header>
                  <p className="text-sm text-[#1C1C1C]/80">
                    {item.description}
                  </p>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0D3B66] transition hover:text-[#E07A5F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F]"
                      aria-label={`${linkLabel}: ${item.title}`}
                    >
                      <span aria-hidden="true">↗</span>
                      <span>{linkLabel}</span>
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>
          {content.footnote ? (
            <p className="mt-6 text-xs text-[#0D3B66]/70">
              {content.footnote}
            </p>
          ) : null}
        </div>
      </div>
      <span className="absolute -top-24 right-10 h-40 w-40 rounded-full bg-[#E07A5F]/20 blur-3xl" aria-hidden="true" />
      <span className="absolute -bottom-32 left-6 h-52 w-52 rounded-full bg-[#F4A261]/10 blur-3xl" aria-hidden="true" />
    </section>
  );
};

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const data = useMemo(() => content[language], [language]);

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#1C1C1C]">
      <header className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={heroBackdrop}
            alt={language === "en" ? "Students collaborating on campus" : "Estudiantes colaborando en campus"}
            className="h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B66]/90 via-[#0D3B66]/80 to-[#1D1B31]/80" />
          <span className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#E07A5F]/30 blur-3xl" aria-hidden="true" />
          <span className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#F4A261]/20 blur-3xl" aria-hidden="true" />
        </div>
        <div className="relative z-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-[#F4A261]">
                  {data.hero.kicker}
                </span>
                <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                  {data.hero.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg lg:text-xl">
                  {data.hero.subtitle}
                </p>
                <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
                  {data.hero.definitions}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1 text-sm backdrop-blur">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLanguage(option.value)}
                    className={`rounded-full px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      language === option.value ? "bg-white text-[#0D3B66]" : "text-white hover:bg-white/20"
                    }`}
                    aria-pressed={language === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <nav
              className="flex flex-wrap gap-3 text-sm sm:text-base"
              aria-label={language === "en" ? "Content sections" : "Secciones del contenido"}
            >
              {data.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#financial-aid"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0D3B66] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {data.hero.ctaPrimary}
                  </a>
                  <a
                    href="#community-trade"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {language === "en" ? "Start local" : "Empieza cerca"}
                  </a>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {data.hero.highlightCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:py-16">
        {data.sections.map((section) => (
          <Section key={section.id} content={section} language={language} />
        ))}
      </main>

      <footer className="relative mb-12 px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D3B66] via-[#0D3B66]/95 to-[#1D1B31] px-6 py-12 text-white shadow-[0_30px_60px_-40px_rgba(13,59,102,0.65)] sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {data.cta.title}
              </h2>
              <p className="mt-3 text-base text-white/80 sm:text-lg">
                {data.cta.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={data.cta.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0D3B66] transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {data.cta.primary}
              </a>
              {data.cta.secondary && data.cta.secondaryHref ? (
                <a
                  href={data.cta.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {data.cta.secondary}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </footer>

      <section
        id="citations"
        className="mx-auto mb-12 max-w-6xl rounded-3xl border border-[#0D3B66]/15 bg-white/95 px-6 py-10 shadow-[0_20px_60px_-40px_rgba(13,59,102,0.4)] sm:px-10 sm:py-14"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.35em] text-[#0D3B66]/70">
              {data.citationsHeading}
            </span>
            <h2 className="text-2xl font-semibold leading-tight text-[#0D3B66] sm:text-3xl">
              {language === "en"
                ? "Accurate, transparent sourcing"
                : "Fuentes confiables y transparentes"}
            </h2>
            <p className="text-sm text-[#1C1C1C]/80 sm:text-base">
              {data.citationsSubheading}
            </p>
          </div>
          <ol
            className="space-y-4 text-xs text-[#1C1C1C]/80 sm:text-sm"
            aria-label={language === "en" ? "APA citations" : "Citas APA"}
          >
            {citationEntries.map((entry) => (
              <li key={entry.key} className="leading-relaxed">
                {entry.text}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default App;
