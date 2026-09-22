export interface NavigationItem {
  label: string
  href: `#${string}`
}

export interface Experience {
  period: string
  role: string
  company: string
  summary: string
  highlights: string[]
}

export interface ProjectDetail {
  label: string
  text: string
}

export interface ProjectLink {
  url: string
  label: string
}

export interface Project {
  title: string
  category: string
  description: string
  details: ProjectDetail[]
  technologies: string[]
  link?: ProjectLink
}

export interface SkillGroup {
  title: string
  description: string
  skills: string[]
  kind: 'professional' | 'learning'
}

export type PortfolioLanguage = 'ja' | 'en'

export const profile = {
  name: 'BAE SUJIN',
  initials: 'BS',
  role: 'Frontend Engineer',
  location: 'Fukuoka, Japan',
  availability: 'Frontend Engineerとして、新しい機会についてお話しできます',
  email: 'oomia6027@naver.com',
  // TODO: 公開するGitHub URLが決まったら追加する。
}

export const hero = {
  titleLineOne: 'UI/UXの視点を、',
  titleLineTwo: '実装までつなぐ。',
  lead: 'Web DesignerからDesign Engineer、Frontend Engineerへ。UI/UXの知見を活かし、Vue.js / Nuxt.js / TypeScriptで、利用者にとって分かりやすく継続的に改善できるUIを実装します。',
  careerPath: 'Web Designer → Design Engineer → Frontend Engineer',
  focus: 'Vue.js / Nuxt.js / TypeScript',
  experience: 'Web領域で約6年の実務経験',
}

export const about = {
  title: 'デザインと開発をつなぐ、Frontend Engineer',
  lead: 'Web Design・UI/UXの経験を基盤に、Frontend Engineeringへと専門性を広げてきました。',
  paragraphs: [
    '現在はPayPay CardでFrontend Engineerとして、Vue.js / Nuxt.js / TypeScriptを用いた金融サービスのWebアプリケーション開発に携わっています。',
    'デザインの意図を理解しながら、再利用性・保守性を考慮したUIコンポーネントと画面の構造を設計し、ユーザー視点と実装視点の両方からUIを形にします。',
    'PdM、デザイナー、バックエンドエンジニアと連携し、仕様検討から実装・品質確認までチームで進めることを大切にしています。',
  ],
}

export const navigation: NavigationItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const experiences: Experience[] = [
  {
    period: '2025.10 — Present',
    role: 'Frontend Engineer',
    company: 'PayPay Card',
    summary: '金融サービスのWebアプリケーションにおける画面開発・改修、コンポーネント設計・実装に携わっています。',
    highlights: [
      'Vue.js / Nuxt.js / TypeScriptによるフロントエンド開発',
      '再利用性・保守性を考慮したコンポーネントの設計・実装',
      'API連携・非同期処理の実装、API仕様確認・シーケンス図レビュー',
      'GitHubのPull Requestを用いたコードレビュー、E2Eテストシナリオと一部機能のPlaywrightテストコード作成',
      'スクラム開発に参加し、PdM・デザイナー・バックエンドエンジニアと仕様を調整',
    ],
  },
  {
    period: '2023.01 — 2025.09',
    role: 'Design Engineer',
    company: 'PayPay Card',
    summary: 'UI/UX改善の提案と、Vue.js / Nuxt.js / TypeScriptを用いたフロントエンド実装を担当しました。',
    highlights: [
      'WebアプリケーションのUI/UX改善提案とフロントエンド実装',
      'デザインシステムに基づくUIコンポーネントの開発・改善',
      'Figmaを用いたデザイン確認・実装、PdM・デザイナー・エンジニアとの仕様調整',
      'サービスの運用・保守、利用者に分かりやすい文言の改善に関する取り組み',
    ],
  },
  {
    period: '2019.03 — 2022.04',
    role: 'Web Designer',
    company: 'LYZON',
    summary: 'コーポレートサイト、キャンペーンサイト、Landing PageのUI/UXデザイン、コーディング、運用に携わりました。',
    highlights: [
      'WebサイトのUI/UXデザイン、コーディング、運用・更新',
      'WordPress・Sitecoreを用いたCMSサイトの制作・運用',
      'ワイヤーフレーム、アイコン、イラスト、ロゴ・バナーなどのデザイン制作',
      '更新性・運用性を考慮したデザイン設計と、関係者との認識合わせ',
    ],
  },
]

