import type { BookStatus, ProjectStatus, SkillLevel } from "@/types";
import type { Locale } from "@/lib/i18n";

interface MetadataCopy {
  title: string;
  description: string;
}

interface AppDictionary {
  metadata: {
    home: MetadataCopy;
    about: MetadataCopy;
    books: MetadataCopy;
    projects: MetadataCopy;
    skills: MetadataCopy;
    projectNotFound: MetadataCopy;
  };
  nav: {
    role: string;
    languageLabel: string;
    links: {
      home: string;
      about: string;
      books: string;
      projects: string;
      skills: string;
    };
  };
  footer: {
    eyebrow: string;
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    ctaProjects: string;
    ctaAbout: string;
    focusEyebrow: string;
    focusTitle: string;
  };
  currentFocus: {
    eyebrow: string;
    title: string;
    description: string;
  };
  featuredProjects: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  readingShelf: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  coreSkills: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    socials: string;
    profileEyebrow: string;
    profileTitle: string;
    profileDescription: string;
    workflowEyebrow: string;
    workflowTitle: string;
    workflowDescription: string;
    workflowPrinciples: string;
    focusAreasEyebrow: string;
    focusAreasTitle: string;
    focusAreasDescription: string;
    nowEyebrow: string;
    nowTitle: string;
    nowDescription: string;
    toolkitEyebrow: string;
    toolkitTitle: string;
    toolkitDescription: string;
    timelineEyebrow: string;
    timelineTitle: string;
    timelineDescription: string;
  };
  booksPage: {
    eyebrow: string;
    title: string;
    description: string;
    filterStatusLabel: string;
    filterStatusAll: string;
    filterCategoryLabel: string;
    filterCategoryAll: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    description: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    archiveEyebrow: string;
    archiveTitle: string;
    archiveDescription: string;
  };
  skillsPage: {
    eyebrow: string;
    title: string;
    description: string;
    filterCategoryLabel: string;
    filterCategoryAll: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  projectCard: {
    featured: string;
    viewDetail: string;
  };
  bookCard: {
    recommended: string;
    coreTakeaways: string;
    ratingLabel: string;
    notesLabel: string;
    notesComing: string;
  };
  skillCard: {
    whereItHelps: string;
    relatedProjects: string;
  };
  projectDetail: {
    backToProjects: string;
    goalEyebrow: string;
    unavailableSuffix: string;
    sidebar: {
      status: string;
      role: string;
      created: string;
      updated: string;
      targetUsers: string;
      techStack: string;
      links: string;
      liveDemo: string;
      githubRepo: string;
    };
    sections: {
      productFraming: string;
      audience: string;
      coreFeatures: string;
      challenges: string;
      learnings: string;
    };
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
    browseProjects: string;
  };
  bookStatuses: Record<BookStatus, string>;
  projectStatuses: Record<ProjectStatus, string>;
  skillLevels: Record<SkillLevel, string>;
}

