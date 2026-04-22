import { useState } from "react";

const careers = [
  {
    title: "醫師 / Physician",
    category: "Healthcare",
    description: "診斷疾病、制定治療方案，直接與病人互動。",
    traits: ["耐心", "責任感", "喜歡幫助人"],
    path: "Pre-med -> Medical School -> Residency",
    explore: "Shadowing, volunteering in hospitals, biology clubs",
    fit: "適合願意長期學習、能承擔責任，並且想直接幫助病人的人。",
    avoid: "如果你很排斥高壓環境、長時間訓練或面對生病與死亡，可能會很辛苦。",
    questions: [
      "你能接受為了專業目標投入很多年訓練嗎？",
      "當別人很焦慮或不舒服時，你能保持耐心和冷靜嗎？"
    ]
  },
  {
    title: "護理師 / Nurse",
    category: "Healthcare",
    description: "照顧病人、觀察病況，並和醫療團隊合作。",
    traits: ["細心", "耐心", "抗壓性"],
    path: "Nursing degree -> licensing exam -> hospital / clinic work",
    explore: "Hospital volunteering, first aid training, health camps",
    fit: "適合喜歡照顧人、能注意小細節，並且願意和團隊合作的人。",
    avoid: "如果你不喜歡輪班、身體勞動或處理突發狀況，可能不太適合。",
    questions: [
      "你能接受工作中常常需要快速回應別人的需要嗎？",
      "你在忙碌時還能保持細心和同理心嗎？"
    ]
  },
  {
    title: "心理師 / Psychologist",
    category: "Healthcare",
    description: "協助人理解情緒、行為與心理困擾。",
    traits: ["同理心", "傾聽能力", "耐心"],
    path: "Psychology degree -> graduate training -> supervised practice",
    explore: "Peer support, psychology club, mental health volunteering",
    fit: "適合喜歡理解人的想法、願意傾聽，並能尊重不同人生經驗的人。",
    avoid: "如果你很容易被別人的情緒壓垮，或不喜歡長時間談話與反思，可能會吃力。",
    questions: [
      "朋友遇到困難時，你通常願意慢慢聽他說完嗎？",
      "你能接受答案常常不是立刻出現，而是需要長期陪伴嗎？"
    ]
  },
  {
    title: "藥師 / Pharmacist",
    category: "Healthcare",
    description: "管理藥物、提供用藥建議，幫助病人安全用藥。",
    traits: ["細心", "責任感", "喜歡科學"],
    path: "Pharmacy degree -> licensing exam -> pharmacy / hospital",
    explore: "Volunteer at clinics, drug information research, science clubs",
    fit: "適合喜歡化學與健康知識，並能仔細確認資訊的人。",
    avoid: "如果你不喜歡記憶大量資訊、檢查細節或和病人解釋規則，可能不適合。",
    questions: [
      "你能接受一個小錯誤可能影響別人健康的責任嗎？",
      "你喜歡研究藥物、身體反應和科學證據嗎？"
    ]
  },
  {
    title: "機師 / Pilot",
    category: "Aviation",
    description: "駕駛飛機、管理飛行安全，適合喜歡科技與旅行的人。",
    traits: ["冷靜", "專注", "反應快"],
    path: "Flight school / aviation program -> license -> flight hours",
    explore: "Flight simulator, aviation camp, airport tour",
    fit: "適合喜歡精準操作、能遵守流程，並在壓力下保持冷靜的人。",
    avoid: "如果你不喜歡高度規範、長時間訓練、輪班或飛行風險，可能不適合。",
    questions: [
      "你能不能在壓力很大時照著 checklist 一步一步完成？",
      "你喜歡交通、機械、天氣和空中導航這類知識嗎？"
    ]
  },
  {
    title: "翻譯員 / Translator",
    category: "Language",
    description: "將不同語言轉換成自然、準確的內容。",
    traits: ["語言敏感", "細心", "文化理解"],
    path: "Language training -> portfolio -> freelance / company roles",
    explore: "Translate short articles, join language exchange, subtitles practice",
    fit: "適合喜歡語言細節、文化差異，並願意反覆修改文字的人。",
    avoid: "如果你不喜歡查資料、反覆校對，或覺得文字細節很煩，可能不適合。",
    questions: [
      "你會注意同一句話在不同語言裡語氣是否自然嗎？",
      "你能接受花很多時間查一個詞最精準的意思嗎？"
    ]
  },
  {
    title: "航太工程師 / Aerospace Engineer",
    category: "Engineering",
    description: "設計飛機、火箭或太空系統。",
    traits: ["數理能力", "問題解決", "喜歡設計"],
    path: "Engineering degree -> projects / internships -> aerospace industry",
    explore: "Build model rockets, CAD design, physics club",
    fit: "適合喜歡物理、數學、飛行科技，並能處理複雜系統的人。",
    avoid: "如果你不喜歡大量計算、測試失敗或非常嚴格的安全標準，可能會覺得挫折。",
    questions: [
      "你看到飛機或火箭時，會想知道它為什麼能飛嗎？",
      "你能接受設計需要經過很多次測試和修正嗎？"
    ]
  },
  {
    title: "土木工程師 / Civil Engineer",
    category: "Engineering",
    description: "設計道路、橋樑、建築基礎等公共設施。",
    traits: ["數理能力", "實作導向", "問題解決"],
    path: "Civil engineering degree -> internships -> engineering firms",
    explore: "Bridge-building projects, CAD practice, engineering clubs",
    fit: "適合喜歡實體建設、城市基礎設施，並重視安全和實用性的人。",
    avoid: "如果你不喜歡法規、現場協調或長期大型專案，可能會覺得麻煩。",
    questions: [
      "你會好奇橋樑、道路或建築物是怎麼被設計出來的嗎？",
      "你能接受工程決策需要兼顧成本、安全和時間嗎？"
    ]
  },
  {
    title: "機械工程師 / Mechanical Engineer",
    category: "Engineering",
    description: "設計機械系統、產品結構與製造流程。",
    traits: ["動手做", "邏輯", "喜歡拆解東西"],
    path: "Mechanical engineering degree -> projects -> industry roles",
    explore: "Robotics club, 3D printing, build small machines",
    fit: "適合喜歡拆解、組裝、測試機械或產品的人。",
    avoid: "如果你不喜歡物理、材料、零件細節或反覆測試，可能不適合。",
    questions: [
      "你會想知道機器裡面的零件是怎麼配合運作的嗎？",
      "你喜歡把想法做成可以動的實體作品嗎？"
    ]
  },
  {
    title: "生物醫學工程師 / Biomedical Engineer",
    category: "Engineering",
    description: "把工程和醫療結合，開發醫療器材或新技術。",
    traits: ["跨領域", "喜歡科學", "問題解決"],
    path: "Biomedical engineering degree -> research / internships -> medtech",
    explore: "Medical device projects, lab visits, biology + coding practice",
    fit: "適合同時喜歡工程、生命科學和醫療應用的人。",
    avoid: "如果你不喜歡跨領域學習、研究資料或實驗不確定性，可能會辛苦。",
    questions: [
      "你對人工器官、醫療儀器或健康科技有興趣嗎？",
      "你能接受同時學工程和生物醫學的知識嗎？"
    ]
  },
  {
    title: "建築師 / Architect",
    category: "Engineering",
    description: "設計建築空間，兼顧美感、功能與安全。",
    traits: ["空間感", "創意", "耐心"],
    path: "Architecture degree -> studio training -> licensure",
    explore: "Sketch buildings, model making, visit architecture exhibits",
    fit: "適合喜歡空間、美感、使用者需求，並願意長時間打磨設計的人。",
    avoid: "如果你不喜歡反覆改圖、熬夜做作品集或處理規範限制，可能不適合。",
    questions: [
      "你走進一個空間時，會注意動線、光線和氣氛嗎？",
      "你能接受設計常常要在美感、預算和安全之間取捨嗎？"
    ]
  },
  {
    title: "軟體工程師 / Software Engineer",
    category: "Technology",
    description: "開發網站、App 或系統，解決真實世界的問題。",
    traits: ["邏輯", "耐心", "喜歡解決問題"],
    path: "CS learning -> projects -> internships / software roles",
    explore: "Build small apps, coding clubs, hackathons",
    fit: "適合喜歡拆解問題、可以長時間專注，並願意不斷 debug 的人。",
    avoid: "如果你討厭久坐、抽象邏輯或錯誤訊息，可能會覺得很煩。",
    questions: [
      "你遇到程式錯誤時，會想找原因還是很快放棄？",
      "你喜歡把重複的事情自動化，或做出可以被別人使用的工具嗎？"
    ]
  },
  {
    title: "資料分析師 / Data Analyst",
    category: "Technology",
    description: "從資料中找出趨勢，幫助公司做決策。",
    traits: ["分析能力", "細心", "喜歡找規律"],
    path: "Statistics / data skills -> portfolio -> analyst roles",
    explore: "Analyze public datasets, Excel / Python practice, dashboards",
    fit: "適合喜歡找規律、整理資訊，並用資料說故事的人。",
    avoid: "如果你不喜歡表格、數字、清理資料或解釋結果，可能不適合。",
    questions: [
      "你看到一堆資料時，會想找出背後趨勢嗎？",
      "你能接受資料很亂，需要先清理才能分析嗎？"
    ]
  },
  {
    title: "資安工程師 / Cybersecurity Analyst",
    category: "Technology",
    description: "保護系統和資料，降低駭客攻擊風險。",
    traits: ["警覺性", "邏輯", "喜歡解謎"],
    path: "IT / security learning -> certifications -> security roles",
    explore: "CTF competitions, security labs, network basics",
    fit: "適合喜歡解謎、研究系統漏洞，並重視安全細節的人。",
    avoid: "如果你不喜歡持續學新攻擊方式、看 log 或處理緊急事件，可能不適合。",
    questions: [
      "你會好奇密碼、網路和系統是怎麼被保護的嗎？",
      "你能接受安全工作需要一直追新的風險嗎？"
    ]
  },
  {
    title: "UX 設計師 / UX Designer",
    category: "Design",
    description: "設計網站與 App 的使用體驗，讓產品更好用。",
    traits: ["觀察力", "創意", "同理心"],
    path: "Design learning -> portfolio -> internships / product teams",
    explore: "Redesign an app, Figma practice, user interviews",
    fit: "適合喜歡觀察使用者、改善流程，並把複雜事情變簡單的人。",
    avoid: "如果你不喜歡聽使用者意見、修改設計或處理模糊需求，可能不適合。",
    questions: [
      "你使用 App 時，會注意哪裡不好用並想改進嗎？",
      "你願意訪談別人，理解他們真正遇到的問題嗎？"
    ]
  },
  {
    title: "室內設計師 / Interior Designer",
    category: "Design",
    description: "規劃室內空間的風格、功能與動線。",
    traits: ["美感", "空間感", "創意"],
    path: "Design learning -> portfolio -> studio / freelance work",
    explore: "Redesign a room, mood boards, SketchUp practice",
    fit: "適合喜歡空間搭配、材質色彩，並能理解客戶生活需求的人。",
    avoid: "如果你不喜歡預算限制、客戶溝通或反覆修改方案，可能會不適合。",
    questions: [
      "你會想重新安排房間，讓它更漂亮或更好用嗎？",
      "你能接受設計不是只看美感，也要符合預算和生活習慣嗎？"
    ]
  },
  {
    title: "會計師 / Accountant",
    category: "Business",
    description: "整理財務資料、分析收支，幫助企業管理金錢。",
    traits: ["細心", "有條理", "責任感"],
    path: "Accounting degree -> internships -> CPA / finance roles",
    explore: "Budget tracking, finance clubs, Excel practice",
    fit: "適合喜歡秩序、數字、規則，並能仔細檢查錯誤的人。",
    avoid: "如果你不喜歡重複檢查、財務規範或長時間處理表格，可能不適合。",
    questions: [
      "你喜歡把金錢、紀錄或資料整理得很清楚嗎？",
      "你能接受細節錯誤可能造成很大影響嗎？"
    ]
  },
  {
    title: "行銷企劃 / Marketer",
    category: "Business",
    description: "規劃品牌推廣、社群內容和市場策略。",
    traits: ["創意", "溝通力", "了解人"],
    path: "Marketing learning -> campaigns / portfolio -> business roles",
    explore: "Run a social media page, mock campaigns, school events promotion",
    fit: "適合喜歡理解人、創造內容，並用策略影響受眾的人。",
    avoid: "如果你不喜歡數據成效、快速變化或公開接受回饋，可能不適合。",
    questions: [
      "你會好奇為什麼某個廣告或影片讓人想點進去嗎？",
      "你能接受創意也需要被數據和結果檢驗嗎？"
    ]
  },
  {
    title: "創業者 / Entrepreneur",
    category: "Business",
    description: "把想法變成產品或服務，建立自己的事業。",
    traits: ["主動", "抗壓性", "喜歡冒險"],
    path: "Problem spotting -> prototype -> testing -> business building",
    explore: "Sell a small product, startup clubs, pitch competitions",
    fit: "適合喜歡主動發現問題、嘗試解法，並能承受不確定性的人。",
    avoid: "如果你很需要穩定、明確指令或不喜歡失敗和拒絕，可能會很辛苦。",
    questions: [
      "你看到生活中的問題時，會想做一個解決方案嗎？",
      "你能接受一開始沒有人支持，還是願意測試想法嗎？"
    ]
  },
  {
    title: "律師 / Lawyer",
    category: "Law",
    description: "研究法律、分析案件，替客戶提供法律協助。",
    traits: ["邏輯", "表達能力", "批判思考"],
    path: "Law-related study -> law school -> bar exam",
    explore: "Debate club, mock trial, current events analysis",
    fit: "適合喜歡閱讀、分析論點，並能清楚表達立場的人。",
    avoid: "如果你不喜歡大量文字、壓力、衝突或嚴謹推理，可能不適合。",
    questions: [
      "你喜歡從不同角度分析一件事情誰有道理嗎？",
      "你能接受花很多時間閱讀資料、準備論點和找證據嗎？"
    ]
  },
  {
    title: "記者 / Journalist",
    category: "Media",
    description: "採訪、查證、整理資訊，報導社會事件。",
    traits: ["好奇心", "觀察力", "寫作能力"],
    path: "Journalism / writing practice -> portfolio -> media roles",
    explore: "School newspaper, interviews, article writing",
    fit: "適合好奇、願意提問，並重視真相和清楚表達的人。",
    avoid: "如果你不喜歡被拒絕、趕 deadline、查證或面對敏感議題，可能不適合。",
    questions: [
      "你看到新聞時，會想知道背後真正發生了什麼嗎？",
      "你願意主動訪問陌生人並確認資訊是否正確嗎？"
    ]
  },
  {
    title: "影片創作者 / Content Creator",
    category: "Media",
    description: "製作影片或社群內容，傳遞資訊或娛樂觀眾。",
    traits: ["創意", "表達力", "持續輸出能力"],
    path: "Content creation -> portfolio / channel -> freelance / brand work",
    explore: "Start a YouTube or TikTok series, edit videos, storytelling practice",
    fit: "適合喜歡表達、說故事，並願意持續練習和發布作品的人。",
    avoid: "如果你不喜歡公開被評論、長期輸出或分析觀眾反應，可能會挫折。",
    questions: [
      "你有沒有想過把自己的想法做成影片或貼文分享？",
      "你能接受作品一開始沒什麼人看，還是持續改進嗎？"
    ]
  },
  {
    title: "遊戲設計師 / Game Designer",
    category: "Media",
    description: "設計遊戲玩法、關卡與玩家體驗。",
    traits: ["創意", "觀察力", "喜歡故事與互動"],
    path: "Game design learning -> portfolio -> indie / studio roles",
    explore: "Make simple games, level design practice, game jams",
    fit: "適合喜歡互動體驗、規則設計，並能從玩家角度思考的人。",
    avoid: "如果你只喜歡玩遊戲但不喜歡測試、修改和平衡規則，可能不適合。",
    questions: [
      "你玩遊戲時，會分析為什麼某個關卡好玩或不好玩嗎？",
      "你願意做很多次測試，讓玩家體驗變得更順嗎？"
    ]
  },
  {
    title: "教師 / Teacher",
    category: "Education",
    description: "設計課程、教導學生，幫助他們理解知識。",
    traits: ["耐心", "表達能力", "喜歡幫助人成長"],
    path: "Education degree -> teaching practice -> school roles",
    explore: "Tutoring, teaching younger students, creating study guides",
    fit: "適合喜歡解釋概念、陪伴人成長，並能調整教學方式的人。",
    avoid: "如果你不喜歡重複說明、班級管理或處理不同學生需求，可能不適合。",
    questions: [
      "你教別人時，會想辦法換一種說法讓他懂嗎？",
      "你能接受學生進步速度不同，需要很多耐心嗎？"
    ]
  },
  {
    title: "社工 / Social Worker",
    category: "Public Service",
    description: "協助有需要的人與家庭獲得資源與支持。",
    traits: ["同理心", "責任感", "溝通能力"],
    path: "Social work study -> fieldwork -> community / agency roles",
    explore: "Community service, volunteering, youth support programs",
    fit: "適合關心社會議題、願意傾聽，並能協調資源幫助他人的人。",
    avoid: "如果你很容易被情緒壓力影響，或不喜歡制度和文件工作，可能會辛苦。",
    questions: [
      "你會關心弱勢族群或家庭遇到的困難嗎？",
      "你能在同理別人的同時，也保持專業界線嗎？"
    ]
  },
  {
    title: "警察 / Police Officer",
    category: "Public Service",
    description: "維護公共安全、處理突發事件並保護社區。",
    traits: ["正義感", "冷靜", "責任感"],
    path: "Exam / academy training -> field training -> police service",
    explore: "Community safety programs, ride-alongs, public service clubs",
    fit: "適合重視公共安全、能守規範，並在突發狀況中保持冷靜的人。",
    avoid: "如果你不喜歡危險、輪班、衝突或高度紀律，可能不適合。",
    questions: [
      "你在緊急狀況下能保持冷靜並照程序處理嗎？",
      "你願意為了保護社區承擔壓力和責任嗎？"
    ]
  },
  {
    title: "廚師 / Chef",
    category: "Hospitality",
    description: "設計料理、管理廚房流程，帶給人美食體驗。",
    traits: ["創意", "行動力", "抗壓性"],
    path: "Cooking practice / culinary school -> kitchen experience -> chef roles",
    explore: "Cook new dishes, baking projects, restaurant observation",
    fit: "適合喜歡食物創作、動手實作，並能在快節奏環境工作的人。",
    avoid: "如果你不喜歡高溫、久站、時間壓力或重複練習，可能不適合。",
    questions: [
      "你做料理時，會想改變配方或創造新的味道嗎？",
      "你能接受廚房裡速度快、壓力高、需要團隊配合嗎？"
    ]
  },
  {
    title: "飯店經理 / Hotel Manager",
    category: "Hospitality",
    description: "管理住宿服務、顧客體驗與飯店營運。",
    traits: ["溝通力", "應變能力", "服務精神"],
    path: "Hospitality study -> internships -> hotel operations roles",
    explore: "Customer service work, event hosting, hotel visits",
    fit: "適合喜歡服務人群、協調團隊，並能處理突發客訴的人。",
    avoid: "如果你不喜歡輪班、顧客服務或同時處理很多事情，可能不適合。",
    questions: [
      "你遇到不滿意的客人時，能保持禮貌並解決問題嗎？",
      "你喜歡讓別人的旅行或住宿體驗變得更順利嗎？"
    ]
  },
  {
    title: "資料科學家 / Data Scientist",
    category: "Technology",
    description: "用統計與機器學習分析資料並做預測。",
    traits: ["邏輯", "分析能力", "好奇心"],
    path: "Math/CS -> ML/Stats -> data science roles",
    explore: "Kaggle projects, ML tutorials",
    fit: "適合喜歡用數據理解世界並建立模型的人。",
    avoid: "如果你不喜歡數學或抽象思考，可能不適合。",
    questions: [
      "你會想用資料預測未來嗎？",
      "你喜歡找規律和做分析嗎？"
    ]
  },
  {
    title: "產品經理 / Product Manager",
    category: "Business",
    description: "決定產品方向並協調工程、設計與商業。",
    traits: ["溝通力", "決策力", "同理心"],
    path: "Any degree -> product experience -> PM",
    explore: "Analyze apps, build features, startup projects",
    fit: "適合喜歡整合資訊與做決策的人。",
    avoid: "如果你不喜歡模糊問題或溝通協調，可能不適合。",
    questions: [
      "你會思考產品該做什麼嗎？",
      "你喜歡協調不同角色嗎？"
    ]
  },
  {
    title: "物理治療師 / Physical Therapist",
    category: "Healthcare",
    description: "幫助病人恢復運動與身體功能。",
    traits: ["耐心", "同理心", "動手能力"],
    path: "PT program -> license",
    explore: "Observe rehab sessions, anatomy study",
    fit: "適合喜歡幫助人恢復身體能力的人。",
    avoid: "如果你不喜歡長期陪伴或體力工作，可能不適合。",
    questions: [
      "你喜歡幫助別人慢慢進步嗎？",
      "你能接受需要長期訓練嗎？"
    ]
  },
  {
    title: "職能治療師 / Occupational Therapist",
    category: "Healthcare",
    description: "幫助病人恢復日常生活能力。",
    traits: ["創意", "耐心", "同理心"],
    path: "OT program -> license",
    explore: "Rehab center observation",
    fit: "適合喜歡設計活動幫助他人的人。",
    avoid: "如果你不喜歡重複練習或照顧他人，可能不適合。",
    questions: [
      "你喜歡幫助別人重新生活嗎？",
      "你能接受不同人需要不同方法嗎？"
    ]
  },
  {
    title: "生物學家 / Biologist",
    category: "Science",
    description: "研究生命系統與生物現象。",
    traits: ["好奇心", "觀察力", "耐心"],
    path: "Biology degree -> research",
    explore: "Lab work, microscope observation",
    fit: "適合喜歡研究生命與自然的人。",
    avoid: "如果你不喜歡實驗與不確定性，可能不適合。",
    questions: [
      "你會好奇生命怎麼運作嗎？",
      "你能接受研究沒有立即答案嗎？"
    ]
  },
  {
    title: "化學家 / Chemist",
    category: "Science",
    description: "研究物質組成與反應。",
    traits: ["細心", "分析能力", "實驗能力"],
    path: "Chemistry degree -> lab work",
    explore: "Simple experiments, reactions study",
    fit: "適合喜歡實驗與分析物質的人。",
    avoid: "如果你不喜歡實驗或精準操作，可能不適合。",
    questions: [
      "你喜歡做實驗嗎？",
      "你會想知道物質怎麼變化嗎？"
    ]
  },
  {
    title: "金融分析師 / Financial Analyst",
    category: "Business",
    description: "分析投資與市場趨勢。",
    traits: ["分析能力", "數字敏感", "決策能力"],
    path: "Finance degree -> analyst roles",
    explore: "Stock tracking, finance news",
    fit: "適合喜歡數字與市場分析的人。",
    avoid: "如果你不喜歡風險或壓力，可能不適合。",
    questions: [
      "你會關心股票或市場嗎？",
      "你喜歡分析數字嗎？"
    ]
  },
  {
    title: "平面設計師 / Graphic Designer",
    category: "Design",
    description: "設計品牌視覺與圖像。",
    traits: ["創意", "美感", "細節"],
    path: "Design -> portfolio",
    explore: "Poster design, logo redesign",
    fit: "適合喜歡視覺設計的人。",
    avoid: "如果你不喜歡修改作品，可能不適合。",
    questions: [
      "你會注意設計嗎？",
      "你喜歡創作視覺作品嗎？"
    ]
  },
  {
    title: "動畫師 / Animator",
    category: "Media",
    description: "製作動畫與角色動作。",
    traits: ["創意", "耐心", "觀察力"],
    path: "Animation -> portfolio",
    explore: "Simple animation projects",
    fit: "適合喜歡角色與動作設計的人。",
    avoid: "如果你不喜歡反覆修改，可能不適合。",
    questions: [
      "你喜歡動畫嗎？",
      "你會觀察動作細節嗎？"
    ]
  },
  {
    title: "電工 / Electrician",
    category: "Engineering",
    description: "安裝與維修電力系統。",
    traits: ["動手能力", "細心", "實作"],
    path: "Apprenticeship -> certification",
    explore: "Basic circuits",
    fit: "適合喜歡動手解決問題的人。",
    avoid: "如果你不喜歡現場工作，可能不適合。",
    questions: [
      "你喜歡修東西嗎？",
      "你能接受現場工作嗎？"
    ]
  },
  {
    title: "房地產經紀人 / Real Estate Agent",
    category: "Business",
    description: "協助買賣房產與市場分析。",
    traits: ["溝通力", "業務能力", "應變能力"],
    path: "License -> sales",
    explore: "Market observation",
    fit: "適合喜歡與人互動並談判的人。",
    avoid: "如果你不喜歡業績壓力，可能不適合。",
    questions: [
      "你喜歡銷售嗎？",
      "你能接受收入不穩定嗎？"
    ]
  },
  {
    title: "教育顧問 / Education Consultant",
    category: "Education",
    description: "幫助學生規劃學習與升學方向。",
    traits: ["溝通力", "分析能力", "同理心"],
    path: "Education / counseling -> consulting roles",
    explore: "Help peers plan study paths",
    fit: "適合喜歡幫助別人規劃未來的人。",
    avoid: "如果你不喜歡與人溝通或理解不同需求，可能不適合。",
    questions: [
      "你會幫朋友規劃學習或未來方向嗎？",
      "你喜歡分析不同選擇的優缺點嗎？"
    ]
  },
  {
    title: "教育科技設計師 / EdTech Designer",
    category: "Education",
    description: "設計學習工具或教育平台。",
    traits: ["創意", "科技", "教學理解"],
    path: "Education + tech -> product roles",
    explore: "Design learning apps",
    fit: "適合喜歡教育與科技結合的人。",
    avoid: "如果你不喜歡跨領域，可能不適合。",
    questions: [
      "你會想讓學習變得更有趣嗎？",
      "你喜歡設計工具幫助別人學習嗎？"
    ]
  },
  {
    title: "消防員 / Firefighter",
    category: "Public Service",
    description: "處理火災與緊急救援。",
    traits: ["勇氣", "體力", "冷靜"],
    path: "Exam -> training -> service",
    explore: "Emergency training, volunteer",
    fit: "適合願意幫助他人並面對危險的人。",
    avoid: "如果你不喜歡高風險或壓力，可能不適合。",
    questions: [
      "你能在危險中保持冷靜嗎？",
      "你願意幫助他人即使有風險嗎？"
    ]
  },
  {
    title: "政策分析師 / Policy Analyst",
    category: "Public Service",
    description: "研究政策並提供建議。",
    traits: ["分析能力", "邏輯", "公共意識"],
    path: "Political science -> gov roles",
    explore: "Analyze policies, current events",
    fit: "適合關心社會問題並喜歡分析的人。",
    avoid: "如果你不喜歡閱讀或研究，可能不適合。",
    questions: [
      "你會關心政府政策嗎？",
      "你喜歡分析社會問題嗎？"
    ]
  },
  {
    title: "活動企劃 / Event Planner",
    category: "Hospitality",
    description: "規劃活動與體驗。",
    traits: ["組織能力", "創意", "溝通力"],
    path: "Hospitality -> events",
    explore: "Plan school events",
    fit: "適合喜歡規劃活動與人互動的人。",
    avoid: "如果你不喜歡壓力或突發狀況，可能不適合。",
    questions: [
      "你喜歡安排活動嗎？",
      "你能處理臨時變化嗎？"
    ]
  },
  {
    title: "餐廳經理 / Restaurant Manager",
    category: "Hospitality",
    description: "管理餐廳運營與服務。",
    traits: ["領導力", "溝通力", "應變"],
    path: "Restaurant work -> management",
    explore: "Observe restaurant operations",
    fit: "適合喜歡管理與服務的人。",
    avoid: "如果你不喜歡忙碌環境，可能不適合。",
    questions: [
      "你喜歡管理團隊嗎？",
      "你能在忙碌環境保持冷靜嗎？"
    ]
  },
  {
    title: "法務顧問 / Legal Consultant",
    category: "Law",
    description: "為公司提供法律建議。",
    traits: ["邏輯", "分析", "溝通"],
    path: "Law -> corporate roles",
    explore: "Case studies",
    fit: "適合喜歡分析問題並提供建議的人。",
    avoid: "如果你不喜歡閱讀或推理，可能不適合。",
    questions: [
      "你喜歡分析規則嗎？",
      "你能清楚解釋複雜事情嗎？"
    ]
  },
  {
    title: "檢察官 / Prosecutor",
    category: "Law",
    description: "代表政府進行法律訴訟。",
    traits: ["正義感", "邏輯", "抗壓"],
    path: "Law school -> exam",
    explore: "Court observation",
    fit: "適合重視正義並能承受壓力的人。",
    avoid: "如果你不喜歡衝突或壓力，可能不適合。",
    questions: [
      "你重視公平與正義嗎？",
      "你能面對高壓決策嗎？"
    ]
  },
  {
    title: "空服員 / Flight Attendant",
    category: "Aviation",
    description: "提供乘客服務並確保飛行安全。",
    traits: ["溝通力", "應變能力", "服務精神"],
    path: "Training -> airline",
    explore: "Customer service",
    fit: "適合喜歡旅行與服務的人。",
    avoid: "如果你不喜歡輪班或長途飛行，可能不適合。",
    questions: [
      "你喜歡與不同人互動嗎？",
      "你能接受不固定作息嗎？"
    ]
  },
  {
    title: "航管員 / Air Traffic Controller",
    category: "Aviation",
    description: "管理飛機起降與空中交通。",
    traits: ["專注", "冷靜", "決策力"],
    path: "Training -> certification",
    explore: "Simulation tools",
    fit: "適合能快速做決策並專注的人。",
    avoid: "如果你不喜歡高壓，可能不適合。",
    questions: [
      "你能在壓力下快速決定嗎？",
      "你能長時間保持專注嗎？"
    ]
  },
  {
    title: "口譯員 / Interpreter",
    category: "Language",
    description: "即時翻譯不同語言。",
    traits: ["反應快", "語言能力", "專注"],
    path: "Language training -> certification",
    explore: "Live translation practice",
    fit: "適合反應快且語言能力強的人。",
    avoid: "如果你不喜歡壓力或即時表達，可能不適合。",
    questions: [
      "你能快速轉換語言嗎？",
      "你能在壓力下說話嗎？"
    ]
  },
  {
    title: "語言教師 / Language Teacher",
    category: "Language",
    description: "教導他人語言。",
    traits: ["耐心", "溝通力", "教學能力"],
    path: "Language degree -> teaching",
    explore: "Teach friends",
    fit: "適合喜歡教學與語言的人。",
    avoid: "如果你不喜歡重複教學，可能不適合。",
    questions: [
      "你喜歡教別人嗎？",
      "你能解釋語言規則嗎？"
    ]
  }
];

