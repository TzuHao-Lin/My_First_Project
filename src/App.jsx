import { useState } from "react";

const careers = [
  {
    title: "醫師 / Physician",
    category: "Healthcare",
    description: "診斷疾病、制定治療方案，直接與病人互動。",
    traits: ["耐心", "責任感", "喜歡幫助人"],
    path: "Pre-med -> Medical School -> Residency",
    explore: "Shadowing, volunteering in hospitals, biology clubs"
  },
  {
    title: "護理師 / Nurse",
    category: "Healthcare",
    description: "照顧病人、觀察病況，並和醫療團隊合作。",
    traits: ["細心", "耐心", "抗壓性"],
    path: "Nursing degree -> licensing exam -> hospital / clinic work",
    explore: "Hospital volunteering, first aid training, health camps"
  },
  {
    title: "心理師 / Psychologist",
    category: "Healthcare",
    description: "協助人理解情緒、行為與心理困擾。",
    traits: ["同理心", "傾聽能力", "耐心"],
    path: "Psychology degree -> graduate training -> supervised practice",
    explore: "Peer support, psychology club, mental health volunteering"
  },
  {
    title: "藥師 / Pharmacist",
    category: "Healthcare",
    description: "管理藥物、提供用藥建議，幫助病人安全用藥。",
    traits: ["細心", "責任感", "喜歡科學"],
    path: "Pharmacy degree -> licensing exam -> pharmacy / hospital",
    explore: "Volunteer at clinics, drug information research, science clubs"
  },
  {
    title: "機師 / Pilot",
    category: "Aviation",
    description: "駕駛飛機、管理飛行安全，適合喜歡科技與旅行的人。",
    traits: ["冷靜", "專注", "反應快"],
    path: "Flight school / aviation program -> license -> flight hours",
    explore: "Flight simulator, aviation camp, airport tour"
  },
  {
    title: "翻譯員 / Translator",
    category: "Language",
    description: "將不同語言轉換成自然、準確的內容。",
    traits: ["語言敏感", "細心", "文化理解"],
    path: "Language training -> portfolio -> freelance / company roles",
    explore: "Translate short articles, join language exchange, subtitles practice"
  },
  {
    title: "航太工程師 / Aerospace Engineer",
    category: "Engineering",
    description: "設計飛機、火箭或太空系統。",
    traits: ["數理能力", "問題解決", "喜歡設計"],
    path: "Engineering degree -> projects / internships -> aerospace industry",
    explore: "Build model rockets, CAD design, physics club"
  },
  {
    title: "土木工程師 / Civil Engineer",
    category: "Engineering",
    description: "設計道路、橋樑、建築基礎等公共設施。",
    traits: ["數理能力", "實作導向", "問題解決"],
    path: "Civil engineering degree -> internships -> engineering firms",
    explore: "Bridge-building projects, CAD practice, engineering clubs"
  },
  {
    title: "機械工程師 / Mechanical Engineer",
    category: "Engineering",
    description: "設計機械系統、產品結構與製造流程。",
    traits: ["動手做", "邏輯", "喜歡拆解東西"],
    path: "Mechanical engineering degree -> projects -> industry roles",
    explore: "Robotics club, 3D printing, build small machines"
  },
  {
    title: "生物醫學工程師 / Biomedical Engineer",
    category: "Engineering",
    description: "把工程和醫療結合，開發醫療器材或新技術。",
    traits: ["跨領域", "喜歡科學", "問題解決"],
    path: "Biomedical engineering degree -> research / internships -> medtech",
    explore: "Medical device projects, lab visits, biology + coding practice"
  },
  {
    title: "建築師 / Architect",
    category: "Engineering",
    description: "設計建築空間，兼顧美感、功能與安全。",
    traits: ["空間感", "創意", "耐心"],
    path: "Architecture degree -> studio training -> licensure",
    explore: "Sketch buildings, model making, visit architecture exhibits"
  },
  {
    title: "軟體工程師 / Software Engineer",
    category: "Technology",
    description: "開發網站、App 或系統，解決真實世界的問題。",
    traits: ["邏輯", "耐心", "喜歡解決問題"],
    path: "CS learning -> projects -> internships / software roles",
    explore: "Build small apps, coding clubs, hackathons"
  },
  {
    title: "資料分析師 / Data Analyst",
    category: "Technology",
    description: "從資料中找出趨勢，幫助公司做決策。",
    traits: ["分析能力", "細心", "喜歡找規律"],
    path: "Statistics / data skills -> portfolio -> analyst roles",
    explore: "Analyze public datasets, Excel / Python practice, dashboards"
  },
  {
    title: "資安工程師 / Cybersecurity Analyst",
    category: "Technology",
    description: "保護系統和資料，降低駭客攻擊風險。",
    traits: ["警覺性", "邏輯", "喜歡解謎"],
    path: "IT / security learning -> certifications -> security roles",
    explore: "CTF competitions, security labs, network basics"
  },
  {
    title: "UX 設計師 / UX Designer",
    category: "Design",
    description: "設計網站與 App 的使用體驗，讓產品更好用。",
    traits: ["觀察力", "創意", "同理心"],
    path: "Design learning -> portfolio -> internships / product teams",
    explore: "Redesign an app, Figma practice, user interviews"
  },
  {
    title: "室內設計師 / Interior Designer",
    category: "Design",
    description: "規劃室內空間的風格、功能與動線。",
    traits: ["美感", "空間感", "創意"],
    path: "Design learning -> portfolio -> studio / freelance work",
    explore: "Redesign a room, mood boards, SketchUp practice"
  },
  {
    title: "會計師 / Accountant",
    category: "Business",
    description: "整理財務資料、分析收支，幫助企業管理金錢。",
    traits: ["細心", "有條理", "責任感"],
    path: "Accounting degree -> internships -> CPA / finance roles",
    explore: "Budget tracking, finance clubs, Excel practice"
  },
  {
    title: "行銷企劃 / Marketer",
    category: "Business",
    description: "規劃品牌推廣、社群內容和市場策略。",
    traits: ["創意", "溝通力", "了解人"],
    path: "Marketing learning -> campaigns / portfolio -> business roles",
    explore: "Run a social media page, mock campaigns, school events promotion"
  },
  {
    title: "創業者 / Entrepreneur",
    category: "Business",
    description: "把想法變成產品或服務，建立自己的事業。",
    traits: ["主動", "抗壓性", "喜歡冒險"],
    path: "Problem spotting -> prototype -> testing -> business building",
    explore: "Sell a small product, startup clubs, pitch competitions"
  },
  {
    title: "律師 / Lawyer",
    category: "Law",
    description: "研究法律、分析案件，替客戶提供法律協助。",
    traits: ["邏輯", "表達能力", "批判思考"],
    path: "Law-related study -> law school -> bar exam",
    explore: "Debate club, mock trial, current events analysis"
  },
  {
    title: "記者 / Journalist",
    category: "Media",
    description: "採訪、查證、整理資訊，報導社會事件。",
    traits: ["好奇心", "觀察力", "寫作能力"],
    path: "Journalism / writing practice -> portfolio -> media roles",
    explore: "School newspaper, interviews, article writing"
  },
  {
    title: "影片創作者 / Content Creator",
    category: "Media",
    description: "製作影片或社群內容，傳遞資訊或娛樂觀眾。",
    traits: ["創意", "表達力", "持續輸出能力"],
    path: "Content creation -> portfolio / channel -> freelance / brand work",
    explore: "Start a YouTube or TikTok series, edit videos, storytelling practice"
  },
  {
    title: "遊戲設計師 / Game Designer",
    category: "Media",
    description: "設計遊戲玩法、關卡與玩家體驗。",
    traits: ["創意", "觀察力", "喜歡故事與互動"],
    path: "Game design learning -> portfolio -> indie / studio roles",
    explore: "Make simple games, level design practice, game jams"
  },
  {
    title: "教師 / Teacher",
    category: "Education",
    description: "設計課程、教導學生，幫助他們理解知識。",
    traits: ["耐心", "表達能力", "喜歡幫助人成長"],
    path: "Education degree -> teaching practice -> school roles",
    explore: "Tutoring, teaching younger students, creating study guides"
  },
  {
    title: "社工 / Social Worker",
    category: "Public Service",
    description: "協助有需要的人與家庭獲得資源與支持。",
    traits: ["同理心", "責任感", "溝通能力"],
    path: "Social work study -> fieldwork -> community / agency roles",
    explore: "Community service, volunteering, youth support programs"
  },
  {
    title: "警察 / Police Officer",
    category: "Public Service",
    description: "維護公共安全、處理突發事件並保護社區。",
    traits: ["正義感", "冷靜", "責任感"],
    path: "Exam / academy training -> field training -> police service",
    explore: "Community safety programs, ride-alongs, public service clubs"
  },
  {
    title: "廚師 / Chef",
    category: "Hospitality",
    description: "設計料理、管理廚房流程，帶給人美食體驗。",
    traits: ["創意", "行動力", "抗壓性"],
    path: "Cooking practice / culinary school -> kitchen experience -> chef roles",
    explore: "Cook new dishes, baking projects, restaurant observation"
  },
  {
    title: "飯店經理 / Hotel Manager",
    category: "Hospitality",
    description: "管理住宿服務、顧客體驗與飯店營運。",
    traits: ["溝通力", "應變能力", "服務精神"],
    path: "Hospitality study -> internships -> hotel operations roles",
    explore: "Customer service work, event hosting, hotel visits"
  }
];

const categories = [
  "All",
  "Healthcare",
  "Technology",
  "Engineering",
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

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCareers =
    selectedCategory === "All"
      ? careers
      : careers.filter((career) => career.category === selectedCategory);

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

        <section>
          <div className="section-heading">
            <div>
              <h2 className="section-title">Career Cards</h2>
              <p className="section-subtitle">
                目前顯示 {filteredCareers.length} / {careers.length} 個職業
              </p>
            </div>
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

          <div className="career-grid">
            {filteredCareers.map((career) => (
              <article className="career-card" key={career.title}>
                <div>
                  <p className="category">{categoryLabels[career.category]}</p>
                  <h3>{career.title}</h3>
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

                <div>
                  <p className="label">Typical Path</p>
                  <p className="detail">{career.path}</p>
                </div>

                <div>
                  <p className="label">How to test your interest</p>
                  <p className="detail">{career.explore}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
