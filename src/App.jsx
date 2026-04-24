import { useMemo, useState } from "react";
import { actionPlans } from "./data/actionPlans";
import { careers } from "./data/careers";
import { careerProfiles } from "./data/careerProfiles";
import { careerTags } from "./data/careerTags";
import { categories } from "./data/categories";
import { categoryLabels } from "./data/categoryLabels";
import { dimensionLabels, dimensions } from "./data/dimensions";
import { filterLabels } from "./data/filterLabels";
import { filterOptions } from "./data/filterOptions";
import { ageGroups, interestOptions, scenarioQuestionBank } from "./data/quizQuestions";

const clampScore = (score) => Math.min(100, Math.max(0, score));

const normalizeText = (text = "") => text.toLowerCase().trim();

const createNeutralProfile = () =>
  Object.fromEntries(dimensions.map((dimension) => [dimension, 50]));

const applyScores = (profile, scores) => {
  const nextProfile = { ...profile };

  Object.entries(scores).forEach(([dimension, score]) => {
    nextProfile[dimension] = clampScore((nextProfile[dimension] ?? 50) + score);
  });

  return nextProfile;
};

const blendTowardProfile = (profile, targetProfile, weight = 0.35) =>
  Object.fromEntries(
    dimensions.map((dimension) => [
      dimension,
      clampScore(
        profile[dimension] + Math.round((targetProfile[dimension] - profile[dimension]) * weight)
      )
    ])
  );