const categories = [
  "All",
  "Healthcare",
  "Technology",
  "Engineering",
  "Science",
  "Business",
  "Design",
  "Media",
  "Education",
  "Public Service",
  "Hospitality",
  "Law",
  "Aviation",
  "Language"
];

const categoryLabels = {
  All: "全部 / All",
  Healthcare: "醫療健康 / Healthcare",
  Technology: "科技 / Technology",
  Engineering: "工程 / Engineering",
  Science: "科學研究 / Science",
  Business: "商業 / Business",
  Design: "設計 / Design",
  Media: "媒體創作 / Media",
  Education: "教育 / Education",
  "Public Service": "公共服務 / Public Service",
  Hospitality: "服務業 / Hospitality",
  Law: "法律 / Law",
  Aviation: "航空 / Aviation",
  Language: "語言 / Language"
};

const careerTags = {
  "醫師 / Physician": ["people", "analytical", "high_pressure", "long_study", "planning"],
  "護理師 / Nurse": ["people", "high_pressure", "hands_on", "stable", "helping"],
  "心理師 / Psychologist": ["people", "low_pressure", "planning", "helping", "communication"],
  "藥師 / Pharmacist": ["analytical", "long_study", "stable", "detail", "science"],
  "機師 / Pilot": ["analytical", "high_pressure", "hands_on", "travel", "technical"],
  "翻譯員 / Translator": ["independent", "creative", "low_pressure", "detail", "language"],
  "航太工程師 / Aerospace Engineer": ["analytical", "long_study", "planning", "technical", "science"],
  "土木工程師 / Civil Engineer": ["analytical", "hands_on", "planning", "stable", "technical"],
  "機械工程師 / Mechanical Engineer": ["analytical", "hands_on", "technical", "science", "detail"],
  "生物醫學工程師 / Biomedical Engineer": ["analytical", "long_study", "science", "helping", "technical"],
  "建築師 / Architect": ["creative", "planning", "long_study", "detail", "design"],
  "軟體工程師 / Software Engineer": ["independent", "analytical", "planning", "technical", "detail"],
  "資料分析師 / Data Analyst": ["independent", "analytical", "stable", "detail", "technical"],
  "資安工程師 / Cybersecurity Analyst": ["independent", "analytical", "high_pressure", "technical", "detail"],
  "UX 設計師 / UX Designer": ["people", "creative", "planning", "design", "communication"],
  "室內設計師 / Interior Designer": ["people", "creative", "planning", "design", "hands_on"],
  "會計師 / Accountant": ["independent", "analytical", "stable", "detail", "business"],
  "行銷企劃 / Marketer": ["people", "creative", "communication", "business", "fast_change"],
  "創業者 / Entrepreneur": ["people", "creative", "high_pressure", "risk", "business"],
  "律師 / Lawyer": ["people", "analytical", "high_pressure", "long_study", "communication"],
  "記者 / Journalist": ["people", "creative", "high_pressure", "communication", "writing"],
  "影片創作者 / Content Creator": ["creative", "communication", "risk", "fast_change", "media"],
  "遊戲設計師 / Game Designer": ["creative", "analytical", "planning", "technical", "media"],
  "教師 / Teacher": ["people", "communication", "helping", "stable", "planning"],
  "社工 / Social Worker": ["people", "helping", "communication", "high_pressure", "public_service"],
  "警察 / Police Officer": ["people", "high_pressure", "hands_on", "public_service", "stable"],
  "廚師 / Chef": ["creative", "hands_on", "high_pressure", "hospitality", "fast_change"],
  "飯店經理 / Hotel Manager": ["people", "communication", "high_pressure", "hospitality", "business"],
  "資料科學家 / Data Scientist": ["analytical", "independent", "technical", "long_study", "science"],
  "產品經理 / Product Manager": ["people", "communication", "planning", "business", "fast_change"],
  "物理治療師 / Physical Therapist": ["people", "hands_on", "helping", "long_study", "stable"],
  "職能治療師 / Occupational Therapist": ["people", "creative", "helping", "planning", "stable"],
  "生物學家 / Biologist": ["analytical", "science", "independent", "long_study", "detail"],
  "化學家 / Chemist": ["analytical", "science", "hands_on", "detail", "independent"],
  "金融分析師 / Financial Analyst": ["analytical", "business", "risk", "detail", "high_pressure"],
  "平面設計師 / Graphic Designer": ["creative", "design", "detail", "independent", "fast_change"],
  "動畫師 / Animator": ["creative", "media", "detail", "independent", "planning"],
  "電工 / Electrician": ["hands_on", "technical", "stable", "detail", "engineering"],
  "房地產經紀人 / Real Estate Agent": ["people", "communication", "business", "risk", "fast_change"],
  "教育顧問 / Education Consultant": ["people", "communication", "planning", "helping", "analytical"],
  "教育科技設計師 / EdTech Designer": ["creative", "technical", "planning", "education", "design"],
  "消防員 / Firefighter": ["people", "hands_on", "high_pressure", "public_service", "helping"],
  "政策分析師 / Policy Analyst": ["analytical", "public_service", "planning", "writing", "stable"],
  "活動企劃 / Event Planner": ["people", "creative", "communication", "high_pressure", "hospitality"],
  "餐廳經理 / Restaurant Manager": ["people", "communication", "high_pressure", "hospitality", "business"],
  "法務顧問 / Legal Consultant": ["people", "analytical", "communication", "business", "long_study"],
  "檢察官 / Prosecutor": ["people", "analytical", "high_pressure", "public_service", "long_study"],
  "空服員 / Flight Attendant": ["people", "communication", "high_pressure", "travel", "hospitality"],
  "航管員 / Air Traffic Controller": ["analytical", "high_pressure", "technical", "detail", "stable"],
  "口譯員 / Interpreter": ["people", "language", "high_pressure", "communication", "detail"],
  "語言教師 / Language Teacher": ["people", "language", "communication", "helping", "stable"]
};