export const projects: Project[] = [
  {
    title: '金融サービスにおけるフロントエンド開発',
    category: 'Frontend Development',
    description: 'PayPay Cardでの実務経験を、公開可能な範囲で一般化して紹介します。内部の画面、プロジェクト名、コードは掲載していません。',
    details: [
      {
        label: '実装',
        text: 'Vue.js / Nuxt.js / TypeScriptを用いた画面開発・改修、デザインシステムに基づくUIコンポーネントの開発・改善。',
      },
      {
        label: '連携・品質',
        text: 'API連携・非同期処理の実装、API仕様確認・シーケンス図レビュー、E2Eテストシナリオと一部機能のPlaywrightテストコード作成。',
      },
      {
        label: 'UI/UX',
        text: 'UI/UXの観点から仕様を検討し、PdM・デザイナー・バックエンドエンジニアと連携して開発を進める。',
      },
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    title: '財形住宅金融株式会社様 ランディングページ',
    category: 'Web Design / UI・UX',
    description: 'LYZON在籍時に、UI/UXデザインからコーディングまでを担当した公開可能なランディングページです。',
    details: [
      {
        label: '担当',
        text: 'UI/UXデザインおよびコーディング。',
      },
      {
        label: '公開事例',
        text: 'LYZON DesignのCase Studyとして公開されています。',
      },
    ],
    technologies: ['Web Design', 'UI/UX', 'HTML', 'CSS'],
    link: {
      url: 'https://design.lyzon.co.jp/case/zaijukin/',
      label: '公開事例を見る',
    },
  },
  {
    title: 'LYZON Design',
    category: 'Web Design / SVG Illustration',
    description: 'LYZON DesignのWebサイトで、ページデザインの一部とイラスト用SVGファイルの制作に参加しました。',
    details: [
      {
        label: '担当',
        text: 'ページデザインの一部、およびイラスト用SVGファイルの制作。',
      },
      {
        label: '公開サイト',
        text: 'LYZONのデザインに関する情報と制作事例を紹介するWebサイトです。',
      },
    ],
    technologies: ['Web Design', 'SVG Illustration'],
    link: {
      url: 'https://design.lyzon.co.jp/',
      label: 'サイトを見る',
    },
  },
  {
    title: 'イオンフィナンシャルサービス株式会社様 CMS構築',
    category: 'CMS Construction / Sitecore',
    description: 'LYZON在籍時に参加した、クレジットカード利用促進キャンペーンサイトおよびコーポレートサイトのCMS構築プロジェクトです。',
    details: [
      {
        label: '担当',
        text: 'CMS構築作業に参加。初期はサポートとして参画し、プロジェクト中盤以降は担当範囲が広がり、中心的に取り組みました。',
      },
      {
        label: '公開事例',
        text: 'LYZONの制作実績として、プロジェクト概要と構築内容が公開されています。',
      },
    ],
    technologies: ['Sitecore', 'CMS Construction', 'Web Design'],
    link: {
      url: 'https://www.lyzon.co.jp/works/aeon/',
      label: '公開事例を見る',
    },
  },
  {
    title: 'このポートフォリオサイト',
    category: 'Personal Project',
    description: 'Frontend Engineerとしての考え方と実装品質を伝えるために制作した、one-pageポートフォリオです。',
    details: [
      {
        label: '構成',
        text: 'Nuxt 4.5.2、Vue、TypeScriptで構成し、コンテンツデータとUIコンポーネントを分離。',
      },
      {
        label: 'UI実装',
        text: '外部UI/CSSフレームワークを使わず、vanilla CSSによるmobile-firstのレスポンシブ設計を採用。',
      },
      {
        label: 'アクセシビリティ',
        text: 'semantic HTML、キーボード操作時のfocus states、skip link、prefers-reduced-motionに対応。',
      },
    ],
    technologies: ['Nuxt 4', 'Vue', 'TypeScript', 'CSS', 'npm'],
    // TODO: 公開GitHub URLを確定後に追加する。
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: '実務で使用しているフロントエンド技術です。',
    skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'Pug'],
    kind: 'professional',
  },
  {
    title: 'Tools / Workflow',
    description: '日々の開発・デザイン作業で使用しているツールです。',
    skills: ['Git', 'GitHub', 'Figma', 'Jira / Confluence', 'WordPress', 'Sitecore'],
    kind: 'professional',
  },
  {
    title: 'Design, Testing & UI/UX',
    description: 'Web DesignerとしてのUI/UX経験と、E2Eテストを含む品質確認の実務経験です。',
    skills: ['Web Design', 'UI/UX', 'Responsive Design', 'E2E Test Scenarios', 'Playwright（一部機能）'],
    kind: 'professional',
  },
  {
    title: 'Learning / Exploring',
    description: '現在学習・探索している領域です。実務経験としては表示していません。',
    skills: ['React', 'Frontend Testing'],
    kind: 'learning',
  },
]