const dictionaries: Record<Locale, AppDictionary> = {
  en: {
    metadata: {
      home: {
        title: "Home",
        description:
          "A structured personal blog for He Junbo covering a gym-focused fitness app, reading, AI product workflow, and AIPM-oriented growth."
      },
      about: {
        title: "About",
        description:
          "About He Junbo, his AI-native product workflow, current focus areas, toolkit, and the direction behind the products he is building."
      },
      books: {
        title: "Books",
        description:
          "Books He Junbo has finished and is currently reading across product, cognition, growth, marketing, and work philosophy."
      },
      projects: {
        title: "Projects",
        description:
          "Current projects centered on a focused fitness app for gym users and a reusable blog system for long-term personal brand building."
      },
      skills: {
        title: "Skills",
        description:
          "A capability map covering AI-native product workflow, frontend delivery, content systems, and structured product thinking."
      },
      projectNotFound: {
        title: "Project not found",
        description: "The requested project does not exist."
      }
    },
    nav: {
      role: "AIPM / AI-native product explorer",
      languageLabel: "Language",
      links: {
        home: "Home",
        about: "About",
        books: "Books",
        projects: "Projects",
        skills: "Skills"
      }
    },
    footer: {
      eyebrow: "Keep in touch",
      title: "Building AI-native products, reusable content systems, and a long-term personal brand around real shipping practice.",
      description:
        "This blog acts as a structured home for my fitness product experiments, reading notes, AI product workflow, and evolving AIPM narrative."
    },
    hero: {
      badge: "AIPM Builder",
      ctaProjects: "View projects",
      ctaAbout: "About me",
      focusEyebrow: "Current focus",
      focusTitle:
        "Designing a more focused fitness app for gym users with an AI-first product workflow."
    },
    currentFocus: {
      eyebrow: "Current Focus",
      title: "What I am building, testing, and refining right now",
      description:
        "A compact snapshot of the workstreams currently shaping my fitness product, blog, and AI-native product method."
    },
    featuredProjects: {
      eyebrow: "Selected Work",
      title: "Projects that capture how I think, build, and package ideas",
      description:
        "These are the clearest expressions of my current direction: a focused fitness product and a blog system that turns experiments into reusable assets.",
      action: "See all projects"
    },
    readingShelf: {
      eyebrow: "Reading",
      title: "Books shaping my product judgement and long-term thinking",
      description:
        "A reading shelf built around product thinking, cognition, growth, and the kind of work philosophy I want to practice in the AI era.",
      action: "Browse all books"
    },
    coreSkills: {
      eyebrow: "Capabilities",
      title: "Core capabilities behind my current way of building",
      description:
        "Beyond tools, these are the product, research, and delivery capabilities I rely on when turning raw ideas into structured execution.",
      action: "Explore all skills"
    },
    aboutPage: {
      eyebrow: "About",
      title: "Learning in public while building products with AI, structure, and real user intent",
      socials: "Socials",
      profileEyebrow: "Profile",
      profileTitle: "A quick snapshot of who I am right now",
      profileDescription:
        "I want this site to communicate both identity and momentum: what I study, what I am building, and what I am optimizing for.",
      workflowEyebrow: "Workflow",
      workflowTitle: "The AI-native product workflow I am actively refining",
      workflowDescription:
        "Rather than treating AI as a side tool, I use it as a partner across research, product definition, documentation, and code translation.",
      workflowPrinciples: "Operating principles",
      focusAreasEyebrow: "Focus Areas",
      focusAreasTitle: "The intersections I care about most",
      focusAreasDescription:
        "Fitness scenarios, AI-native product work, and reusable content systems are the three threads shaping most of my current decisions.",
      nowEyebrow: "Now",
      nowTitle: "Current state",
      nowDescription:
        "The things I am actively shipping, learning, and turning into long-term personal assets.",
      toolkitEyebrow: "Toolkit",
      toolkitTitle: "Tools and systems I actually use",
      toolkitDescription:
        "I prefer a compact stack that keeps the loop between idea, document, and code as short as possible.",
      timelineEyebrow: "Timeline",
      timelineTitle: "A short path of becoming",
      timelineDescription:
        "A few milestones that explain how computer science study, product curiosity, and AI-native execution started converging."
    },
    booksPage: {
      eyebrow: "Books",
      title: "A reading shelf built around product, cognition, growth, and work philosophy",
      description:
        "This page packages the books I have finished and the ones I am currently reading into a reusable, updatable reading system.",
      filterStatusLabel: "Filter by status",
      filterStatusAll: "All status",
      filterCategoryLabel: "Filter by category",
      filterCategoryAll: "All categories",
      emptyTitle: "No books match these filters",
      emptyDescription: "Try clearing one of the filters to see the rest of the reading list."
    },
    projectsPage: {
      eyebrow: "Projects",
      title: "The products and systems that currently define my direction",
      description:
        "Right now my work centers on two things: building a more focused fitness app for gym users, and building a blog system that can carry my methods, reading, and product narrative forward.",
      featuredEyebrow: "Featured",
      featuredTitle: "The work to start with",
      featuredDescription:
        "These are the most representative pieces of how I combine user focus, AI workflow, and structured frontend delivery.",
      archiveEyebrow: "Archive",
      archiveTitle: "More experiments and case studies",
      archiveDescription:
        "Smaller products, prototypes, and concept-driven work that still reflect my approach to shaping clear software."
    },
    skillsPage: {
      eyebrow: "Skills",
      title: "Capabilities, not just a tool list",
      description:
        "This page is meant to show how I work in practice: where each skill is useful, what level I can operate at, and which projects best demonstrate it.",
      filterCategoryLabel: "Filter by category",
      filterCategoryAll: "All categories",
      emptyTitle: "No skills in this category",
      emptyDescription: "Try another filter to explore the rest of the capability map."
    },
    projectCard: {
      featured: "Featured",
      viewDetail: "View detail"
    },
    bookCard: {
      recommended: "Recommended",
      coreTakeaways: "Core takeaways",
      ratingLabel: "Reference score",
      notesLabel: "Book page",
      notesComing: "Link pending"
    },
    skillCard: {
      whereItHelps: "Where it helps",
      relatedProjects: "Related projects"
    },
    projectDetail: {
      backToProjects: "Back to projects",
      goalEyebrow: "Project goal",
      unavailableSuffix: "unavailable",
      sidebar: {
        status: "Status",
        role: "Role",
        created: "Created",
        updated: "Updated",
        targetUsers: "Target users",
        techStack: "Tech stack",
        links: "Links",
        liveDemo: "Live demo",
        githubRepo: "GitHub repo"
      },
      sections: {
        productFraming: "Product framing",
        audience: "Who this is for",
        coreFeatures: "Core features",
        challenges: "Challenges",
        learnings: "What I learned"
      }
    },
    notFound: {
      eyebrow: "404",
      title: "This page could not be found",
      description: "The link may be outdated, or the content has not been published yet.",
      backHome: "Back home",
      browseProjects: "Browse projects"
    },
    bookStatuses: {
      wishlist: "Wishlist",
      reading: "Reading",
      completed: "Completed"
    },
    projectStatuses: {
      live: "Live",
      beta: "Beta",
      "case-study": "Case Study",
      archived: "Archived"
    },
    skillLevels: {
      expert: "Expert",
      advanced: "Advanced",
      proficient: "Proficient"
    }
  },
  zh: {
    metadata: {
      home: {
        title: "首页",
        description: "一个围绕 fitness app、读书、AI 产品流程与 AIPM 成长路径搭建的结构化个人博客。"
      },
      about: {
        title: "关于我",
        description: "关于贺俊博、他的 AI 原生产品工作流、当前关注方向、工具体系与正在形成中的产品方法。"
      },
      books: {
        title: "读书",
        description: "整理我已经读过和正在读的书，主题覆盖产品、认知、增长、传播与工作哲学。"
      },
      projects: {
        title: "项目",
        description: "目前重点围绕健身房用户的 fitness app 与长期可复用的 blog 系统展开。"
      },
      skills: {
        title: "技能",
        description: "围绕 AI 原生产品工作流、前端交付、内容系统与结构化产品思考的能力地图。"
      },
      projectNotFound: {
        title: "项目不存在",
        description: "你访问的项目页面不存在。"
      }
    },
    nav: {
      role: "AIPM / AI 原生产品探索者",
      languageLabel: "切换语言",
      links: {
        home: "首页",
        about: "关于",
        books: "读书",
        projects: "项目",
        skills: "技能"
      }
    },
    footer: {
      eyebrow: "继续连接",
      title: "围绕真实产品实践，持续构建 AI 原生产品、可复用内容系统和长期个人品牌。",
      description:
        "这个 blog 既是我的个人品牌主页，也是一个方法论仓库，用来沉淀 fitness app、读书、AI 产品流程和持续迭代中的判断。"
    },
    hero: {
      badge: "AIPM 进行中",
      ctaProjects: "查看项目",
      ctaAbout: "了解我",
      focusEyebrow: "当前聚焦",
      focusTitle: "用 AI 原生工作流，打磨一款更聚焦健身房用户的 Fitness App。"
    },
    currentFocus: {
      eyebrow: "当前关注",
      title: "我现在正在构建、验证与沉淀什么",
      description: "一份简短快照，展示当前 fitness 产品、blog 系统与 AI 产品方法论的核心进展。"
    },
    featuredProjects: {
      eyebrow: "精选作品",
      title: "最能代表我当下方向的两个项目",
      description: "它们分别承载产品验证和内容沉淀：一个面向健身房用户，一个面向长期个人品牌建设。",
      action: "查看全部项目"
    },
    readingShelf: {
      eyebrow: "阅读",
      title: "正在塑造我产品判断和长期思考方式的书",
      description: "书架围绕产品、认知、增长、传播与工作哲学展开，也会持续补进我真正读过和正在读的书。",
      action: "查看全部书单"
    },
    coreSkills: {
      eyebrow: "核心能力",
      title: "支撑我当前构建方式的关键能力",
      description: "不只是会用什么工具，而是我如何把需求、文档、代码和内容系统串成一个闭环。",
      action: "查看全部技能"
    },
    aboutPage: {
      eyebrow: "关于",
      title: "一边学习，一边把 AI、产品和真实项目连接起来",
      socials: "社交链接",
      profileEyebrow: "个人快照",
      profileTitle: "关于我目前最重要的几件事",
      profileDescription: "我希望这个页面既能说明我是谁，也能说明我现在正在往哪里走。",
      workflowEyebrow: "方法系统",
      workflowTitle: "我正在打磨的 AI 原生产品工作流",
      workflowDescription: "我把 AI 当作产品团队的一部分，让它参与需求抓取、产品定义、文档生成和代码转译。",
      workflowPrinciples: "核心原则",
      focusAreasEyebrow: "关注方向",
      focusAreasTitle: "我最想长期深挖的交叉地带",
      focusAreasDescription: "健身房场景、AI 原生产品方法和可复用内容系统，正在一起塑造我的选择。",
      nowEyebrow: "现在",
      nowTitle: "当前状态",
      nowDescription: "一份简洁概览，展示我正在推进的项目、方法论与内容沉淀。",
      toolkitEyebrow: "工具栈",
      toolkitTitle: "我真正依赖的工具和系统",
      toolkitDescription: "我会尽量保持工具栈简洁，让需求、文档和代码之间的距离更短，后续维护也更轻。",
      timelineEyebrow: "成长路径",
      timelineTitle: "一条正在形成中的成长轨迹",
      timelineDescription: "几个关键节点，说明计算机学习、产品意识和 AI 原生实践是怎样逐渐汇合在一起的。"
    },
    booksPage: {
      eyebrow: "读书",
      title: "围绕产品、认知、增长与工作哲学搭起来的书架",
      description: "这里整理了我已经读过和正在读的书，也把每本书转成可继续维护的摘要与收获。",
      filterStatusLabel: "按状态筛选",
      filterStatusAll: "全部状态",
      filterCategoryLabel: "按分类筛选",
      filterCategoryAll: "全部分类",
      emptyTitle: "没有符合当前筛选的书",
      emptyDescription: "可以清除一个筛选条件，看看其余书目。"
    },
    projectsPage: {
      eyebrow: "项目",
      title: "目前最能定义我方向的产品与系统",
      description:
        "现阶段我的重心很明确：一边做一款只服务健身房用户的 fitness app，一边把个人 blog 打造成长期可复用的内容与品牌系统。",
      featuredEyebrow: "重点项目",
      featuredTitle: "最适合先看的项目",
      featuredDescription: "这两个项目分别承载了我的产品验证和内容沉淀，也最能说明我现在如何工作。",
      archiveEyebrow: "项目归档",
      archiveTitle: "更多实验与案例",
      archiveDescription: "更小的产品、原型与概念性尝试，同样体现了我塑造清晰软件体验的方式。"
    },
    skillsPage: {
      eyebrow: "技能",
      title: "不只是工具清单，而是可落地的能力",
      description: "这个页面希望展示我实际如何工作：每项能力适合解决什么问题、我能做到什么深度，以及哪些项目最能说明它。",
      filterCategoryLabel: "按分类筛选",
      filterCategoryAll: "全部分类",
      emptyTitle: "这个分类下暂时没有技能",
      emptyDescription: "试试别的筛选条件，继续看看完整能力地图。"
    },
    projectCard: {
      featured: "精选",
      viewDetail: "查看详情"
    },
    bookCard: {
      recommended: "推荐",
      coreTakeaways: "核心收获",
      ratingLabel: "参考评分",
      notesLabel: "图书页",
      notesComing: "链接待补"
    },
    skillCard: {
      whereItHelps: "适用场景",
      relatedProjects: "相关项目"
    },
    projectDetail: {
      backToProjects: "返回项目列表",
      goalEyebrow: "项目目标",
      unavailableSuffix: "暂未提供",
      sidebar: {
        status: "状态",
        role: "角色",
        created: "创建时间",
        updated: "更新时间",
        targetUsers: "目标用户",
        techStack: "技术栈",
        links: "相关链接",
        liveDemo: "在线演示",
        githubRepo: "GitHub 仓库"
      },
      sections: {
        productFraming: "产品定义",
        audience: "适合谁",
        coreFeatures: "核心功能",
        challenges: "挑战",
        learnings: "项目收获"
      }
    },
    notFound: {
      eyebrow: "404",
      title: "这个页面没有找到",
      description: "链接可能已经失效，或者这部分内容暂时还没有发布。",
      backHome: "返回首页",
      browseProjects: "浏览项目"
    },
    bookStatuses: {
      wishlist: "想读",
      reading: "在读",
      completed: "读完"
    },
    projectStatuses: {
      live: "已上线",
      beta: "测试中",
      "case-study": "案例研究",
      archived: "已归档"
    },
    skillLevels: {
      expert: "专家",
      advanced: "熟练",
      proficient: "良好"
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