const getUserProfile = (answers, baseProfile = createNeutralProfile()) =>
  Object.values(answers).reduce(
    (profile, answer) => applyScores(profile, answer.scores),
    baseProfile
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

const findMatchedCareer = (input, careersWithTags) => {
  const normalized = normalizeText(input);

  if (!normalized) {
    return null;
  }

  return (
    careersWithTags.find((career) => normalizeText(career.title) === normalized) ||
    careersWithTags.find((career) => normalizeText(career.title).includes(normalized)) ||
    null
  );
};

const getSuggestedQuestions = (selectedInterestObjects, matchedCareer, selectedAgeGroupId) => {
  const selectedCategories = new Set(selectedInterestObjects.flatMap((interest) => interest.categories));
  const selectedTags = new Set(selectedInterestObjects.flatMap((interest) => interest.tags));

  if (matchedCareer) {
    selectedCategories.add(matchedCareer.category);
    matchedCareer.tags.forEach((tag) => selectedTags.add(tag));
  }

  const ageWeight =
    selectedAgeGroupId === "middle-school" ? 0.6 : selectedAgeGroupId === "adult" ? 1.1 : 1;

  return scenarioQuestionBank
    .map((question, index) => {
      const categoryHits = question.focusCategories.filter((category) =>
        selectedCategories.has(category)
      ).length;
      const tagHits = question.focusTags.filter((tag) => selectedTags.has(tag)).length;
      const relevance = (categoryHits * 2 + tagHits) * ageWeight;

      return { ...question, relevance, index };
    })
    .sort((a, b) => b.relevance - a.relevance || a.index - b.index)
    .slice(0, 6)
    .sort((a, b) => a.index - b.index);
};

const getRecommendationScore = ({
  career,
  userProfile,
  selectedInterestObjects,
  matchedDesiredCareer
}) => {
  const fitProfile = getCareerFitProfile(career);
  const matchScore = getMatchScore(userProfile, fitProfile);

  const categoryBoost = selectedInterestObjects.some((interest) =>
    interest.categories.includes(career.category)
  )
    ? 4
    : 0;

  const tagBoost = selectedInterestObjects.reduce((sum, interest) => {
    const overlap = interest.tags.filter((tag) => career.tags.includes(tag)).length;
    return sum + overlap;
  }, 0);

  const aspirationBoost =
    matchedDesiredCareer && career.title === matchedDesiredCareer.title
      ? 10
      : matchedDesiredCareer && career.category === matchedDesiredCareer.category
        ? 5
        : 0;

  return {
    closestDimensions: getClosestDimensions(userProfile, fitProfile),
    fitProfile,
    score: clampScore(matchScore + categoryBoost + tagBoost + aspirationBoost)
  };
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [selectedEducation, setSelectedEducation] = useState("All");
  const [selectedWorkStyle, setSelectedWorkStyle] = useState("All");
  const [selectedPressure, setSelectedPressure] = useState("All");
  const [search, setSearch] = useState("");

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [careerDirection, setCareerDirection] = useState("unsure");
  const [desiredCareerInput, setDesiredCareerInput] = useState("");
  const [skipSituational, setSkipSituational] = useState(false);
  const [answers, setAnswers] = useState({});

  const normalizedSearch = search.trim().toLowerCase();
  const careersWithTags = useMemo(
    () =>
      careers.map((career) => ({
        ...career,
        ...(careerProfiles[career.title] ?? {}),
        tags: careerTags[career.title] ?? []
      })),
    []
  );

  const selectedInterestObjects = useMemo(
    () => interestOptions.filter((interest) => selectedInterests.includes(interest.id)),
    [selectedInterests]
  );

  const selectedAgeObject = useMemo(
    () => ageGroups.find((ageGroup) => ageGroup.id === selectedAgeGroup) ?? null,
    [selectedAgeGroup]
  );

  const matchedDesiredCareer = useMemo(
    () =>
      careerDirection === "have-idea"
        ? findMatchedCareer(desiredCareerInput, careersWithTags)
        : null,
    [careerDirection, desiredCareerInput, careersWithTags]
  );

  const prerequisitesReady =
    Boolean(selectedAgeGroup) &&
    selectedInterests.length > 0 &&
    (careerDirection === "unsure" || desiredCareerInput.trim().length > 0);

  const activeQuestions = useMemo(
    () =>
      prerequisitesReady
        ? getSuggestedQuestions(selectedInterestObjects, matchedDesiredCareer, selectedAgeGroup)
        : [],
    [prerequisitesReady, selectedInterestObjects, matchedDesiredCareer, selectedAgeGroup]
  );

  const activeAnswers = Object.fromEntries(
    Object.entries(answers).filter(([id]) => activeQuestions.some((question) => question.id === id))
  );
  const answeredCount = Object.keys(activeAnswers).length;
  const shouldAskSituational = !(skipSituational && matchedDesiredCareer);

  const onboardingProfile = useMemo(() => {
    let profile = createNeutralProfile();

    if (selectedAgeObject) {
      profile = applyScores(profile, selectedAgeObject.scores);
    }

    selectedInterestObjects.forEach((interest) => {
      profile = applyScores(profile, interest.scores);
    });

    if (matchedDesiredCareer) {
      profile = blendTowardProfile(profile, getCareerFitProfile(matchedDesiredCareer), 0.32);
    }

    return profile;
  }, [matchedDesiredCareer, selectedAgeObject, selectedInterestObjects]);

  const quizComplete =
    prerequisitesReady &&
    (shouldAskSituational ? answeredCount === activeQuestions.length && activeQuestions.length > 0 : true);

  const userProfile = shouldAskSituational
    ? getUserProfile(activeAnswers, onboardingProfile)
    : onboardingProfile;

  const recommendedCareers = careersWithTags
    .map((career) => {
      const recommendation = getRecommendationScore({
        career,
        userProfile,
        selectedInterestObjects,
        matchedDesiredCareer
      });

      return { ...career, ...recommendation };
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

  const resetDiscoveryFlow = () => {
    setSelectedAgeGroup("");
    setSelectedInterests([]);
    setCareerDirection("unsure");
    setDesiredCareerInput("");
    setSkipSituational(false);
    setAnswers({});
  };

  return (
    <main className="page-shell">
      <div className="content">
        <header className="hero">
          <p className="eyebrow">Career Explorer</p>
          <h1>Find careers that may actually fit you</h1>
          <p className="intro">
            給還不知道自己未來要做什麼的學生：先從年齡、興趣、嚮往的方向開始，再透過情境題慢慢看清楚自己。
          </p>

          <div className="steps">
            <article>
              <h2>Step 1</h2>
              <p>先用年齡層和目前階段，決定探索的角度。</p>
            </article>
            <article>
              <h2>Step 2</h2>
              <p>選興趣和嚮往職業，讓問題更貼近你。</p>
            </article>
            <article>
              <h2>Step 3</h2>
              <p>回答少量情境題，或直接跳過看推薦。</p>
            </article>
          </div>
        </header>

        <section className="quiz-panel">
          <div className="quiz-intro">
            <p className="eyebrow">Guided Discovery</p>
            <h2>先不要急著答抽象題，先建立你的探索背景</h2>
            <p>
              系統會先看你的年齡層、興趣和嚮往方向，再挑出比較像真實情境的問題。如果你已經很確定想走某個職業，也可以直接跳過第四層。
            </p>
          </div>

          <div className="discovery-stack">
            <article className="discovery-card">
              <div className="stage-header">
                <span>Layer 1</span>
                <h3>你現在大概在哪個階段？</h3>
              </div>
              <div className="choice-grid">
                {ageGroups.map((ageGroup) => (
                  <button
                    className={selectedAgeGroup === ageGroup.id ? "selected" : ""}
                    key={ageGroup.id}
                    onClick={() => {
                      setSelectedAgeGroup(ageGroup.id);
                      setSkipSituational(false);
                      setAnswers({});
                    }}
                    type="button"
                  >
                    <strong>{ageGroup.label}</strong>
                    <span>{ageGroup.description}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="discovery-card">
              <div className="stage-header">
                <span>Layer 2</span>
                <h3>你現在比較有感的興趣是哪些？</h3>
              </div>
              <p className="stage-note">建議先選 2 到 4 個，之後情境題會跟著調整。</p>
              <div className="chip-grid">
                {interestOptions.map((interest) => {
                  const selected = selectedInterests.includes(interest.id);

                  return (
                    <button
                      className={selected ? "selected" : ""}
                      key={interest.id}
                      onClick={() => {
                        setSelectedInterests((current) =>
                          current.includes(interest.id)
                            ? current.filter((id) => id !== interest.id)
                            : [...current, interest.id]
                        );
                        setSkipSituational(false);
                        setAnswers({});
                      }}
                      type="button"
                    >
                      <strong>{interest.label}</strong>
                      <span>{interest.description}</span>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="discovery-card">
              <div className="stage-header">
                <span>Layer 3</span>
                <h3>你現在有沒有特別嚮往的職業？</h3>
              </div>
              <div className="direction-toggle">
                <button
                  className={careerDirection === "unsure" ? "selected" : ""}
                  onClick={() => {
                    setCareerDirection("unsure");
                    setDesiredCareerInput("");
                    setSkipSituational(false);
                    setAnswers({});
                  }}
                  type="button"
                >
                  我還不確定
                </button>
                <button
                  className={careerDirection === "have-idea" ? "selected" : ""}
                  onClick={() => {
                    setCareerDirection("have-idea");
                    setSkipSituational(false);
                    setAnswers({});
                  }}
                  type="button"
                >
                  我有嚮往方向
                </button>
              </div>

              {careerDirection === "have-idea" && (
                <div className="career-intent-box">
                  <label className="search-box">
                    <span>輸入職業名稱，可以從清單選一個最接近的</span>
                    <input
                      list="career-wishlist"
                      onChange={(event) => {
                        setDesiredCareerInput(event.target.value);
                        setSkipSituational(false);
                        setAnswers({});
                      }}
                      placeholder="例如：軟體工程師 / Software Engineer"
                      type="text"
                      value={desiredCareerInput}
                    />
                    <datalist id="career-wishlist">
                      {careersWithTags.map((career) => (
                        <option key={career.title} value={career.title} />
                      ))}
                    </datalist>
                  </label>

                  {desiredCareerInput.trim() && matchedDesiredCareer && (
                    <p className="match-hint">
                      已對應到：{matchedDesiredCareer.title}，第四層會優先問這個方向相關的情境題。
                    </p>
                  )}

                  {desiredCareerInput.trim() && !matchedDesiredCareer && (
                    <p className="match-hint warning">
                      目前沒有完全對應到現有職業，建議從清單選一個最接近的名稱。
                    </p>
                  )}

                  {matchedDesiredCareer && (
                    <button
                      className={skipSituational ? "secondary active" : "secondary"}
                      onClick={() => {
                        setSkipSituational((current) => !current);
                        setAnswers({});
                      }}
                      type="button"
                    >
                      {skipSituational
                        ? "改成回答第四層情境題"
                        : "我已經很確定方向，跳過第四層直接看推薦"}
                    </button>
                  )}
                </div>
              )}
            </article>

            <article className="discovery-card">
              <div className="stage-header">
                <span>Layer 4</span>
                <h3>根據你的背景挑出來的情境題</h3>
              </div>

              {!prerequisitesReady ? (
                <div className="recommendation-placeholder compact">
                  先完成前面三層，這裡才會出現更貼近你的情境題。
                </div>
              ) : shouldAskSituational ? (
                <>
                  <p className="stage-note">
                    這一組題目是根據你的年齡層、興趣和目前嚮往職業挑出來的，所以每個人看到的不一定一樣。
                  </p>
                  <div className="quiz-grid">
                    {activeQuestions.map((question) => (
                      <article className="quiz-question" key={question.id}>
                        <p className="scenario-title">{question.title}</p>
                        <p className="scenario-text">{question.scenario}</p>
                        <h3>{question.prompt}</h3>
                        <div className="quiz-options">
                          {question.options.map((option) => (
                            <button
                              className={activeAnswers[question.id]?.value === option.value ? "selected" : ""}
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
                </>
              ) : (
                <div className="recommendation-placeholder compact">
                  你已經有很明確的嚮往方向，所以這次先直接跳過情境題。
                </div>
              )}
            </article>
          </div>

          <div className="quiz-footer">
            <p>
              {shouldAskSituational && prerequisitesReady
                ? `已回答 ${answeredCount} / ${activeQuestions.length} 題情境題`
                : "你可以隨時重設整個探索流程"}
            </p>
            <button onClick={resetDiscoveryFlow} type="button">
              Reset discovery flow
            </button>
          </div>

          {quizComplete ? (
            <div className="recommendations">
              <div className="recommendations-header">
                <div>
                  <p className="eyebrow">Top Matches</p>
                  <h3>Top 3 careers that may fit you</h3>
                </div>
                <p className="results-note">
                  系統已綜合你的年齡層、興趣、嚮往職業
                  {shouldAskSituational ? " 和情境題答案" : ""}。
                </p>
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
              完成四層探索後，這裡會顯示你的 Top 3 推薦職業。如果你第三層已經很明確，也可以直接跳過第四層。
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

                  <details className="career-details">
                    <summary>View more details</summary>

                    <div>
                      <p className="label">可能不適合如果...</p>
                      <p className="detail">{career.avoid}</p>
                    </div>

                    <div>
                      <p className="label">Typical Path</p>
                      <p className="detail">{career.path}</p>
                    </div>

                    <div>
                      <p className="label">Self-exploration questions</p>
                      <ul className="questions">
                        {career.questions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
