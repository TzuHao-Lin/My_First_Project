export const quizQuestions = [
  {
    id: "workStyle",
    text: "你比較喜歡哪種工作方式？",
    options: [
      { text: "和人互動、合作", value: "people", scores: { people: 18, stability: 4 } },
      { text: "自己專注完成任務", value: "independent", scores: { people: -18, logic: 8 } }
    ]
  },
  {
    id: "thinkingStyle",
    text: "你比較偏向哪一種思考？",
    options: [
      { text: "創意發想", value: "creative", scores: { creativity: 20, stability: -4 } },
      { text: "邏輯分析", value: "analytical", scores: { logic: 20, longLearning: 4 } }
    ]
  },
  {
    id: "pressure",
    text: "你對高壓環境的接受度？",
    options: [
      { text: "可以接受高壓與突發狀況", value: "high_pressure", scores: { pressure: 22 } },
      { text: "希望壓力不要太大", value: "low_pressure", scores: { pressure: -22, stability: 6 } }
    ]
  },
  {
    id: "taskStyle",
    text: "你比較喜歡哪種任務？",
    options: [
      { text: "動手做、實作", value: "hands_on", scores: { creativity: 6, logic: 8, people: 2 } },
      { text: "規劃、思考、設計", value: "planning", scores: { logic: 10, creativity: 8, longLearning: 4 } }
    ]
  },
  {
    id: "learningDepth",
    text: "你對長期學習專業知識的感覺？",
    options: [
      { text: "可以接受長期深入學習", value: "long_study", scores: { longLearning: 24, logic: 4 } },
      { text: "比較想快點做出作品或看到成果", value: "fast_change", scores: { longLearning: -16, creativity: 8, stability: -6 } }
    ]
  },
  {
    id: "careerFeeling",
    text: "你比較重視哪一種職涯感覺？",
    options: [
      { text: "穩定、有清楚規則", value: "stable", scores: { stability: 22, pressure: -4 } },
      { text: "冒險、有變化和挑戰", value: "risk", scores: { stability: -22, creativity: 6, pressure: 6 } }
    ]
  },
  {
    id: "problemSolving",
    text: "遇到困難問題時，你比較像哪一種？",
    options: [
      { text: "想拆解原因，一步一步解決", value: "debug", scores: { logic: 18, longLearning: 8 } },
      { text: "想先找人討論、理解不同觀點", value: "discuss", scores: { people: 14, creativity: 6 } }
    ]
  },
  {
    id: "outputStyle",
    text: "你比較喜歡產出什麼？",
    options: [
      { text: "系統、分析、工具或清楚結論", value: "structured_output", scores: { logic: 16, stability: 6 } },
      { text: "故事、設計、體驗或有創意的作品", value: "creative_output", scores: { creativity: 18, people: 4 } }
    ]
  }
];
