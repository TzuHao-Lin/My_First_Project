export const ageGroups = [
  {
    id: "middle-school",
    label: "國中 / Middle School",
    description: "先探索自己喜歡什麼、擅長什麼，不急著定死方向。",
    scores: { creativity: 6, pressure: -6, longLearning: -4 }
  },
  {
    id: "high-school",
    label: "高中 / High School",
    description: "開始連結科系、社團、活動和真實職業。",
    scores: { logic: 4, longLearning: 6 }
  },
  {
    id: "college",
    label: "大學 / College",
    description: "可以更具體思考實習、技能和職涯路徑。",
    scores: { logic: 6, longLearning: 10, pressure: 4 }
  },
  {
    id: "adult",
    label: "成人 / Career Switch",
    description: "適合想重新確認方向、轉職或重新規劃的人。",
    scores: { stability: 8, pressure: 4, longLearning: 6 }
  }
];

export const interestOptions = [
  {
    id: "health-helping",
    label: "幫助人 / Health & Helping",
    description: "醫療、心理、教育、照顧、陪伴",
    categories: ["Healthcare", "Education", "Public Service"],
    tags: ["people", "helping"],
    scores: { people: 16, creativity: 4 }
  },
  {
    id: "technology-building",
    label: "科技系統 / Technology",
    description: "程式、系統、資料、邏輯、數位工具",
    categories: ["Technology", "Engineering"],
    tags: ["technical", "analytical"],
    scores: { logic: 18, longLearning: 6 }
  },
  {
    id: "design-creative",
    label: "設計創作 / Design & Creative",
    description: "設計、內容、品牌、故事、視覺",
    categories: ["Design", "Media"],
    tags: ["creative", "design", "media"],
    scores: { creativity: 18, people: 4 }
  },
  {
    id: "business-leadership",
    label: "商業企劃 / Business",
    description: "管理、企劃、創業、商業策略",
    categories: ["Business"],
    tags: ["business", "planning", "communication"],
    scores: { people: 10, logic: 10, pressure: 4 }
  },
  {
    id: "science-research",
    label: "研究探索 / Science",
    description: "研究、實驗、資料、找規律",
    categories: ["Science", "Healthcare", "Technology"],
    tags: ["science", "analytical", "long_study"],
    scores: { logic: 16, longLearning: 14 }
  },
  {
    id: "language-humanities",
    label: "語言人文 / Language & Humanities",
    description: "語言、文化、教學、溝通、法律",
    categories: ["Language", "Education", "Law"],
    tags: ["language", "communication", "writing"],
    scores: { people: 10, creativity: 10, longLearning: 4 }
  },
  {
    id: "public-impact",
    label: "社會影響 / Public Impact",
    description: "公共服務、政策、正義、安全",
    categories: ["Public Service", "Law"],
    tags: ["public_service", "high_pressure", "people"],
    scores: { people: 12, pressure: 10, stability: 4 }
  },
  {
    id: "hands-on-action",
    label: "動手實作 / Hands-on",
    description: "現場工作、機械、餐飲、實體操作",
    categories: ["Engineering", "Hospitality", "Aviation"],
    tags: ["hands_on", "technical", "hospitality"],
    scores: { logic: 8, creativity: 6, pressure: 4 }
  }
];

