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

export const clusterScenarioQuestions = {
  healthcareHelping: [
    {
      id: "healthcare-shift",
      title: "照顧現場情境",
      scenario: "你在一個很忙的照顧現場，同時有人需要協助、有人情緒不穩，還有人在等你說明下一步。",
      prompt: "你比較能接受哪種工作感？",
      options: [
        { text: "我可以在壓力中先安撫人，再一步一步處理", value: "healthcare_calm_care", scores: { people: 16, pressure: 10, stability: 4 } },
        { text: "我比較希望有明確流程，照標準把事情做好", value: "healthcare_protocol", scores: { logic: 10, stability: 12, pressure: 4 } }
      ]
    },
    {
      id: "healthcare-study",
      title: "專業訓練情境",
      scenario: "這條路需要長時間學習、記憶很多專業知識，而且小錯誤可能影響別人。",
      prompt: "哪一種比較像你？",
      options: [
        { text: "如果這能真正幫助人，我願意慢慢累積", value: "healthcare_long_study", scores: { longLearning: 18, people: 8, logic: 6 } },
        { text: "我比較想先做看得到成果的事情", value: "healthcare_fast_feedback", scores: { longLearning: -14, creativity: 6, stability: -4 } }
      ]
    },
    {
      id: "healthcare-listen",
      title: "理解需求情境",
      scenario: "對方講不清楚自己哪裡不舒服或困擾，但你需要先理解他真正需要什麼。",
      prompt: "你會更自然地怎麼做？",
      options: [
        { text: "先聽、先問，慢慢拼出完整狀況", value: "healthcare_listen", scores: { people: 18, creativity: 4 } },
        { text: "先整理資訊，建立明確判斷架構", value: "healthcare_assess", scores: { logic: 16, stability: 6 } }
      ]
    },
    {
      id: "healthcare-role",
      title: "工作角色情境",
      scenario: "同樣是幫助人，有些工作更偏直接面對人，有些更偏專業判斷、分析和安全把關。",
      prompt: "你更接近哪一種？",
      options: [
        { text: "我喜歡直接和人互動，看到他慢慢變好", value: "healthcare_people", scores: { people: 16, helping: 0, creativity: 4 } },
        { text: "我喜歡專業判斷、細節確認和風險控管", value: "healthcare_precision", scores: { logic: 14, stability: 8, longLearning: 4 } }
      ]
    }
  ],
  technologyData: [
    {
      id: "tech-debug",
      title: "除錯情境",
      scenario: "一個系統一直出錯，大家都想先用臨時方法撐過去，但你知道根本問題還沒解掉。",
      prompt: "你比較像哪一種？",
      options: [
        { text: "我會想追到根本原因，把問題真的解掉", value: "tech_root_cause", scores: { logic: 18, longLearning: 8 } },
        { text: "我會先讓系統恢復可用，再慢慢補強", value: "tech_patch_fast", scores: { pressure: 8, stability: 4, logic: 8 } }
      ]
    },
    {
      id: "tech-workday",
      title: "工作方式情境",
      scenario: "未來一天的工作可能是長時間坐著分析、寫程式、看資料，很多時候要自己專注很久。",
      prompt: "這種畫面你覺得？",
      options: [
        { text: "我可以接受，甚至會覺得很有投入感", value: "tech_focus", scores: { logic: 16, people: -10, stability: 6 } },
        { text: "我會希望工作中有更多現場感或人際互動", value: "tech_less_desk", scores: { people: 10, creativity: 4, stability: -4 } }
      ]
    },
    {
      id: "tech-build",
      title: "產出情境",
      scenario: "你可以選擇做一個能運作的工具，或把一份資料分析成一個清楚洞察。",
      prompt: "哪一種更讓你有動力？",
      options: [
        { text: "做出系統、功能、工具", value: "tech_build_tools", scores: { logic: 14, technical: 0, creativity: 4 } },
        { text: "從資料裡找規律、做出判斷", value: "tech_find_patterns", scores: { logic: 18, longLearning: 4 } }
      ]
    },
    {
      id: "tech-learning",
      title: "學習方式情境",
      scenario: "新技術一直在變，有時候要自己查文件、看教學、實驗很多次才會通。",
      prompt: "你對這件事的感覺比較像？",
      options: [
        { text: "我可以接受一直學新東西，反而覺得有趣", value: "tech_keep_learning", scores: { longLearning: 16, logic: 8 } },
        { text: "我比較希望學一次就能用很久，不想一直追新變化", value: "tech_stable_stack", scores: { stability: 12, pressure: -4 } }
      ]
    }
  ],
  engineeringSystems: [
    {
      id: "engineering-build",
      title: "系統與實體情境",
      scenario: "你要把一個想法變成真的結構、裝置或系統，過程中會有測試、修正和規格限制。",
      prompt: "哪一種比較讓你有成就感？",
      options: [
        { text: "把東西真的做出來、測試、改進", value: "engineering_prototype", scores: { logic: 12, creativity: 6, pressure: 4 } },
        { text: "先把設計原理、結構和規格想清楚", value: "engineering_design", scores: { logic: 16, longLearning: 6 } }
      ]
    },
    {
      id: "engineering-constraints",
      title: "限制條件情境",
      scenario: "一個設計不只要好用，還要安全、符合法規、控制成本，很多條件會互相拉扯。",
      prompt: "你對這種取捨的感覺？",
      options: [
        { text: "我可以接受，這就是解決真實問題的一部分", value: "engineering_tradeoff", scores: { logic: 16, stability: 8 } },
        { text: "我比較想保有更自由的創作空間", value: "engineering_free_form", scores: { creativity: 10, stability: -6 } }
      ]
    },
    {
      id: "engineering-environment",
      title: "工作場域情境",
      scenario: "有些工程工作偏電腦設計與分析，有些偏現場、製作、測試或設備操作。",
      prompt: "你更偏哪一種？",
      options: [
        { text: "分析設計、建模、規劃", value: "engineering_desk", scores: { logic: 16, people: -6, longLearning: 4 } },
        { text: "現場測試、組裝、實作", value: "engineering_field", scores: { pressure: 6, creativity: 4, logic: 8 } }
      ]
    },
    {
      id: "engineering-depth",
      title: "專業深度情境",
      scenario: "很多工程和科學方向需要物理、數學、材料或系統知識，常常不是短時間就能完全上手。",
      prompt: "你的反應比較像？",
      options: [
        { text: "如果是我真的有興趣的方向，我願意慢慢學深", value: "engineering_deep_study", scores: { longLearning: 16, logic: 10 } },
        { text: "我比較想快點上手，先做再說", value: "engineering_learn_fast", scores: { creativity: 8, longLearning: -8, pressure: 4 } }
      ]
    }
  ],
  designCreativeMedia: [
    {
      id: "design-critique",
      title: "作品修改情境",
      scenario: "你做出一個作品後，別人給了很多意見，你可能要重做好幾次才能更好。",
      prompt: "你比較哪一種？",
      options: [
        { text: "我可以接受反覆修改，讓作品更成熟", value: "design_iterate", scores: { creativity: 16, stability: 4 } },
        { text: "我會希望趕快定稿，不想一直改", value: "design_lock_fast", scores: { pressure: -4, stability: 6, creativity: -4 } }
      ]
    },
    {
      id: "design-user",
      title: "使用者感受情境",
      scenario: "一個作品不只是好看，還要讓別人真的看懂、用得懂、感受到你想傳達的東西。",
      prompt: "你更被哪一部分吸引？",
      options: [
        { text: "我喜歡理解觀眾 / 使用者的反應，再去調整", value: "design_empathy", scores: { people: 12, creativity: 10 } },
        { text: "我喜歡把風格、畫面、敘事做到很完整", value: "design_expression", scores: { creativity: 18, people: 2 } }
      ]
    },
    {
      id: "design-output",
      title: "創作方向情境",
      scenario: "同樣都算創作，有些偏互動體驗與產品，有些偏內容、影像、故事和視覺呈現。",
      prompt: "你更偏哪一種？",
      options: [
        { text: "互動、產品、體驗設計", value: "design_product", scores: { creativity: 10, logic: 8, people: 6 } },
        { text: "影像、內容、故事、視覺", value: "design_story", scores: { creativity: 16, people: 4 } }
      ]
    },
    {
      id: "design-rhythm",
      title: "工作節奏情境",
      scenario: "創意工作有時要快速產出，也有時要自己沉下來慢慢打磨細節。",
      prompt: "你比較適合哪種節奏？",
      options: [
        { text: "快節奏、多變化、持續輸出", value: "design_fast_cycle", scores: { creativity: 10, pressure: 6, stability: -6 } },
        { text: "慢慢雕細節、反覆修到滿意", value: "design_polish", scores: { creativity: 12, stability: 6 } }
      ]
    }
  ],
  businessLeadership: [
    {
      id: "business-direction",
      title: "方向判斷情境",
      scenario: "你要決定一個活動、產品或計畫接下來要往哪裡走，但資訊不完整，還要考慮資源和結果。",
      prompt: "你比較像哪一種？",
      options: [
        { text: "我喜歡先收集資訊、比較選項，再做決定", value: "business_strategy", scores: { logic: 14, people: 6, stability: 4 } },
        { text: "我比較想直接試一版，從結果回來修", value: "business_test_fast", scores: { pressure: 8, creativity: 6, stability: -4 } }
      ]
    },
    {
      id: "business-people",
      title: "協調與影響情境",
      scenario: "你需要說服不同的人支持你的想法，有些人重數字，有些人重感受，有些人只在意結果。",
      prompt: "你對這種事情的感覺？",
      options: [
        { text: "我覺得有挑戰，但蠻有成就感", value: "business_persuade", scores: { people: 16, creativity: 6, pressure: 4 } },
        { text: "我比較喜歡自己把分析做好，不想一直協調", value: "business_analysis", scores: { logic: 14, people: -8, stability: 4 } }
      ]
    },
    {
      id: "business-risk",
      title: "風險與變化情境",
      scenario: "有些商業方向比較穩，有些方向更有機會但更不確定，可能要邊做邊改。",
      prompt: "你比較偏哪一種？",
      options: [
        { text: "我想要穩一點、可預測一點", value: "business_stable", scores: { stability: 16, pressure: -4 } },
        { text: "我可以接受變化，換來更大的可能", value: "business_dynamic", scores: { pressure: 6, creativity: 6, stability: -12 } }
      ]
    },
    {
      id: "business-output",
      title: "工作成果情境",
      scenario: "同樣是商業工作，有些更偏數字和判斷，有些更偏企劃、溝通和把事情推動起來。",
      prompt: "你更喜歡哪種成果？",
      options: [
        { text: "清楚的分析、數據、預算和決策依據", value: "business_numbers", scores: { logic: 16, stability: 6 } },
        { text: "一個被推動起來的活動、產品或合作", value: "business_drive", scores: { people: 12, creativity: 6, pressure: 4 } }
      ]
    }
  ],
  lawPublicImpact: [
    {
      id: "public-justice",
      title: "公平與規則情境",
      scenario: "你看到一件事情明顯不公平，但要處理它，不能只靠情緒，還需要證據、規則和程序。",
      prompt: "你比較被哪一部分吸引？",
      options: [
        { text: "我喜歡釐清證據、規則和邏輯", value: "law_logic", scores: { logic: 18, stability: 6, longLearning: 4 } },
        { text: "我更在意人受到的影響，以及怎麼實際改善", value: "law_people_impact", scores: { people: 14, pressure: 6, creativity: 4 } }
      ]
    },
    {
      id: "public-pressure",
      title: "高壓判斷情境",
      scenario: "你可能需要在衝突、危機或立場對立的情境中做決定，而且很多人都會看你的判斷。",
      prompt: "你對這種角色的感覺？",
      options: [
        { text: "我可以承受這種壓力，只要知道自己有依據", value: "law_high_pressure", scores: { pressure: 16, stability: 4, logic: 6 } },
        { text: "我會希望更多時間緩衝，不想常常處在衝突裡", value: "law_low_conflict", scores: { pressure: -10, stability: 8 } }
      ]
    },
    {
      id: "public-speaking",
      title: "公開表達情境",
      scenario: "你需要把一個複雜議題講清楚，讓別人理解你的立場，甚至願意支持你。",
      prompt: "你比較像哪一種？",
      options: [
        { text: "我喜歡把複雜的事講清楚，和人辯論也可以", value: "law_speak", scores: { people: 14, creativity: 6, pressure: 4 } },
        { text: "我比較喜歡先整理資料和論點，幕後準備也可以", value: "law_prepare", scores: { logic: 14, people: -6, stability: 4 } }
      ]
    },
    {
      id: "public-service-role",
      title: "社會角色情境",
      scenario: "這個世界裡有些角色偏政策、法律和制度，有些偏第一線服務、危機處理和直接介入。",
      prompt: "你更靠近哪一種？",
      options: [
        { text: "制度、政策、法律、分析", value: "law_policy", scores: { logic: 16, longLearning: 6 } },
        { text: "第一線服務、即時反應、直接保護或協助人", value: "law_frontline", scores: { people: 12, pressure: 10, stability: 2 } }
      ]
    }
  ],
  hospitalityService: [
    {
      id: "hospitality-rush",
      title: "尖峰時段情境",
      scenario: "客人很多、節奏很快、事情同時發生。你需要在壓力下保持速度，也不能讓體驗崩掉。",
      prompt: "你比較能接受哪種感覺？",
      options: [
        { text: "我可以在忙碌中保持節奏，甚至會覺得有成就感", value: "hospitality_peak", scores: { pressure: 16, people: 8, creativity: 4 } },
        { text: "我更喜歡穩穩來，不太想每天都像打仗", value: "hospitality_steady", scores: { stability: 10, pressure: -8 } }
      ]
    },
    {
      id: "hospitality-craft",
      title: "作品與品質情境",
      scenario: "有些餐飲 / 服務工作重創意和現場感，有些重標準流程和穩定品質。",
      prompt: "你更喜歡哪一種？",
      options: [
        { text: "我喜歡創造新味道、新體驗或新的呈現方式", value: "hospitality_creative", scores: { creativity: 16, pressure: 4, stability: -4 } },
        { text: "我喜歡把品質做到穩、流程做到熟", value: "hospitality_consistency", scores: { stability: 14, logic: 8 } }
      ]
    },
    {
      id: "hospitality-role",
      title: "工作角色情境",
      scenario: "同一個服務世界裡，有些工作偏廚房 / 製作 / 配方，有些偏現場溝通、客人體驗和流程管理。",
      prompt: "你更靠近哪一種？",
      options: [
        { text: "做東西、動手、看作品真的完成", value: "hospitality_make", scores: { logic: 8, creativity: 8, people: -2 } },
        { text: "現場應變、和人互動、把整體體驗顧好", value: "hospitality_host", scores: { people: 14, pressure: 6, creativity: 4 } }
      ]
    },
    {
      id: "hospitality-routine",
      title: "工作節奏情境",
      scenario: "有些人喜歡每天有變化和現場感，有些人喜歡重複打磨同一件事，把手感越做越穩。",
      prompt: "你比較像哪一種？",
      options: [
        { text: "我喜歡變化、節奏和即時反應", value: "hospitality_dynamic", scores: { pressure: 8, creativity: 6, stability: -8 } },
        { text: "我喜歡反覆練習，把穩定度做到很好", value: "hospitality_repeat", scores: { stability: 12, logic: 8, longLearning: 4 } }
      ]
    }
  ],
  languageEducationTravel: [
    {
      id: "language-explain",
      title: "解釋與轉換情境",
      scenario: "你需要把一件原本很複雜、甚至跨語言或跨文化的事情，轉成別人真的聽得懂的版本。",
      prompt: "你對這種任務的感覺？",
      options: [
        { text: "我很喜歡，覺得把事情講清楚很有成就感", value: "language_explain", scores: { people: 14, creativity: 8, logic: 4 } },
        { text: "我比較喜歡在背後整理內容，不一定想一直對人說", value: "language_prepare", scores: { logic: 12, people: -6, stability: 4 } }
      ]
    },
    {
      id: "language-live",
      title: "即時應變情境",
      scenario: "有些語言 / 教育 / 航空服務工作需要即時表達和應變，有些則可以慢慢準備、慢慢打磨。",
      prompt: "你更適合哪種？",
      options: [
        { text: "即時反應沒關係，我可以邊想邊說", value: "language_live", scores: { pressure: 10, people: 10, creativity: 4 } },
        { text: "我比較喜歡先準備好，再精準表達", value: "language_prepared", scores: { logic: 10, stability: 8, pressure: -2 } }
      ]
    },
    {
      id: "language-role",
      title: "工作對象情境",
      scenario: "這個職業群裡，有些工作偏教學和陪伴成長，有些偏翻譯 / 口譯 / 服務不同文化背景的人。",
      prompt: "你更靠近哪一種？",
      options: [
        { text: "我喜歡教、帶人、看見別人慢慢懂", value: "language_teach", scores: { people: 16, stability: 4, creativity: 4 } },
        { text: "我喜歡語言轉換、跨文化溝通和現場應對", value: "language_bridge", scores: { people: 12, pressure: 6, creativity: 6 } }
      ]
    },
    {
      id: "language-environment",
      title: "工作畫面情境",
      scenario: "未來一天可能是在教室、會議、機場、服務現場，或是在文字和內容之間來回切換。",
      prompt: "哪種畫面比較吸引你？",
      options: [
        { text: "和人互動、引導、服務或即時協助", value: "language_people_scene", scores: { people: 14, pressure: 4 } },
        { text: "文字、內容、語意、細節和精準度", value: "language_text_scene", scores: { logic: 10, creativity: 8, stability: 4 } }
      ]
    }
  ]
};
