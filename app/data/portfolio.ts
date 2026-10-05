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
  url?: string
}

export interface ProjectLink {
  url: string
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
  skills: string[]
  kind: 'professional' | 'learning'
}

export type PortfolioLanguage = 'ja' | 'en'

export const profile = {
  name: 'BAE SUJIN',
  role: 'Frontend Engineer',
  location: 'Fukuoka, Japan',
  email: 'oomia6027@gmail.com',
}

export const hero = {
  desktopBreakAfter: 'Frontend Engineerへ。',
  titleLineOne: 'UI/UXの視点を',
  titleLineTwo: '実装までつなぐ',
  lead: 'Web DesignerからDesign Engineer、Frontend Engineerへ。UI/UXの知見を活かし、Vue.js / Nuxt.js / TypeScriptで、分かりやすく保守しやすいUIを実装します。',
  careerPath: 'Web Designer → Design Engineer → Frontend Engineer',
}

export const about = {
  introduction: 'デザインと開発をつなぐ、フロントエンドエンジニアのぺです！',
  personalDetails: [
    { label: '呼び名', text: 'ぺさん' },
    { label: '出身', text: '韓国・大邱（テグ）' },
    { label: '趣味', text: 'PCゲーム（Steam）・イラスト制作' },
  ],
  summaryBreakAfter: '現在はPayPay CardでFrontend Engineerとして、Vue.js / Nuxt.js / TypeScriptを用いた',
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
    summary: 'コーポレートサイト、キャンペーンサイト、ランディングページのUI/UXデザイン、コーディング、運用に携わりました。',
    highlights: [
      'WebサイトのUI/UXデザイン、コーディング、運用・更新',
      'Sitecoreを用いたCMSサイトの制作・運用、CMS移行プロジェクトへの参加',
      'ワイヤーフレーム、アイコン、イラスト、ロゴ・バナーなどのデザイン制作',
      '更新性・運用性を考慮したデザイン設計と、関係者との認識合わせ',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'PayPay Card',
    category: 'Frontend Development',
    description: 'PayPay Cardでの担当業務の概要を、機密情報を含まない範囲で紹介します。内部の画面、プロジェクト名、コードは掲載していません。',
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
    title: '財形住宅金融株式会社',
    category: 'Web Design / UI・UX',
    description: 'LYZON在籍時に、UI/UXデザインからコーディングまでを担当したランディングページです。',
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
    },
  },
  {
    title: 'LYZON',
    category: 'Web Design / SVG Illustration',
    description: 'LYZON DesignのWebサイトで、ページデザインの一部とSVGイラストの制作を担当しました。',
    details: [
      {
        label: '担当',
        text: 'ページデザインの一部、およびSVGイラストの制作。',
      },
      {
        label: '公開サイト',
        text: 'LYZONのデザインに関する情報と制作事例を紹介するWebサイトです。',
      },
    ],
    technologies: ['Web Design', 'SVG Illustration'],
    link: {
      url: 'https://design.lyzon.co.jp/',
    },
  },
  {
    title: 'イオンフィナンシャルサービス株式会社',
    category: 'CMS Development / Sitecore',
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
    technologies: ['Sitecore', 'CMS Development', 'Web Design'],
    link: {
      url: 'https://www.lyzon.co.jp/works/aeon/',
    },
  },
  {
    title: 'その他の運用案件',
    category: 'Website Operations',
    description: '',
    details: [
      {
        label: '東京タワー',
        text: 'https://www.tokyotower.co.jp/',
        url: 'https://www.tokyotower.co.jp/',
      },
      {
        label: 'SOMPOホールディングス',
        text: 'https://www.sompo-hd.com/',
        url: 'https://www.sompo-hd.com/',
      },
    ],
    technologies: [],
  },
  {
    title: 'Personal Portfolio',
    category: 'Personal Project',
    description: 'Frontend Engineerとしての経験と制作事例を紹介するポートフォリオです。',
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
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'jQuery'],
    kind: 'professional',
  },
  {
    title: 'Tools / Workflow',
    skills: ['Git', 'GitHub', 'Figma', 'Sitecore'],
    kind: 'professional',
  },
  {
    title: 'Design, Testing & UI/UX',
    skills: ['Web Design', 'UI/UX', 'Responsive Design', 'E2E Test Scenarios', 'Playwright（一部機能）'],
    kind: 'professional',
  },
  {
    title: 'Learning / Exploring',
    skills: ['React', 'Frontend Testing'],
    kind: 'learning',
  },
]