export const scenarioQuestionBank = [
  {
    id: "team-project",
    title: "小組任務情境",
    scenario:
      "你被分到一個 4 人小組，要在一週內完成一個重要成果。大家都很忙，只能快速分工。",
    prompt: "你最自然會先做哪一種事？",
    focusCategories: ["Business", "Design", "Education", "Public Service"],
    focusTags: ["people", "communication", "planning"],
    options: [
      {
        text: "先協調大家、整理方向，確保每個人知道要做什麼",
        value: "coordinate_group",
        scores: { people: 18, logic: 8, stability: 4 }
      },
      {
        text: "先自己把最核心、最難的部分做出來",
        value: "solve_core_problem",
        scores: { people: -12, logic: 16, longLearning: 6 }
      }
    ]
  },
  {
    id: "messy-information",
    title: "資訊很亂的情境",
    scenario:
      "你拿到一堆很亂的資料、訊息和規則，有些甚至互相矛盾，但最後要做出一個清楚判斷。",
    prompt: "你比較像哪一種反應？",
    focusCategories: ["Technology", "Science", "Business", "Law"],
    focusTags: ["analytical", "detail", "writing"],
    options: [
      {
        text: "我會慢慢拆解、分類，找出真正重要的規律",
        value: "analyze_mess",
        scores: { logic: 20, longLearning: 8 }
      },
      {
        text: "我會先抓重點，整理成別人也看得懂的版本",
        value: "translate_mess",
        scores: { people: 10, creativity: 8, logic: 8 }
      }
    ]
  },
  {
    id: "high-pressure-choice",
    title: "高壓突發情境",
    scenario:
      "事情突然出問題，而且很多人正在等你的反應。你不可能等到所有資訊都完整才決定。",
    prompt: "你比較能接受哪一種角色？",
    focusCategories: ["Healthcare", "Aviation", "Public Service", "Hospitality"],
    focusTags: ["high_pressure", "people", "hands_on"],
    options: [
      {
        text: "我可以快速做決定，先把場面穩住",
        value: "fast_decision",
        scores: { pressure: 20, people: 6, stability: -4 }
      },
      {
        text: "我希望有清楚流程和規則，照步驟處理",
        value: "follow_process",
        scores: { stability: 14, pressure: 6, logic: 8 }
      }
    ]
  },
  {
    id: "long-training",
    title: "長期投入情境",
    scenario:
      "有一條路很值得，但要花很多年訓練、考試或累積經驗，短時間看不到成果。",
    prompt: "你的第一個感覺比較像？",
    focusCategories: ["Healthcare", "Law", "Science", "Technology"],
    focusTags: ["long_study", "science", "stable"],
    options: [
      {
        text: "如果真的有意義，我可以慢慢累積",
        value: "accept_long_training",
        scores: { longLearning: 22, logic: 6, stability: 4 }
      },
      {
        text: "我比較想快點做出東西、看到回饋",
        value: "want_fast_feedback",
        scores: { longLearning: -16, creativity: 8, stability: -6 }
      }
    ]
  },
  {
    id: "user-problem",
    title: "理解別人情境",
    scenario:
      "有人一直說自己遇到困難，但他講得不清楚。你需要想辦法理解真正的問題。",
    prompt: "你會更偏向哪種做法？",
    focusCategories: ["Design", "Healthcare", "Education", "Business"],
    focusTags: ["helping", "people", "design"],
    options: [
      {
        text: "先聽、先問，弄清楚他的感受和需求",
        value: "listen_first",
        scores: { people: 18, creativity: 4 }
      },
      {
        text: "先把問題整理成清楚架構，再找解法",
        value: "structure_problem",
        scores: { logic: 16, stability: 6 }
      }
    ]
  },
  {
    id: "build-something",
    title: "做出作品情境",
    scenario:
      "你有一個想法，要把它變成看得見、用得到的東西。過程中一定會一直修正。",
    prompt: "哪一種最讓你有動力？",
    focusCategories: ["Technology", "Engineering", "Design", "Media"],
    focusTags: ["hands_on", "technical", "creative"],
    options: [
      {
        text: "把系統、功能、機制做出來並測試",
        value: "build_system",
        scores: { logic: 14, creativity: 4, longLearning: 4 }
      },
      {
        text: "把體驗、風格、內容打磨到很有感覺",
        value: "craft_experience",
        scores: { creativity: 18, people: 4 }
      }
    ]
  },
  {
    id: "public-speaking",
    title: "公開表達情境",
    scenario:
      "你要把一個複雜概念講給別人聽，讓對方願意接受、理解或被說服。",
    prompt: "你比較哪一種？",
    focusCategories: ["Language", "Business", "Law", "Education", "Media"],
    focusTags: ["communication", "writing", "people"],
    options: [
      {
        text: "我喜歡把複雜內容講清楚，說服別人",
        value: "persuade_people",
        scores: { people: 16, creativity: 8, pressure: 4 }
      },
      {
        text: "我比較喜歡先在背後整理內容，不一定想站前面",
        value: "prepare_behind_scenes",
        scores: { logic: 10, people: -10, stability: 4 }
      }
    ]
  },
  {
    id: "uncertain-path",
    title: "不確定未來情境",
    scenario:
      "一條路很穩定、規則清楚；另一條路更自由、更有變化，但結果不一定。",
    prompt: "你現在更容易被哪一條吸引？",
    focusCategories: ["Business", "Media", "Design", "Hospitality"],
    focusTags: ["risk", "stable", "fast_change"],
    options: [
      {
        text: "我比較想要穩定、清楚、可預測",
        value: "prefer_stable_path",
        scores: { stability: 22, pressure: -4 }
      },
      {
        text: "我可以接受變動，想換來更多挑戰或可能性",
        value: "prefer_dynamic_path",
        scores: { stability: -20, creativity: 8, pressure: 6 }
      }
    ]
  },
  {
    id: "field-vs-desk",
    title: "工作現場情境",
    scenario:
      "想像未來的一天：有些工作是在電腦前長時間專注，有些則是在現場不斷移動、和人互動。",
    prompt: "哪種畫面比較像你？",
    focusCategories: ["Engineering", "Healthcare", "Technology", "Hospitality", "Aviation"],
    focusTags: ["hands_on", "technical", "people"],
    options: [
      {
        text: "我可以長時間坐著、深入分析或做系統",
        value: "prefer_desk",
        scores: { logic: 16, people: -10, stability: 6 }
      },
      {
        text: "我喜歡在現場處理事情、動手或即時應變",
        value: "prefer_field",
        scores: { people: 10, pressure: 8, creativity: 4 }
      }
    ]
  },
  {
    id: "explore-unknown",
    title: "探索未知情境",
    scenario:
      "你碰到一個自己不熟的領域，要決定是先去查理論、看資料，還是先做點什麼試試看。",
    prompt: "你最自然的探索方式是？",
    focusCategories: ["Science", "Technology", "Design", "Education"],
    focusTags: ["science", "technical", "creative", "education"],
    options: [
      {
        text: "先研究背景和原理，建立完整理解",
        value: "research_first",
        scores: { logic: 14, longLearning: 14 }
      },
      {
        text: "先做個小嘗試，邊做邊修正方向",
        value: "prototype_first",
        scores: { creativity: 12, logic: 6, stability: -4 }
      }
    ]
  }
];