const profileEnglish = {
  ...profile,
  availability: 'Open to conversations about new Frontend Engineer opportunities.',
}

const heroEnglish = {
  titleLineOne: 'Turning UI/UX insight',
  titleLineTwo: 'into implementation.',
  lead: 'From Web Designer to Design Engineer to Frontend Engineer. I bring a UI/UX perspective to Vue.js / Nuxt.js / TypeScript development, building interfaces that are clear for users and ready for continuous improvement.',
  careerPath: 'Web Designer → Design Engineer → Frontend Engineer',
  focus: 'Vue.js / Nuxt.js / TypeScript',
  experience: 'Around 6 years of professional experience in web development',
}

const aboutEnglish = {
  title: 'A Frontend Engineer connecting design and development',
  lead: 'I have expanded my expertise into Frontend Engineering from a foundation in Web Design and UI/UX.',
  paragraphs: [
    'I currently work as a Frontend Engineer at PayPay Card, contributing to financial service web application development with Vue.js / Nuxt.js / TypeScript.',
    'By understanding design intent, I design and build UI components and screens with reusability and maintainability in mind, bringing both the user and implementation perspectives to the work.',
    'I value collaborating with Product Managers, designers, and backend engineers from requirements discussions through implementation and quality review.',
  ],
}

const navigationEnglish: NavigationItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const experiencesEnglish: Experience[] = [
  {
    period: '2025.10 — Present',
    role: 'Frontend Engineer',
    company: 'PayPay Card',
    summary: 'Contributing to screen development and improvements, as well as component design and implementation for financial service web applications.',
    highlights: [
      'Frontend development with Vue.js / Nuxt.js / TypeScript',
      'Design and implementation of reusable, maintainable components',
      'API integration and asynchronous processing, including API specification checks and sequence diagram reviews',
      'GitHub Pull Request code reviews, E2E scenario review, and Playwright test code for selected features',
      'Scrum collaboration with Product Managers, designers, and backend engineers to align on requirements',
    ],
  },
  {
    period: '2023.01 — 2025.09',
    role: 'Design Engineer',
    company: 'PayPay Card',
    summary: 'Worked on UI/UX improvement proposals and frontend implementation with Vue.js / Nuxt.js / TypeScript.',
    highlights: [
      'Proposed UI/UX improvements and implemented frontend changes for web applications',
      'Developed and improved UI components based on a design system',
      'Reviewed designs and translated them into implementation with Figma, coordinating requirements with Product Managers, designers, and engineers',
      'Contributed to service operation and maintenance, including efforts to improve user-facing copy',
    ],
  },
  {
    period: '2019.03 — 2022.04',
    role: 'Web Designer',
    company: 'LYZON',
    summary: 'Worked on UI/UX design, coding, and maintenance for corporate websites, campaign sites, and landing pages.',
    highlights: [
      'UI/UX design, coding, operation, and updates for websites',
      'Production and operation of CMS websites using WordPress and Sitecore',
      'Design production including wireframes, icons, illustrations, logos, and banners',
      'Design planning with updateability and operational needs in mind, aligning understanding with stakeholders',
    ],
  },
]