const filterOptions = {
  salary: ["All", "Low", "Medium", "High", "Very High"],
  educationLevel: ["All", "Short Training", "Bachelor", "Graduate", "License/Certification"],
  workStyle: ["All", "People-focused", "Independent", "Hands-on", "Desk-based", "Creative"],
  pressureLevel: ["All", "Low", "Medium", "High"]
};

const filterLabels = {
  All: "全部 / All",
  Low: "低 / Low",
  Medium: "中 / Medium",
  High: "高 / High",
  "Very High": "很高 / Very High",
  "Short Training": "短期訓練 / Short Training",
  Bachelor: "大學 / Bachelor",
  Graduate: "研究所以上 / Graduate",
  "License/Certification": "證照 / License",
  "People-focused": "人群互動 / People-focused",
  Independent: "獨立工作 / Independent",
  "Hands-on": "動手實作 / Hands-on",
  "Desk-based": "桌面分析 / Desk-based",
  Creative: "創意工作 / Creative",
  Stable: "穩定 / Stable",
  Variable: "變動 / Variable"
};

const careerProfiles = {
  "醫師 / Physician": { salary: "Very High", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "High", stability: "Stable" },
  "護理師 / Nurse": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Stable" },
  "心理師 / Psychologist": { salary: "Medium", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "Medium", stability: "Stable" },
  "藥師 / Pharmacist": { salary: "High", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "Medium", stability: "Stable" },
  "機師 / Pilot": { salary: "Very High", educationLevel: "License/Certification", workStyle: "Hands-on", pressureLevel: "High", stability: "Stable" },
  "翻譯員 / Translator": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Independent", pressureLevel: "Medium", stability: "Variable" },
  "航太工程師 / Aerospace Engineer": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "High", stability: "Stable" },
  "土木工程師 / Civil Engineer": { salary: "High", educationLevel: "Bachelor", workStyle: "Hands-on", pressureLevel: "Medium", stability: "Stable" },
  "機械工程師 / Mechanical Engineer": { salary: "High", educationLevel: "Bachelor", workStyle: "Hands-on", pressureLevel: "Medium", stability: "Stable" },
  "生物醫學工程師 / Biomedical Engineer": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "建築師 / Architect": { salary: "High", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "High", stability: "Variable" },
  "軟體工程師 / Software Engineer": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "資料分析師 / Data Analyst": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "資安工程師 / Cybersecurity Analyst": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "High", stability: "Stable" },
  "UX 設計師 / UX Designer": { salary: "High", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "室內設計師 / Interior Designer": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "會計師 / Accountant": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "行銷企劃 / Marketer": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "創業者 / Entrepreneur": { salary: "Medium", educationLevel: "Short Training", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "律師 / Lawyer": { salary: "Very High", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "High", stability: "Stable" },
  "記者 / Journalist": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "影片創作者 / Content Creator": { salary: "Medium", educationLevel: "Short Training", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "遊戲設計師 / Game Designer": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "教師 / Teacher": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "Medium", stability: "Stable" },
  "社工 / Social Worker": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Stable" },
  "警察 / Police Officer": { salary: "Medium", educationLevel: "License/Certification", workStyle: "Hands-on", pressureLevel: "High", stability: "Stable" },
  "廚師 / Chef": { salary: "Medium", educationLevel: "Short Training", workStyle: "Hands-on", pressureLevel: "High", stability: "Variable" },
  "飯店經理 / Hotel Manager": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "資料科學家 / Data Scientist": { salary: "Very High", educationLevel: "Graduate", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "產品經理 / Product Manager": { salary: "High", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "物理治療師 / Physical Therapist": { salary: "High", educationLevel: "Graduate", workStyle: "Hands-on", pressureLevel: "Medium", stability: "Stable" },
  "職能治療師 / Occupational Therapist": { salary: "Medium", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "Medium", stability: "Stable" },
  "生物學家 / Biologist": { salary: "Medium", educationLevel: "Graduate", workStyle: "Independent", pressureLevel: "Medium", stability: "Variable" },
  "化學家 / Chemist": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Hands-on", pressureLevel: "Medium", stability: "Stable" },
  "金融分析師 / Financial Analyst": { salary: "High", educationLevel: "Bachelor", workStyle: "Desk-based", pressureLevel: "High", stability: "Variable" },
  "平面設計師 / Graphic Designer": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "動畫師 / Animator": { salary: "Medium", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "電工 / Electrician": { salary: "Medium", educationLevel: "License/Certification", workStyle: "Hands-on", pressureLevel: "Medium", stability: "Stable" },
  "房地產經紀人 / Real Estate Agent": { salary: "Medium", educationLevel: "License/Certification", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "教育顧問 / Education Consultant": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "Medium", stability: "Variable" },
  "教育科技設計師 / EdTech Designer": { salary: "High", educationLevel: "Bachelor", workStyle: "Creative", pressureLevel: "Medium", stability: "Variable" },
  "消防員 / Firefighter": { salary: "Medium", educationLevel: "License/Certification", workStyle: "Hands-on", pressureLevel: "High", stability: "Stable" },
  "政策分析師 / Policy Analyst": { salary: "Medium", educationLevel: "Graduate", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "活動企劃 / Event Planner": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "餐廳經理 / Restaurant Manager": { salary: "Medium", educationLevel: "Short Training", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "法務顧問 / Legal Consultant": { salary: "High", educationLevel: "Graduate", workStyle: "Desk-based", pressureLevel: "Medium", stability: "Stable" },
  "檢察官 / Prosecutor": { salary: "High", educationLevel: "Graduate", workStyle: "People-focused", pressureLevel: "High", stability: "Stable" },
  "空服員 / Flight Attendant": { salary: "Medium", educationLevel: "Short Training", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "航管員 / Air Traffic Controller": { salary: "High", educationLevel: "License/Certification", workStyle: "Desk-based", pressureLevel: "High", stability: "Stable" },
  "口譯員 / Interpreter": { salary: "High", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "High", stability: "Variable" },
  "語言教師 / Language Teacher": { salary: "Medium", educationLevel: "Bachelor", workStyle: "People-focused", pressureLevel: "Medium", stability: "Stable" }
};

const quizQuestions = [
  {
    id: "workStyle",
    text: "你比較喜歡哪種工作方式？",
    options: [
      { text: "和人互動、合作", value: "people" },
      { text: "自己專注完成任務", value: "independent" }
    ]
  },
  {
    id: "thinkingStyle",
    text: "你比較偏向哪一種思考？",
    options: [
      { text: "創意發想", value: "creative" },
      { text: "邏輯分析", value: "analytical" }
    ]
  },
  {
    id: "pressure",
    text: "你對高壓環境的接受度？",
    options: [
      { text: "可以接受高壓與突發狀況", value: "high_pressure" },
      { text: "希望壓力不要太大", value: "low_pressure" }
    ]
  },
  {
    id: "doingStyle",
    text: "你比較喜歡哪種任務？",
    options: [
      { text: "動手做、實作", value: "hands_on" },
      { text: "規劃、思考、設計", value: "planning" }
    ]
  },
  {
    id: "growth",
    text: "你對長期學習專業知識的感覺？",
    options: [
      { text: "可以接受長期深入學習", value: "long_study" },
      { text: "比較想快點做出作品或看到成果", value: "fast_change" }
    ]
  },
  {
    id: "stability",
    text: "你比較重視哪一種職涯感覺？",
    options: [
      { text: "穩定、有清楚規則", value: "stable" },
      { text: "冒險、有變化和挑戰", value: "risk" }
    ]
  }
];

const actionPlans = {
  Healthcare: {
    watch: "Watch a day-in-the-life video from a doctor, nurse, pharmacist, or therapist.",
    try: "Take a first aid course, read a simple medical case, or volunteer in a health-related setting.",
    join: "Join a biology club, health science club, hospital volunteer program, or mental health awareness group.",
    learn: "Start with biology basics, human body systems, patient communication, and medical ethics."
  },
  Aviation: {
    watch: "Watch cockpit procedure videos, flight simulator tutorials, or aviation safety explainers.",
    try: "Use a flight simulator and practice following a checklist from takeoff to landing.",
    join: "Join an aviation camp, airport tour, model aircraft club, or school aviation group.",
    learn: "Start with weather, navigation, aircraft controls, communication, and safety procedures."
  },
  Language: {
    watch: "Watch translator interviews, subtitle comparison videos, or bilingual content breakdowns.",
    try: "Translate a short article, song subtitle, or school announcement into another language.",
    join: "Join a language exchange, bilingual club, writing club, or subtitle volunteer project.",
    learn: "Build vocabulary, grammar accuracy, cultural context, editing, and research habits."
  },
  Engineering: {
    watch: "Watch project breakdowns about bridges, rockets, medical devices, machines, or architecture.",
    try: "Build a small model, sketch a design, use CAD, or test a simple engineering prototype.",
    join: "Join robotics, physics club, engineering club, model rocket club, or design-build competitions.",
    learn: "Start with physics, math, CAD, prototyping, problem solving, and technical documentation."
  },
  Science: {
    watch: "Watch lab tour videos, scientist interviews, or explainers about biology and chemistry discoveries.",
    try: "Run a safe home experiment, observe samples with a microscope, or analyze a public science dataset.",
    join: "Join science club, research programs, lab volunteering, science fair, or biology/chemistry competitions.",
    learn: "Start with experimental design, lab safety, statistics, scientific writing, and observation skills."
  },
  Technology: {
    watch: "Watch beginner coding, data dashboard, or cybersecurity lab videos.",
    try: "Build a small website, analyze a dataset, or complete a beginner security challenge.",
    join: "Join a coding club, hackathon, data club, robotics team, or cybersecurity CTF group.",
    learn: "Start with JavaScript or Python, debugging, data basics, logical thinking, and project building."
  },
  Design: {
    watch: "Watch UX case studies, room makeover videos, Figma tutorials, or portfolio reviews.",
    try: "Redesign an app screen, create a room mood board, or interview someone about a product problem.",
    join: "Join art club, design club, yearbook, product design group, or a Figma community challenge.",
    learn: "Start with visual hierarchy, user research, layout, color, prototyping, and feedback loops."
  },
  Business: {
    watch: "Watch marketing campaign breakdowns, finance explainers, or startup pitch videos.",
    try: "Track a small budget, run a mock campaign, or test a simple product idea with friends.",
    join: "Join business club, DECA, student government, finance club, or entrepreneurship competitions.",
    learn: "Start with communication, spreadsheets, customer research, budgeting, strategy, and presentation."
  },
  Law: {
    watch: "Watch mock trial clips, legal case explainers, or debate strategy videos.",
    try: "Analyze a current event from both sides and write a short argument with evidence.",
    join: "Join debate club, mock trial, student government, Model UN, or public speaking groups.",
    learn: "Start with reading comprehension, logic, argument structure, evidence, and public speaking."
  },
  Media: {
    watch: "Watch creator breakdowns, journalism interviews, storytelling videos, or game design postmortems.",
    try: "Make a short video, interview someone, write an article, or design a simple game level.",
    join: "Join school newspaper, film club, media team, game jam, podcast club, or creative writing group.",
    learn: "Start with storytelling, editing, audience understanding, interviewing, and consistent publishing."
  },
  Education: {
    watch: "Watch teaching demos, tutoring strategies, or explainers about how people learn.",
    try: "Tutor a younger student or make a study guide for a topic you understand well.",
    join: "Join tutoring programs, youth mentoring, teaching assistant opportunities, or education clubs.",
    learn: "Start with communication, lesson planning, patience, classroom skills, and learning psychology."
  },
  "Public Service": {
    watch: "Watch social work, policing, emergency response, or community service day-in-the-life videos.",
    try: "Volunteer at a community event, help organize a safety project, or support a local nonprofit.",
    join: "Join service clubs, community volunteering, youth leadership, emergency response, or civic groups.",
    learn: "Start with communication, ethics, conflict resolution, community needs, and emotional resilience."
  },
  Hospitality: {
    watch: "Watch restaurant service, chef training, hotel operations, or customer experience videos.",
    try: "Cook a menu for friends, help host an event, or observe how a hotel or restaurant handles guests.",
    join: "Join culinary club, event planning, hospitality programs, customer service work, or food competitions.",
    learn: "Start with service mindset, time management, teamwork, food safety, and guest communication."
  }
};

const tagLabels = {
  people: "喜歡與人互動",
  independent: "能獨立專注",
  creative: "偏創意發想",
  analytical: "偏邏輯分析",
  high_pressure: "可接受高壓",
  low_pressure: "偏好低壓環境",
  hands_on: "喜歡動手做",
  planning: "喜歡規劃設計",
  long_study: "能長期學習",
  fast_change: "喜歡快速變化",
  stable: "重視穩定",
  risk: "願意冒險挑戰"
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [selectedEducation, setSelectedEducation] = useState("All");
  const [selectedWorkStyle, setSelectedWorkStyle] = useState("All");
  const [selectedPressure, setSelectedPressure] = useState("All");
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState({});

  const normalizedSearch = search.trim().toLowerCase();
  const careersWithTags = careers.map((career) => ({
    ...career,
    ...(careerProfiles[career.title] ?? {}),
    tags: careerTags[career.title] ?? []
  }));
  const userTags = Object.values(answers);
  const answeredCount = userTags.length;
  const quizComplete = answeredCount === quizQuestions.length;

  const recommendedCareers = careersWithTags
    .map((career) => {
      const matchedTags = career.tags.filter((tag) => userTags.includes(tag));
      return { ...career, matchedTags, score: matchedTags.length };
    })
    .filter((career) => career.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 3);

  const filteredCareers = careersWithTags.filter((career) => {
    const matchesCategory =
      selectedCategory === "All" || career.category === selectedCategory;
    const matchesSalary =
      selectedSalary === "All" || career.salary === selectedSalary;
    const matchesEducation =
      selectedEducation === "All" || career.educationLevel === selectedEducation;
    const matchesWorkStyle =
      selectedWorkStyle === "All" || career.workStyle === selectedWorkStyle;
    const matchesPressure =
      selectedPressure === "All" || career.pressureLevel === selectedPressure;

    const searchableText = [
      career.title,
      career.category,
      categoryLabels[career.category],
      career.salary,
      career.educationLevel,
      career.workStyle,
      career.pressureLevel,
      career.stability,
      career.description,
      career.path,
      career.explore,
      career.fit,
      career.avoid,
      ...career.traits,
      ...career.questions,
      ...career.tags
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" || searchableText.includes(normalizedSearch);

    return (
      matchesCategory &&
      matchesSalary &&
      matchesEducation &&
      matchesWorkStyle &&
      matchesPressure &&
      matchesSearch
    );
  });

  return (
    <main className="page-shell">
      <div className="content">
        <header className="hero">
          <p className="eyebrow">Career Explorer</p>
          <h1>Find careers that may actually fit you</h1>
          <p className="intro">
            給還不知道自己未來要做什麼的學生：先從興趣、個性、探索方式開始，不要只靠「想像」選科系。
          </p>

          <div className="steps">
            <article>
              <h2>Step 1</h2>
              <p>認識不同職業，不只看熱門科系。</p>
            </article>
            <article>
              <h2>Step 2</h2>
              <p>找出這份工作需要的特質與能力。</p>
            </article>
            <article>
              <h2>Step 3</h2>
              <p>用小型體驗去驗證自己是不是真的喜歡。</p>
            </article>
          </div>
        </header>

        <section className="quiz-panel">
          <div className="quiz-intro">
            <p className="eyebrow">Quick Match Quiz</p>
            <h2>先回答幾題，看看哪些職業可能適合你</h2>
            <p>
              這不是正式心理測驗，而是把你的偏好轉成 tags，再用簡單分數推薦幾個方向。
            </p>
          </div>

          <div className="quiz-grid">
            {quizQuestions.map((question) => (
              <article className="quiz-question" key={question.id}>
                <h3>{question.text}</h3>
                <div className="quiz-options">
                  {question.options.map((option) => (
                    <button
                      className={answers[question.id] === option.value ? "selected" : ""}
                      key={option.value}
                      onClick={() =>
                        setAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [question.id]: option.value
                        }))
                      }
                      type="button"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="quiz-footer">
            <p>
              已回答 {answeredCount} / {quizQuestions.length} 題
            </p>
            {answeredCount > 0 && (
              <button onClick={() => setAnswers({})} type="button">
                Reset answers
              </button>
            )}
          </div>

          {quizComplete ? (
            <div className="recommendations">
              <div>
                <p className="eyebrow">Top Matches</p>
                <h3>Top 3 careers that may fit you</h3>
              </div>
              <div className="recommendation-grid">
                {recommendedCareers.map((career, index) => (
                  <article className="recommendation-card" key={career.title}>
                    <div className="recommendation-topline">
                      <p className="rank">#{index + 1}</p>
                      <p className="score">{career.score} tag matches</p>
                    </div>

                    <div>
                      <h4>{career.title}</h4>
                      <p>{categoryLabels[career.category]}</p>
                    </div>

                    <div className="profile-facts compact">
                      <span>{filterLabels[career.salary]}</span>
                      <span>{filterLabels[career.educationLevel]}</span>
                      <span>{filterLabels[career.workStyle]}</span>
                    </div>

                    <div>
                      <p className="recommendation-label">Why this matches you</p>
                      <p>
                        你的答案和這個職業的{" "}
                        {career.matchedTags.map((tag) => tagLabels[tag] ?? tag).join("、")}{" "}
                        特質有重疊。
                      </p>
                    </div>

                    <div>
                      <p className="recommendation-label">適合你的特質</p>
                      <div className="traits compact">
                        {career.traits.map((trait) => (
                          <span key={trait}>{trait}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="recommendation-label">What may be hard for you</p>
                      <p>{career.avoid}</p>
                    </div>

                    <div>
                      <p className="recommendation-label">What to try this month</p>
                      <p>{career.explore}</p>
                    </div>

                    <div className="action-list">
                      {Object.entries(actionPlans[career.category] ?? {}).map(([label, text]) => (
                        <div className="action-item" key={label}>
                          <span>{label}</span>
                          <p>{text}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="recommendation-placeholder">
              回答完全部問題後，這裡會顯示你的 Top 5 推薦職業。
            </div>
          )}
        </section>

        <section>
          <div className="section-heading">
            <div>
              <h2 className="section-title">Career Cards</h2>
              <p className="section-subtitle">
                目前顯示 {filteredCareers.length} / {careersWithTags.length} 個職業
              </p>
            </div>
          </div>

          <div className="controls">
            <label className="search-box">
              <span>搜尋 / Search</span>
              <input
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try: 醫師, engineer, 耐心, 設計"
                type="search"
                value={search}
              />
            </label>

            <div className="filter-grid">
              <label>
                <span>Salary Range</span>
                <select
                  onChange={(event) => setSelectedSalary(event.target.value)}
                  value={selectedSalary}
                >
                  {filterOptions.salary.map((option) => (
                    <option key={option} value={option}>
                      {filterLabels[option]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Education Level</span>
                <select
                  onChange={(event) => setSelectedEducation(event.target.value)}
                  value={selectedEducation}
                >
                  {filterOptions.educationLevel.map((option) => (
                    <option key={option} value={option}>
                      {filterLabels[option]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Work Style</span>
                <select
                  onChange={(event) => setSelectedWorkStyle(event.target.value)}
                  value={selectedWorkStyle}
                >
                  {filterOptions.workStyle.map((option) => (
                    <option key={option} value={option}>
                      {filterLabels[option]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Pressure Level</span>
                <select
                  onChange={(event) => setSelectedPressure(event.target.value)}
                  value={selectedPressure}
                >
                  {filterOptions.pressureLevel.map((option) => (
                    <option key={option} value={option}>
                      {filterLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="category-filter" aria-label="Filter careers by category">
              {categories.map((category) => (
                <button
                  className={category === selectedCategory ? "active" : ""}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          {filteredCareers.length === 0 ? (
            <div className="empty-state">
              <h3>找不到符合條件的職業</h3>
              <p>試著清除搜尋文字，或切換到「全部 / All」。</p>
            </div>
          ) : (
            <div className="career-grid">
              {filteredCareers.map((career) => (
                <article className="career-card" key={career.title}>
                  <div>
                    <p className="category">{categoryLabels[career.category]}</p>
                    <h3>{career.title}</h3>
                  </div>

                  <div className="profile-facts">
                    <span>Salary: {filterLabels[career.salary]}</span>
                    <span>Education: {filterLabels[career.educationLevel]}</span>
                    <span>Style: {filterLabels[career.workStyle]}</span>
                    <span>Pressure: {filterLabels[career.pressureLevel]}</span>
                    <span>Stability: {filterLabels[career.stability]}</span>
                  </div>

                  <p className="description">{career.description}</p>

                  <div>
                    <p className="label">適合特質</p>
                    <div className="traits">
                      {career.traits.map((trait) => (
                        <span key={trait}>{trait}</span>
                      ))}
                    </div>
                  </div>

                  <div className="insight-grid">
                    <div className="insight fit">
                      <p className="label">適合你如果...</p>
                      <p>{career.fit}</p>
                    </div>
                    <div className="insight avoid">
                      <p className="label">可能不適合如果...</p>
                      <p>{career.avoid}</p>
                    </div>
                  </div>

                  <div>
                    <p className="label">Typical Path</p>
                    <p className="detail">{career.path}</p>
                  </div>

                  <div>
                    <p className="label">How to test your interest</p>
                    <p className="detail">{career.explore}</p>
                  </div>

                  <div>
                    <p className="label">Self-exploration questions</p>
                    <ul className="questions">
                      {career.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
