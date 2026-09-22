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