const projectsEnglish: Project[] = [
  {
    title: 'Frontend development for a financial service',
    category: 'Frontend Development',
    description: 'A generalized overview of my professional experience at PayPay Card within the scope that can be shared publicly. Internal screens, project names, and source code are not included.',
    details: [
      {
        label: 'Implementation',
        text: 'Screen development and improvements, plus development and improvement of design-system-based UI components with Vue.js / Nuxt.js / TypeScript.',
      },
      {
        label: 'Integration & quality',
        text: 'API integration and asynchronous processing, API specification checks, sequence diagram reviews, E2E scenario review, and Playwright test code for selected features.',
      },
      {
        label: 'UI/UX',
        text: 'Considered requirements from a UI/UX perspective and collaborated with Product Managers, designers, and backend engineers throughout development.',
      },
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    title: 'Zaijukin landing page',
    category: 'Web Design / UI/UX',
    description: 'A publicly available landing page for which I handled the UI/UX design through coding while at LYZON.',
    details: [
      {
        label: 'Contribution',
        text: 'UI/UX design and coding.',
      },
      {
        label: 'Public case study',
        text: 'Published as a case study on LYZON Design.',
      },
    ],
    technologies: ['Web Design', 'UI/UX', 'HTML', 'CSS'],
    link: {
      url: 'https://design.lyzon.co.jp/case/zaijukin/',
      label: 'View public case study',
    },
  },
  {
    title: 'LYZON Design',
    category: 'Web Design / SVG Illustration',
    description: 'I contributed to part of the page design and the production of SVG illustration files for the LYZON Design website.',
    details: [
      {
        label: 'Contribution',
        text: 'Part of the page design and production of SVG illustration files.',
      },
      {
        label: 'Public website',
        text: 'A website introducing LYZON’s design work and case studies.',
      },
    ],
    technologies: ['Web Design', 'SVG Illustration'],
    link: {
      url: 'https://design.lyzon.co.jp/',
      label: 'View website',
    },
  },
  {
    title: 'AEON Financial Service CMS construction',
    category: 'CMS Construction / Sitecore',
    description: 'A CMS construction project for a credit card promotion campaign site and corporate site that I joined while at LYZON.',
    details: [
      {
        label: 'Contribution',
        text: 'I initially joined as support; from the middle of the project, my scope expanded and I contributed as a core member.',
      },
      {
        label: 'Public case study',
        text: 'The project overview and construction details are published in LYZON’s works archive.',
      },
    ],
    technologies: ['Sitecore', 'CMS Construction', 'Web Design'],
    link: {
      url: 'https://www.lyzon.co.jp/works/aeon/',
      label: 'View public case study',
    },
  },
  {
    title: 'This portfolio website',
    category: 'Personal Project',
    description: 'A one-page portfolio built to communicate my approach and implementation quality as a Frontend Engineer.',
    details: [
      {
        label: 'Structure',
        text: 'Built with Nuxt 4.5.2, Vue, and TypeScript, separating content data from UI components.',
      },
      {
        label: 'UI implementation',
        text: 'Mobile-first responsive design with vanilla CSS, without an external UI or CSS framework.',
      },
      {
        label: 'Accessibility',
        text: 'Semantic HTML, keyboard focus states, a skip link, and prefers-reduced-motion support.',
      },
    ],
    technologies: ['Nuxt 4', 'Vue', 'TypeScript', 'CSS', 'npm'],
    // TODO: Add the public GitHub URL once it is confirmed.
  },
]

const skillGroupsEnglish: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Frontend technologies I use professionally.',
    skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'Pug'],
    kind: 'professional',
  },
  {
    title: 'Tools / Workflow',
    description: 'Tools used in day-to-day development and design work.',
    skills: ['Git', 'GitHub', 'Figma', 'Jira / Confluence', 'WordPress', 'Sitecore'],
    kind: 'professional',
  },
  {
    title: 'Design, Testing & UI/UX',
    description: 'UI/UX experience from my Web Designer background and professional quality-check experience including E2E testing.',
    skills: ['Web Design', 'UI/UX', 'Responsive Design', 'E2E Test Scenarios', 'Playwright (selected features)'],
    kind: 'professional',
  },
  {
    title: 'Learning / Exploring',
    description: 'Areas I am currently learning and exploring. These are not presented as professional experience.',
    skills: ['React', 'Frontend Testing'],
    kind: 'learning',
  },
]

