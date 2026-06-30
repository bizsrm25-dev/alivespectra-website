export type Service = {
  slug: string;
  name: string;
  /** One-line promise — plain, specific, no buzzwords. */
  promise: string;
  href: string;
  /** Wavelength accent sampled along the spectrum (violet → red). Accent only. */
  hue: string;
  /** One-line positioning for the detail hero / meta description. */
  overview: string;
  /** Qualitative market context + approach. Defensible, no hard stats. */
  context: string;
  keyServices: string[];
  /** The sister concern (or network) this service is delivered with. */
  ecosystem: { label: string; href: string; note: string };
  /** A relevant project as proof. */
  project: { name: string; href: string };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "funding-investment-advisory",
    name: "Funding & Investment Advisory",
    promise:
      "Get investment-ready and reach capital through our in-house investor network.",
    href: "/services/funding-investment-advisory",
    hue: "#6c4cf1",
    overview:
      "We make a business investment-ready, then connect it to the right capital.",
    context:
      "Most good businesses in Bangladesh do not fail for lack of an idea — they stall because they are not structured the way investors and lenders expect. We close that gap: tightening the model, the numbers, and the story, then introducing founders to capital through our own investor relationships. The work is hands-on and judged by one outcome — money in the bank on terms that still leave you in control.",
    keyServices: [
      "Investment readiness review and gap-fix",
      "Financial models, projections, and valuation support",
      "Pitch, data room, and investor materials",
      "Investor and lender introductions through our network",
      "Deal structuring and negotiation support",
    ],
    ecosystem: {
      label: "Team Alive",
      href: "/ecosystem/team-alive",
      note: "Routed through our in-house investor network and Team Alive.",
    },
    project: {
      name: "Diligence Universal",
      href: "/projects/diligence-universal",
    },
    faqs: [
      {
        q: "Do you help raise capital, or only advise?",
        a: "Both. We get you investment-ready and then make warm introductions through our investor network — we are involved through the raise, not just the prep.",
      },
      {
        q: "What stage do you work with?",
        a: "From fundable early-stage ventures to established SMEs and corporates seeking growth or expansion capital.",
      },
      {
        q: "Is this only for Dhaka-based businesses?",
        a: "No. We are based in Gulshan, Dhaka, and work with founders and companies across Bangladesh.",
      },
    ],
  },
  {
    slug: "it-digital-solutions",
    name: "IT & Digital Solutions",
    promise: "Build the digital backbone — software, platforms, and data.",
    href: "/services/it-digital-solutions",
    hue: "#4f6ef0",
    overview:
      "Strategy and engineering to build the systems your business actually runs on.",
    context:
      "Digital is no longer a department — it is the operating layer of a competitive business. We help organisations decide what to build, then build it: from internal systems and customer platforms to the data foundations that make better decisions possible. The emphasis is on durable, maintainable software that earns its keep, not technology for its own sake.",
    keyServices: [
      "Digital strategy and systems architecture",
      "Web, platform, and custom software development",
      "Data foundations, dashboards, and reporting",
      "Cloud, integration, and automation",
      "Technical advisory and team augmentation",
    ],
    ecosystem: {
      label: "BizSolve",
      href: "/ecosystem/bizsolve",
      note: "Built with BizSolve, our technology and software arm.",
    },
    project: {
      name: "Pro Health Smart Hospital",
      href: "/projects/pro-health-smart-hospital",
    },
    faqs: [
      {
        q: "Can you take a project end to end?",
        a: "Yes — from strategy and architecture through build, launch, and support, delivered with our technology arm BizSolve.",
      },
      {
        q: "Do you work with our existing tech team?",
        a: "Often. We can lead a build or augment and advise your in-house team, whichever fits.",
      },
    ],
  },
  {
    slug: "marketing-pr",
    name: "Marketing & PR",
    promise: "Earn attention and trust with strategy-led marketing and PR.",
    href: "/services/marketing-pr",
    hue: "#2f8fe8",
    overview:
      "Positioning, marketing, and public relations that build durable trust.",
    context:
      "Attention is cheap; trust is not. We start with positioning — what you stand for and why it matters to a specific buyer — then build the marketing and PR to carry it consistently across channels. For consultancy, B2B, and reputation-sensitive businesses, the goal is credibility that compounds, not noise that spikes and fades.",
    keyServices: [
      "Brand positioning and messaging",
      "Marketing strategy and campaign planning",
      "Public relations and media relations",
      "Content, social, and digital marketing",
      "Reputation and stakeholder communications",
    ],
    ecosystem: {
      label: "Alive Lighthouse",
      href: "/ecosystem/alive-lighthouse",
      note: "Amplified through Alive Lighthouse, our brand and visibility arm.",
    },
    project: { name: "Prime Place", href: "/projects/prime-place" },
    faqs: [
      {
        q: "Do you handle PR as well as marketing?",
        a: "Yes — positioning, marketing, and public/media relations are handled together so the message stays consistent.",
      },
      {
        q: "Can you work with our internal marketing team?",
        a: "Yes. We commonly set the strategy and let your team execute, or run campaigns end to end.",
      },
    ],
  },
  {
    slug: "management-consultancy",
    name: "Management Consultancy",
    promise: "Sharpen strategy, operations, and governance for durable growth.",
    href: "/services/management-consultancy",
    hue: "#2fa9a0",
    overview:
      "Strategy, operations, and governance work that makes a business easier to scale.",
    context:
      "Growth exposes whatever was improvised earlier. We help leadership teams set a clear strategy, then build the operations and governance to deliver it — roles, processes, controls, and the cadence that keeps execution honest. The aim is an organisation that runs well without depending on heroics.",
    keyServices: [
      "Strategy and growth planning",
      "Operating model and process design",
      "Governance, controls, and risk",
      "Organisation design and performance",
      "Transformation and change management",
    ],
    ecosystem: {
      label: "Team Alive",
      href: "/ecosystem/team-alive",
      note: "Backed by Team Alive, our consulting and talent bench.",
    },
    project: {
      name: "Diligence Universal",
      href: "/projects/diligence-universal",
    },
    faqs: [
      {
        q: "Is this advice or hands-on delivery?",
        a: "Both. We set direction and stay involved through implementation so change actually lands.",
      },
      {
        q: "Who do you usually work with?",
        a: "Founders, MDs, and leadership teams at SMEs and corporates ready to professionalise and scale.",
      },
    ],
  },
  {
    slug: "ai-training-consulting",
    name: "AI Training & Consulting",
    promise: "Put AI to work — practical training and adoption for your teams.",
    href: "/services/ai-training-consulting",
    hue: "#2fbe7e",
    overview:
      "Practical AI training and adoption that produces real productivity, not hype.",
    context:
      "AI rewards organisations that adopt it deliberately and punishes those that chase it. We help teams find the few use cases that genuinely move the needle, train people to use the tools well, and put light guardrails in place. Especially for finance, operations, and knowledge teams in Bangladesh, the win is measured in hours saved and decisions improved.",
    keyServices: [
      "AI opportunity assessment and roadmap",
      "Hands-on team training and enablement",
      "Workflow and tool integration",
      "Responsible-use guidelines and guardrails",
      "Executive briefings and upskilling",
    ],
    ecosystem: {
      label: "BizSolve",
      href: "/ecosystem/bizsolve",
      note: "Grounded in BizSolve's hands-on AI and software practice.",
    },
    project: {
      name: "Pro Health Smart Hospital",
      href: "/projects/pro-health-smart-hospital",
    },
    faqs: [
      {
        q: "Is the training tailored to our work?",
        a: "Yes — we train on your actual workflows and tools, not generic slides, so the skills transfer immediately.",
      },
      {
        q: "Do you offer training for finance professionals?",
        a: "Yes. Finance and operations teams are a core focus, with sessions built around real tasks they do every week.",
      },
    ],
  },
  {
    slug: "fintech-consultation",
    name: "Fintech Consultation",
    promise:
      "Navigate fintech and regulation with advisors who know the market.",
    href: "/services/fintech-consultation",
    hue: "#8bb85a",
    overview:
      "Advisory for fintech products and digital finance in the Bangladesh market.",
    context:
      "Fintech is one of the fastest-moving parts of the economy and one of the most regulated. We help founders and institutions shape products that are viable and compliant — clarifying the model, the partnerships, and the regulatory path before significant money is committed. Local context matters here, and we bring it.",
    keyServices: [
      "Fintech product and business model advisory",
      "Regulatory and compliance navigation",
      "Partnership and licensing strategy",
      "Go-to-market and growth planning",
      "Build support with our technology arm",
    ],
    ecosystem: {
      label: "BizSolve",
      href: "/ecosystem/bizsolve",
      note: "Engineered with BizSolve, our technology arm.",
    },
    project: {
      name: "Diligence Universal",
      href: "/projects/diligence-universal",
    },
    faqs: [
      {
        q: "Do you advise on regulatory approvals?",
        a: "We help you understand and plan the regulatory and licensing path; formal filings are made with the relevant authorities and counsel.",
      },
      {
        q: "Can you also build the product?",
        a: "Yes — strategy here, engineering through BizSolve, so advice and build stay aligned.",
      },
    ],
  },
  {
    slug: "budget-consultation",
    name: "Budget Consultation",
    promise: "Plan and control budgets that hold up under real-world pressure.",
    href: "/services/budget-consultation",
    hue: "#f2a93b",
    overview:
      "Budgeting and financial planning that stays realistic when conditions change.",
    context:
      "A budget is only useful if it survives contact with reality. We build budgets and financial plans grounded in how the business actually earns and spends, with the controls and review rhythm to keep them on track. The result is fewer surprises and faster, calmer decisions when something shifts.",
    keyServices: [
      "Annual and project budgeting",
      "Cash-flow planning and forecasting",
      "Cost control and spend governance",
      "Scenario and sensitivity planning",
      "Budget-vs-actual review cadence",
    ],
    ecosystem: {
      label: "Team Alive",
      href: "/ecosystem/team-alive",
      note: "Supported by Team Alive's advisory bench.",
    },
    project: { name: "Prime Place", href: "/projects/prime-place" },
    faqs: [
      {
        q: "Is this a one-off or ongoing?",
        a: "Either. We can build the budget and hand it over, or stay on for the review cadence that keeps it accurate.",
      },
      {
        q: "Does this connect to fundraising?",
        a: "Yes — sound budgeting feeds directly into the projections investors and lenders expect.",
      },
    ],
  },
  {
    slug: "agriculture-consultancy",
    name: "Agriculture Consultancy",
    promise: "Modernise agribusiness end to end, backed by Agrovez.",
    href: "/services/agriculture-consultancy",
    hue: "#ea7d44",
    overview:
      "Agribusiness strategy and modernisation, delivered with our agriculture arm.",
    context:
      "Agriculture remains central to Bangladesh's economy, and the opportunity is in modernising it — better practices, stronger market links, and sound investment. We advise agribusinesses and investors across the value chain, and deliver alongside Agrovez, our agriculture arm, so recommendations are grounded in real operating experience rather than theory.",
    keyServices: [
      "Agribusiness strategy and feasibility",
      "Value-chain and market-linkage planning",
      "Modern practices and productivity",
      "Agri-investment and project structuring",
      "Operating support through Agrovez",
    ],
    ecosystem: {
      label: "Agrovez",
      href: "/ecosystem/agrovez",
      note: "Delivered with Agrovez, our agribusiness arm.",
    },
    project: { name: "Unity Agro Park", href: "/projects/unity-agro-park" },
    faqs: [
      {
        q: "Do you cover investment as well as operations?",
        a: "Yes — from agribusiness strategy and feasibility through structuring and on-the-ground delivery with Agrovez.",
      },
      {
        q: "Can you help with agri-projects outside Dhaka?",
        a: "Yes. Agribusiness work happens where the land and markets are — we work across Bangladesh.",
      },
    ],
  },
  {
    slug: "creative-advertising",
    name: "Creative & Advertising",
    promise: "Ideas that move markets — creative built to perform.",
    href: "/services/creative-advertising",
    hue: "#e5564b",
    overview:
      "Creative and advertising that is distinctive and built to perform.",
    context:
      "Creative work earns its budget when it is both distinctive and accountable. We develop ideas rooted in a real strategy, then produce the advertising and content to carry them — and we care about what happens after launch, not just the launch. The point is work that is memorable and measurable.",
    keyServices: [
      "Creative concept and campaign ideas",
      "Advertising production across channels",
      "Content and social creative",
      "Brand and launch campaigns",
      "Performance-minded creative testing",
    ],
    ecosystem: {
      label: "Alive Lighthouse",
      href: "/ecosystem/alive-lighthouse",
      note: "Produced with Alive Lighthouse, our brand and creative arm.",
    },
    project: { name: "Prime Place", href: "/projects/prime-place" },
    faqs: [
      {
        q: "Do you tie creative to results?",
        a: "Yes — ideas start from strategy and we test and measure creative so spend stays accountable.",
      },
      {
        q: "Can you run a full launch campaign?",
        a: "Yes — concept, production, and rollout across the channels that fit the audience.",
      },
    ],
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
