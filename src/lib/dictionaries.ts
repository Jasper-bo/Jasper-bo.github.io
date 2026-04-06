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
          "A product-grade personal brand website for projects, reading, skills, and thoughtful frontend work."
      },
      about: {
        title: "About",
        description:
          "About Junbo He, current focus areas, tools, timeline, and the thinking behind the products being built."
      },
      books: {
        title: "Books",
        description:
          "Books on product, startup thinking, habits, and technical growth that continue to shape how I build."
      },
      projects: {
        title: "Projects",
        description:
          "A curated project archive covering fitness products, knowledge tools, content systems, and product-minded web experiences."
      },
      skills: {
        title: "Skills",
        description:
          "A capability-focused skills page covering frontend engineering, product thinking, UI structuring, and AI-assisted workflows."
      },
      projectNotFound: {
        title: "Project not found",
        description: "The requested project does not exist."
      }
    },
    nav: {
      role: "Product-minded Frontend Engineer",
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
      eyebrow: "Stay connected",
      title: "Building thoughtful web products with a calm, structured visual language.",
      description:
        "This site is designed as a content-first foundation for projects, reading, skills, and longer-form personal brand storytelling."
    },
    hero: {
      badge: "Personal brand website v1",
      ctaProjects: "View projects",
      ctaAbout: "About me",
      focusEyebrow: "Current focus",
      focusTitle:
        "Building fitness and knowledge products with clearer information architecture."
    },
    currentFocus: {
      eyebrow: "Current Focus",
      title: "What I am building and learning right now",
      description:
        "A compact snapshot of the work streams shaping my recent projects, writing, and experiments."
    },
    featuredProjects: {
      eyebrow: "Selected Work",
      title: "Featured projects with product and engineering depth",
      description:
        "These projects reflect how I think about product framing, interface structure, and the maintainability of what ships.",
      action: "See all projects"
    },
    readingShelf: {
      eyebrow: "Reading",
      title: "Books shaping my product and engineering thinking",
      description:
        "A small reading shelf covering product judgment, systems thinking, habits, and the craft of building with more clarity.",
      action: "Browse all books"
    },
    coreSkills: {
      eyebrow: "Capabilities",
      title: "Core skills I bring to product work",
      description:
        "Beyond a tool list, these are the capabilities I rely on most when turning ideas into shippable, maintainable products.",
      action: "Explore all skills"
    },
    aboutPage: {
      eyebrow: "About",
      title: "Building products with a balance of clarity, structure, and execution",
      socials: "Socials",
      focusAreasEyebrow: "Focus Areas",
      focusAreasTitle: "What I care about most right now",
      focusAreasDescription:
        "The overlap of product framing, frontend craft, and useful systems keeps shaping the work I choose.",
      nowEyebrow: "Now",
      nowTitle: "Current state",
      nowDescription:
        "A concise snapshot of the work, experiments, and writing threads I am actively moving forward.",
      toolkitEyebrow: "Toolkit",
      toolkitTitle: "Tools and systems I rely on",
      toolkitDescription:
        "I prefer a focused toolset that supports shipping, iteration, and maintainability without unnecessary process weight.",
      timelineEyebrow: "Timeline",
      timelineTitle: "A short growth path",
      timelineDescription:
        "A few milestones that explain how design systems, product thinking, and independent building gradually converged."
    },
    booksPage: {
      eyebrow: "Books",
      title: "Reading that informs product judgement and personal growth",
      description:
        "A structured bookshelf with reading status, category filters, key takeaways, and recommendations worth revisiting.",
      filterStatusLabel: "Filter by status",
      filterStatusAll: "All status",
      filterCategoryLabel: "Filter by category",
      filterCategoryAll: "All categories",
      emptyTitle: "No books match these filters",
      emptyDescription: "Try clearing one of the filters to see the rest of the reading list."
    },
    projectsPage: {
      eyebrow: "Projects",
      title: "Products and systems built with both product thinking and frontend depth",
      description:
        "The work here ranges from fitness-focused SaaS ideas to content systems and workflow tools. Each project aims to show what problem it solves, who it serves, and how the implementation supports that story.",
      featuredEyebrow: "Featured",
      featuredTitle: "Projects worth starting with",
      featuredDescription:
        "These are the strongest examples of how I connect problem framing, UI structure, and engineering decisions.",
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
      ratingLabel: "Rating",
      notesLabel: "Notes",
      notesComing: "Notes coming"
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
        description: "一个用于展示项目、阅读、技能与前端思考的产品化个人网站。"
      },
      about: {
        title: "关于我",
        description: "关于何君博、当前关注方向、工具体系、成长轨迹，以及我做产品时的思考方式。"
      },
      books: {
        title: "读书",
        description: "那些持续影响我做产品、理解增长习惯与技术判断的书。"
      },
      projects: {
        title: "项目",
        description: "一个覆盖健身产品、知识工具、内容系统与产品型网站体验的项目档案。"
      },
      skills: {
        title: "技能",
        description: "围绕前端工程、产品思维、界面结构与 AI 工作流的能力页面。"
      },
      projectNotFound: {
        title: "项目不存在",
        description: "你访问的项目页面不存在。"
      }
    },
    nav: {
      role: "产品思维驱动的前端工程师",
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
      eyebrow: "保持联系",
      title: "用冷静、有结构的视觉语言，构建更耐看的 Web 产品。",
      description:
        "这个网站被设计成一套以内容为先的基础设施，用来承载项目、阅读、技能，以及更完整的个人品牌叙事。"
    },
    hero: {
      badge: "个人品牌网站 v1",
      ctaProjects: "查看项目",
      ctaAbout: "了解我",
      focusEyebrow: "当前聚焦",
      focusTitle: "在更清晰的信息架构上，持续打磨健身与知识类产品。"
    },
    currentFocus: {
      eyebrow: "当前关注",
      title: "我现在正在构建和学习什么",
      description: "一份简短快照，展示最近项目、写作与实验背后的核心工作流。"
    },
    featuredProjects: {
      eyebrow: "精选作品",
      title: "兼具产品思维与工程深度的代表项目",
      description: "这些项目体现了我如何思考问题定义、界面结构，以及上线后长期维护的可持续性。",
      action: "查看全部项目"
    },
    readingShelf: {
      eyebrow: "阅读",
      title: "塑造我产品判断与工程思维的书",
      description: "一个小型书架，涵盖产品判断、系统思维、习惯设计，以及更清晰构建产品的方法。",
      action: "查看全部书单"
    },
    coreSkills: {
      eyebrow: "核心能力",
      title: "我带到产品工作里的关键能力",
      description: "不只是工具清单，而是我把想法变成可上线、可维护产品时最常依赖的能力。",
      action: "查看全部技能"
    },
    aboutPage: {
      eyebrow: "关于",
      title: "在清晰、结构与执行力之间寻找平衡，持续构建产品",
      socials: "社交链接",
      focusAreasEyebrow: "关注方向",
      focusAreasTitle: "我当下最在意的几件事",
      focusAreasDescription: "产品 framing、前端表达与有用系统之间的交叉地带，持续影响着我选择的工作。",
      nowEyebrow: "现在",
      nowTitle: "当前状态",
      nowDescription: "一份简洁概览，展示我正在推进的工作、实验与写作线索。",
      toolkitEyebrow: "工具栈",
      toolkitTitle: "我依赖的工具与系统",
      toolkitDescription: "我偏好一套足够聚焦的工具组合，既支持快速交付，也不牺牲后续迭代和维护性。",
      timelineEyebrow: "成长路径",
      timelineTitle: "一条简短的成长轨迹",
      timelineDescription: "几个关键节点，说明设计系统、产品思维与独立构建是如何逐步汇合到一起的。"
    },
    booksPage: {
      eyebrow: "读书",
      title: "影响我产品判断与个人成长的阅读",
      description: "一个带有阅读状态、分类筛选、关键收获与推荐标记的结构化书架。",
      filterStatusLabel: "按状态筛选",
      filterStatusAll: "全部状态",
      filterCategoryLabel: "按分类筛选",
      filterCategoryAll: "全部分类",
      emptyTitle: "没有符合当前筛选的书",
      emptyDescription: "可以清除一个筛选条件，看看其余书目。"
    },
    projectsPage: {
      eyebrow: "项目",
      title: "兼具产品思考与前端深度的产品与系统",
      description:
        "这里既有面向健身场景的 SaaS 想法，也有内容系统与工作流工具。每个项目都在说明它解决什么问题、服务谁，以及实现方式如何支撑这个故事。",
      featuredEyebrow: "重点项目",
      featuredTitle: "最适合先看的项目",
      featuredDescription: "这些项目最能代表我如何把问题定义、界面结构与工程决策连接起来。",
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
      ratingLabel: "评分",
      notesLabel: "笔记",
      notesComing: "笔记整理中"
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

