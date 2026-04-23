import { useState } from "react";
import { actionPlans } from "./data/actionPlans";
import { careers } from "./data/careers";
import { careerProfiles } from "./data/careerProfiles";
import { careerTags } from "./data/careerTags";
import { categories } from "./data/categories";
import { categoryLabels } from "./data/categoryLabels";
import { dimensionLabels, dimensions } from "./data/dimensions";
import { filterLabels } from "./data/filterLabels";
import { filterOptions } from "./data/filterOptions";
import { quizQuestions } from "./data/quizQuestions";

const clampScore = (score) => Math.min(100, Math.max(0, score));

const createNeutralProfile = () =>
  Object.fromEntries(dimensions.map((dimension) => [dimension, 50]));

const applyScores = (profile, scores) => {
  const nextProfile = { ...profile };

  Object.entries(scores).forEach(([dimension, score]) => {
    nextProfile[dimension] = clampScore((nextProfile[dimension] ?? 50) + score);
  });

  return nextProfile;
};

const getUserProfile = (answers) =>
  Object.values(answers).reduce(
    (profile, answer) => applyScores(profile, answer.scores),
    createNeutralProfile()
  );

const tagDimensionScores = {
  people: { people: 24 },
  communication: { people: 18 },
  helping: { people: 20 },
  independent: { people: -24, logic: 8 },
  analytical: { logic: 24 },
  technical: { logic: 18 },
  detail: { logic: 12, stability: 4 },
  science: { logic: 16, longLearning: 10 },
  creative: { creativity: 24 },
  design: { creativity: 18 },
  media: { creativity: 14 },
  writing: { creativity: 8, people: 4 },
  high_pressure: { pressure: 24 },
  low_pressure: { pressure: -20 },
  stable: { stability: 20 },
  risk: { stability: -22, pressure: 8 },
  fast_change: { stability: -14, creativity: 8 },
  long_study: { longLearning: 24 },
  planning: { logic: 10, creativity: 6, longLearning: 4 },
  hands_on: { logic: 8, creativity: 4 },
  business: { people: 6, logic: 6 },
  public_service: { people: 10, pressure: 8 },
  hospitality: { people: 12, pressure: 8 },
  language: { people: 6, creativity: 8, longLearning: 4 },
  travel: { stability: -8, pressure: 6 },
  education: { people: 12, creativity: 6 },
  engineering: { logic: 16 }
};

const profileDimensionScores = {
  workStyle: {
    "People-focused": { people: 18 },
    Independent: { people: -18, logic: 6 },
    "Hands-on": { logic: 8, creativity: 4 },
    "Desk-based": { logic: 10, people: -6 },
    Creative: { creativity: 18 }
  },
  pressureLevel: {
    Low: { pressure: -20 },
    Medium: {},
    High: { pressure: 20 }
  },
  stability: {
    Stable: { stability: 18 },
    Variable: { stability: -18, creativity: 4 }
  },
  educationLevel: {
    "Short Training": { longLearning: -14 },
    Bachelor: {},
    Graduate: { longLearning: 18 },
    "License/Certification": { longLearning: 8, stability: 4 }
  }
};

const getCareerFitProfile = (career) => {
  let profile = createNeutralProfile();

  career.tags.forEach((tag) => {
    profile = applyScores(profile, tagDimensionScores[tag] ?? {});
  });

  ["workStyle", "pressureLevel", "stability", "educationLevel"].forEach((field) => {
    profile = applyScores(profile, profileDimensionScores[field]?.[career[field]] ?? {});
  });

  return profile;
};

const getMatchScore = (userProfile, careerProfile) => {
  const totalDifference = dimensions.reduce(
    (sum, dimension) => sum + Math.abs(userProfile[dimension] - careerProfile[dimension]),
    0
  );
  const maxDifference = dimensions.length * 100;

  return Math.round(100 - (totalDifference / maxDifference) * 100);
};

const getClosestDimensions = (userProfile, careerProfile) =>
  dimensions
    .map((dimension) => ({
      dimension,
      difference: Math.abs(userProfile[dimension] - careerProfile[dimension])
    }))
    .sort((a, b) => a.difference - b.difference)
    .slice(0, 3)
    .map(({ dimension }) => dimension);

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
  const answeredCount = Object.keys(answers).length;
  const quizComplete = answeredCount === quizQuestions.length;
  const userProfile = getUserProfile(answers);

  const recommendedCareers = careersWithTags
    .map((career) => {
      const fitProfile = getCareerFitProfile(career);
      const score = getMatchScore(userProfile, fitProfile);
      const closestDimensions = getClosestDimensions(userProfile, fitProfile);

      return { ...career, closestDimensions, fitProfile, score };
    })
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
                      className={answers[question.id]?.value === option.value ? "selected" : ""}
                      key={option.value}
                      onClick={() =>
                        setAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [question.id]: option
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
                      <p className="score">{career.score}% match</p>
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
                        你的回答和這個職業在{" "}
                        {career.closestDimensions
                          .map((dimension) => dimensionLabels[dimension])
                          .join("、")}{" "}
                        這幾個面向最接近。
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
              回答完全部問題後，這裡會顯示你的 Top 3 推薦職業。
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
                    <span>{filterLabels[career.salary]}</span>
                    <span>{filterLabels[career.educationLevel]}</span>
                    <span>{filterLabels[career.workStyle]}</span>
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
                    <p className="label">適合你如果...</p>
                    <p className="detail">{career.fit}</p>
                  </div>

                  <div className="try-box">
                    <p className="label">Try this</p>
                    <p className="detail">{career.explore}</p>
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
