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
    title: "UX 設計師 / UX Designer",
    category: "Design",
    description: "設計網站與 App 的使用體驗，讓產品更好用。",
    traits: ["觀察力", "創意", "同理心"],
    path: "Design learning -> portfolio -> internships / product teams",
    explore: "Redesign an app, Figma practice, user interviews"
  }
];

export default function App() {
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
          <h2 className="section-title">Career Cards</h2>
          <div className="career-grid">
            {careers.map((career) => (
              <article className="career-card" key={career.title}>
                <div>
                  <p className="category">{career.category}</p>
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