const heroEnglish = {
  desktopBreakAfter: 'Frontend Engineer. ',
  titleLineOne: 'Turning UI/UX insight',
  titleLineTwo: 'into implementation',
  lead: 'From Web Designer to Design Engineer to Frontend Engineer. I bring a UI/UX perspective to development with Vue.js / Nuxt.js / TypeScript, building clear, maintainable user interfaces.',
  careerPath: 'Web Designer → Design Engineer → Frontend Engineer',
}

const aboutEnglish = {
  introduction: 'Hi, I’m Sujin, a frontend engineer connecting design and development!',
  personalDetails: [
    { label: 'Nickname', text: 'Pe-san' },
    { label: 'Hometown', text: 'Daegu, South Korea' },
    { label: 'Hobbies', text: 'PC games (Steam) · Illustration' },
  ],
  summaryBreakAfter: '',
  lead: 'My frontend engineering work builds on my background in web design and UI/UX.',
  paragraphs: [
    'I currently work as a Frontend Engineer at PayPay Card, contributing to financial service web application development with Vue.js / Nuxt.js / TypeScript.',
    'By understanding design intent, I design and build UI components and screens with reusability and maintainability in mind, bringing both the user and implementation perspectives to the work.',
    'I value collaborating with Product Managers, designers, and backend engineers from requirements discussions through implementation and quality review.',
  ],
}

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
      'GitHub Pull Request code reviews, E2E test scenario creation, and Playwright test code for selected features',
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
      'Development and maintenance of Sitecore websites, including CMS migration projects',
      'Design production including wireframes, icons, illustrations, logos, and banners',
      'Designing for maintainability and ongoing updates, while aligning with stakeholders',
    ],
  },
]

const projectsEnglish: Project[] = [
  {
    title: 'PayPay Card',
    category: 'Frontend Development',
    description: 'An overview of my responsibilities at PayPay Card, excluding confidential information. Internal screens, project names, and source code are not included.',
    details: [
      {
        label: 'Implementation',
        text: 'Screen development and improvements, plus development and improvement of design-system-based UI components with Vue.js / Nuxt.js / TypeScript.',
      },
      {
        label: 'Integration & quality',
        text: 'API integration and asynchronous processing, API specification checks, sequence diagram reviews, E2E test scenario creation, and Playwright test code for selected features.',
      },
      {
        label: 'UI/UX',
        text: 'Considered requirements from a UI/UX perspective and collaborated with Product Managers, designers, and backend engineers throughout development.',
      },
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    title: 'Zaijukin',
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
    },
  },
  {
    title: 'LYZON',
    category: 'Web Design / SVG Illustration',
    description: 'I contributed page designs and SVG illustrations to the LYZON Design website.',
    details: [
      {
        label: 'Contribution',
        text: 'Design for selected pages and creation of SVG illustrations.',
      },
      {
        label: 'Public website',
        text: 'A website introducing LYZON’s design work and case studies.',
      },
    ],
    technologies: ['Web Design', 'SVG Illustration'],
    link: {
      url: 'https://design.lyzon.co.jp/',
    },
  },
  {
    title: 'AEON Financial Service',
    category: 'CMS Development / Sitecore',
    description: 'A CMS development project for a credit card promotion campaign site and corporate website that I contributed to while at LYZON.',
    details: [
      {
        label: 'Contribution',
        text: 'I initially joined as support; from the middle of the project, my scope expanded and I contributed as a core member.',
      },
      {
        label: 'Public case study',
        text: 'The project overview and implementation details are published in LYZON’s works archive.',
      },
    ],
    technologies: ['Sitecore', 'CMS Development', 'Web Design'],
    link: {
      url: 'https://www.lyzon.co.jp/works/aeon/',
    },
  },
  {
    title: 'Other website operations',
    category: 'Website Operations',
    description: '',
    details: [
      {
        label: 'Tokyo Tower',
        text: 'https://www.tokyotower.co.jp/',
        url: 'https://www.tokyotower.co.jp/',
      },
      {
        label: 'SOMPO Holdings',
        text: 'https://www.sompo-hd.com/',
        url: 'https://www.sompo-hd.com/',
      },
    ],
    technologies: [],
  },
  {
    title: 'Personal Portfolio',
    category: 'Personal Project',
    description: 'A personal portfolio showcasing my frontend engineering experience and selected work.',
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
  },
]