export const portfolioContent = {
  ja: {
    profile,
    hero,
    about,
    navigation,
    experiences,
    projects,
    skillGroups,
  },
  en: {
    profile: profileEnglish,
    hero: heroEnglish,
    about: aboutEnglish,
    navigation: navigationEnglish,
    experiences: experiencesEnglish,
    projects: projectsEnglish,
    skillGroups: skillGroupsEnglish,
  },
} as const

export const portfolioUi = {
  ja: {
    languageSelection: '言語を選択',
    englishComingSoon: '英語版は準備中です',
    openingPortfolio: 'Opening Portfolio',
    enterPortfolio: 'Enter Portfolio',
    mainNavigation: 'メインナビゲーション',
    skipToContent: '本文へ移動',
    aboutEyebrow: '01 / About',
    aboutTitle: 'デザインと開発をつなぐ、Frontend Engineer',
    experienceEyebrow: '02 / Experience',
    experienceTitle: '経験',
    experienceDescription: 'プロダクトの背景を理解し、設計から実装・改善まで責任を持って取り組みます。',
    experienceAria: '職務経歴',
    projectsEyebrow: '03 / Projects',
    projectsTitle: 'Case Studies',
    projectsDescription: '課題、担当範囲、成果が分かる形でプロジェクトを紹介します。',
    technologiesAria: '使用技術',
    skillsEyebrow: '04 / Skills',
    skillsTitle: 'できること',
    skillsDescription: '実務で使用している技術と、現在学習・探索している領域を分けて掲載しています。',
    professionalExperience: 'Professional Experience',
    learningExploring: 'Learning / Exploring',
    contactEyebrow: '05 / Contact',
    contactTitle: '一緒に、より良い体験をつくりませんか。',
    contactDescription: '採用やプロジェクトについて、お気軽にご連絡ください。',
    sendEmail: 'メールを送る',
    backToTop: 'ページ上部へ',
    newTab: '（新しいタブで開きます）',
  },
  en: {
    languageSelection: 'Select language',
    englishComingSoon: 'English version',
    openingPortfolio: 'Opening Portfolio',
    enterPortfolio: 'Enter Portfolio',
    mainNavigation: 'Main navigation',
    skipToContent: 'Skip to content',
    aboutEyebrow: '01 / About',
    aboutTitle: 'A Frontend Engineer connecting design and development',
    experienceEyebrow: '02 / Experience',
    experienceTitle: 'Experience',
    experienceDescription: 'I understand the product context and take responsibility from design through implementation and improvement.',
    experienceAria: 'Work experience',
    projectsEyebrow: '03 / Projects',
    projectsTitle: 'Case Studies',
    projectsDescription: 'Selected projects presented with context, contribution, and implementation details.',
    technologiesAria: 'Technologies used',
    skillsEyebrow: '04 / Skills',
    skillsTitle: 'What I do',
    skillsDescription: 'Professional technologies are separated from the areas I am currently learning and exploring.',
    professionalExperience: 'Professional Experience',
    learningExploring: 'Learning / Exploring',
    contactEyebrow: '05 / Contact',
    contactTitle: 'Let’s create better experiences together.',
    contactDescription: 'Feel free to get in touch about opportunities or projects.',
    sendEmail: 'Send an email',
    backToTop: 'Back to top',
    newTab: '(opens in a new tab)',
  },
} as const
