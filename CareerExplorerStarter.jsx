export default function CareerExplorerStarter() {
  const careers = [
    {
      title: "醫師 / Physician",
      category: "Healthcare",
      description: "診斷疾病、制定治療方案，直接與病人互動。",
      traits: ["耐心", "責任感", "喜歡幫助人"],
      path: "Pre-med → Medical School → Residency",
      explore: "Shadowing, volunteering in hospitals, biology clubs"
    },
    {
      title: "機師 / Pilot",
      category: "Aviation",
      description: "駕駛飛機、管理飛行安全，適合喜歡科技與旅行的人。",
      traits: ["冷靜", "專注", "反應快"],
      path: "Flight school / aviation program → license → flight hours",
      explore: "Flight simulator, aviation camp, airport tour"
    },
    {
      title: "翻譯員 / Translator",
      category: "Language",
      description: "將不同語言轉換成自然、準確的內容。",
      traits: ["語言敏感", "細心", "文化理解"],
      path: "Language training → portfolio → freelance / company roles",
      explore: "Translate short articles, join language exchange, subtitles practice"
    },
    {
      title: "航太工程師 / Aerospace Engineer",
      category: "Engineering",
      description: "設計飛機、火箭或太空系統。",
      traits: ["數理能力", "問題解決", "喜歡設計"],
      path: "Engineering degree → projects / internships → aerospace industry",
      explore: "Build model rockets, CAD design, physics club"
    },
    {
      title: "UX 設計師 / UX Designer",
      category: "Design",
      description: "設計網站與 App 的使用體驗，讓產品更好用。",
      traits: ["觀察力", "創意", "同理心"],
      path: "Design learning → portfolio → internships / product teams",
      explore: "Redesign an app, Figma practice, user interviews"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Career Explorer</p>
          <h1 className="text-4xl font-bold mt-2">Find careers that may actually fit you</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-8">
            給還不知道自己未來要做什麼的學生：先從興趣、個性、探索方式開始，不要只靠「想像」選科系。
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-slate-100 rounded-2xl p-4">
              <h2 className="font-semibold">Step 1</h2>
              <p className="text-slate-600 mt-1">認識不同職業，不只看熱門科系。</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-4">
              <h2 className="font-semibold">Step 2</h2>
              <p className="text-slate-600 mt-1">找出這份工作需要的特質與能力。</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-4">
              <h2 className="font-semibold">Step 3</h2>
              <p className="text-slate-600 mt-1">用小型體驗去驗證自己是不是真的喜歡。</p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold mb-4">Career Cards</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {careers.map((career) => (
              <div key={career.title} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">{career.category}</p>
                  <h3 className="text-xl font-semibold mt-1">{career.title}</h3>
                </div>
                <p className="text-slate-600 leading-7">{career.description}</p>
                <div>
                  <p className="font-medium mb-2">適合特質</p>
                  <div className="flex flex-wrap gap-2">
                    {career.traits.map((trait) => (
                      <span key={trait} className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Typical Path</p>
                  <p className="text-slate-600 mt-1">{career.path}</p>
                </div>
                <div>
                  <p className="font-medium">How to test your interest</p>
                  <p className="text-slate-600 mt-1">{career.explore}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