const skillGroupsEnglish: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'jQuery'],
    kind: 'professional',
  },
  {
    title: 'Tools / Workflow',
    skills: ['Git', 'GitHub', 'Figma', 'Sitecore'],
    kind: 'professional',
  },
  {
    title: 'Design, Testing & UI/UX',
    skills: ['Web Design', 'UI/UX', 'Responsive Design', 'E2E Test Scenarios', 'Playwright (selected features)'],
    kind: 'professional',
  },
  {
    title: 'Learning / Exploring',
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
    profile,
    hero: heroEnglish,
    about: aboutEnglish,
    navigation,
    experiences: experiencesEnglish,
    projects: projectsEnglish,
    skillGroups: skillGroupsEnglish,
  },
} as const

export const portfolioUi = {
  ja: {
    languageSelection: '言語を選択',
    enterPortfolio: 'Enter Portfolio',
    mainNavigation: 'メインナビゲーション',
    backToHome: 'メインビジュアルへ',
    sectionNavigation: 'セクションナビゲーション',
    skipToContent: '本文へ移動',
    aboutEyebrow: '01 / About',
    aboutTitle: 'デザインと開発をつなぐ\nFrontend Engineer',
    experienceEyebrow: '02 / Experience',
    experienceTitle: '経験',
    experienceDescription: 'プロダクトの背景を理解し、設計から実装・改善まで責任を持って取り組みます。',
    experienceAria: '職務経歴',
    projectsEyebrow: '03 / Projects',
    projectsTitle: 'Case Studies',
    projectsDescription: 'これまでに携わった制作・開発・運用の事例を紹介します。',
    technologiesAria: '使用技術',
    skillsEyebrow: '04 / Skills',
    skillsTitle: 'できること',
    skillsDescription: '実務で使用している技術と、現在学習・探索している領域を分けて掲載しています。',
    professionalExperience: 'Professional Experience',
    contactEyebrow: '05 / Contact',
    contactTitle: '一緒に、より良い体験をつくりませんか',
    contactDescription: '採用やプロジェクトについて、\nお気軽にご連絡ください。',
    sendEmail: 'メールを送る',
    backToTop: 'ページ上部へ',
    newTab: '（新しいタブで開きます）',
    closeModal: '詳細を閉じる',
  },
  en: {
    languageSelection: 'Select language',
    enterPortfolio: 'Enter Portfolio',
    mainNavigation: 'Main navigation',
    backToHome: 'Back to home',
    sectionNavigation: 'Section navigation',
    skipToContent: 'Skip to content',
    aboutEyebrow: '01 / About',
    aboutTitle: 'A Frontend Engineer connecting design and development',
    experienceEyebrow: '02 / Experience',
    experienceTitle: 'Experience',
    experienceDescription: 'I understand the product context and take responsibility from design through implementation and improvement.',
    experienceAria: 'Work experience',
    projectsEyebrow: '03 / Projects',
    projectsTitle: 'Case Studies',
    projectsDescription: 'Selected work in design, development, and website maintenance.',
    technologiesAria: 'Technologies used',
    skillsEyebrow: '04 / Skills',
    skillsTitle: 'What I do',
    skillsDescription: 'Technologies I use professionally, alongside areas I am learning and exploring.',
    professionalExperience: 'Professional Experience',
    contactEyebrow: '05 / Contact',
    contactTitle: 'Let’s create better experiences together',
    contactDescription: 'Feel free to get in touch about opportunities or projects.',
    sendEmail: 'Send an email',
    backToTop: 'Back to top',
    newTab: '(opens in a new tab)',
    closeModal: 'Close details',
  },
} as const
