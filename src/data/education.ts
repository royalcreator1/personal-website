export type StudentActivity = {
  id: string
  title: string
  role: string
  points: string[]
}

export type EngineeringExperience = {
  id: string
  title: string
  role: string
  period: string
  context: string
  points: string[]
}

export type StudentRecognition = {
  id: string
  type: 'Achievement' | 'Certificate' | 'Applied research'
  title: string
  issuer: string
  date: string
  description: string
  credentialId?: string
  imagePath?: string
  imageAlt?: string
  credentialMark?: string
  credentialCaption?: string
  credentialIcon?: 'design' | 'simulation' | 'computation'
  href: string
  linkLabel: string
}

export const studentActivities: StudentActivity[] = [
  {
    id: 'ameya-racing',
    title: 'AMEYA Racing Team',
    role: 'Team Captain',
    points: [
      'Led an undergraduate team of 25+ members in the design and development of an all-terrain vehicle.',
      'Built practical engineering, teamwork, and problem-solving skills through hands-on motorsport projects.',
    ],
  },
  {
    id: 'sae-club',
    title: 'SAE Club',
    role: 'Member',
    points: [
      'Contributed to automotive design and development projects.',
      'Participated in national-level competitions, including Baja SAE, ISNEE, and IKC.',
    ],
  },
  {
    id: 'ayudh',
    title: 'AYUDH',
    role: 'Community involvement',
    points: [
      'Took part in community service and youth empowerment initiatives.',
      'Participated in leadership programs and social initiatives alongside academic and engineering work.',
    ],
  },
]

export const engineeringExperiences: EngineeringExperience[] = [
  {
    id: 'sae-baja-2021',
    title: 'SAE BAJA 2021',
    role: 'Team Captain & CAE Head',
    period: '2021',
    context: 'Motorsport engineering · 20+ member event team',
    points: [
      'Conducted dynamic simulations with IPG CarMaker to evaluate vehicle performance and reliability.',
      'Coordinated work across sub-teams and managed project milestones for a team of more than 20 members.',
      'Prepared and optimized the virtual vehicle for dynamic and static evaluations at the SAE BAJA event.',
    ],
  },
  {
    id: 'hal-research',
    title: 'Hindustan Aeronautics Limited',
    role: 'Undergraduate Student Researcher',
    period: 'October 2021–April 2022',
    context: 'Apprenticeship · Foundry & Forge Division · Bengaluru',
    points: [
      'Worked on gating-system design for magnesium alloy casting.',
      'Conducted experiments at HAL’s Foundry & Forge Division and compared casting results with MAGMASOFT simulations.',
      'Recorded experimental values and observations to support analysis, result validation, and further research.',
    ],
  },
]

export const studentRecognition: StudentRecognition[] = [
  {
    id: 'altair-top-ten',
    type: 'Achievement',
    title: 'Global top 10 · Digital Twin Contest',
    issuer: 'Altair',
    date: 'May 2021',
    description: 'Our team’s model placed in the global top 10 in the Altair Digital Twin Contest 2021 and received a US$100 cash prize.',
    imagePath: '/education/altair-digital-twin.jpg',
    imageAlt: 'The team’s Altair Digital Twin Contest model',
    href: 'https://www.linkedin.com/in/ch-v-n-s-jaswanth/overlay/Certifications/1111553374/treasury/?profileId=ACoAAC3GTXMBkq4pm0X9ObTs4_WSVhT2FF2xEXw',
    linkLabel: 'View the contest model',
  },
  {
    id: 'altair-certificate',
    type: 'Certificate',
    title: 'Digital Twin Contest · Participation',
    issuer: 'Altair',
    date: '2021',
    description: 'Participation certificate for the Altair Digital Twin Contest 2021, an opportunity to explore digital twin technologies with the team.',
    imagePath: '/education/altair-certificate.jpg',
    imageAlt: 'Altair Digital Twin Contest participation certificate issued to Jaswanth',
    href: 'https://www.linkedin.com/in/ch-v-n-s-jaswanth/overlay/Certifications/1111553374/treasury/?profileId=ACoAAC3GTXMBkq4pm0X9ObTs4_WSVhT2FF2xEXw',
    linkLabel: 'View the certificate',
  },
  {
    id: 'solidworks-associate',
    type: 'Certificate',
    title: 'Certified SOLIDWORKS Associate',
    issuer: 'Dassault Systèmes',
    date: 'December 2020',
    description: 'Mechanical Design certification, building on hands-on work in mechanical product design.',
    credentialId: 'C-A62LCHBMP5',
    credentialMark: 'CSWA',
    credentialCaption: 'Mechanical design',
    credentialIcon: 'design',
    href: 'https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-A62LCHBMP5',
    linkLabel: 'Verify the credential',
  },
  {
    id: 'ansys-workbench',
    type: 'Certificate',
    title: 'ANSYS Workbench – Introduction to Simulation Design',
    issuer: 'Udemy',
    date: 'October 2020',
    description: 'Course certificate for an introduction to simulation design with ANSYS Workbench.',
    credentialMark: 'ANSYS',
    credentialCaption: 'Simulation design',
    credentialIcon: 'simulation',
    href: 'https://www.udemy.com/certificate/UC-c3554a99-caa6-4d83-854d-66cc9474bf15/',
    linkLabel: 'View the credential',
  },
  {
    id: 'matlab-onramp',
    type: 'Certificate',
    title: 'MATLAB Onramp',
    issuer: 'MathWorks',
    date: 'January 2021',
    description: 'Course certificate for MATLAB Onramp from MathWorks.',
    credentialMark: 'MATLAB',
    credentialCaption: 'Numerical computing',
    credentialIcon: 'computation',
    href: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=f2fb4918-5963-42ed-8bbf-bdb40e4463d7',
    linkLabel: 'View the credential',
  },
  {
    id: 'hal-applied-research',
    type: 'Applied research',
    title: 'Casting simulation & validation',
    issuer: 'Hindustan Aeronautics Limited',
    date: '2022',
    description: 'Research completion certificate for a student project comparing casting experiments with simulation results.',
    imagePath: '/education/hal-student-research.jpg',
    imageAlt: 'Research completion certificate from Hindustan Aeronautics Limited',
    href: 'https://www.linkedin.com/in/ch-v-n-s-jaswanth/overlay/Position/1928683576/treasury/?profileId=ACoAAC3GTXMBkq4pm0X9ObTs4_WSVhT2FF2xEXw',
    linkLabel: 'View the research project',
  },
]
