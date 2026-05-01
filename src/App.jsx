import { useMemo, useState } from "react";
import { actionPlans, ageActionPlans } from "./data/actionPlans";
import { careers } from "./data/careers";
import { careerClusters } from "./data/careerClusters";
import { careerProfiles } from "./data/careerProfiles";
import { careerTags } from "./data/careerTags";
import { categories } from "./data/categories";
import { categoryLabels } from "./data/categoryLabels";
import { dimensionLabels, dimensions } from "./data/dimensions";
import { filterLabels } from "./data/filterLabels";
import { filterOptions } from "./data/filterOptions";
import {
  actionOptions,
  ageGroups,
  clusterScenarioQuestions,
  workWithOptions
} from "./data/quizQuestions";

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

const getDirectionFitSummary = (clusterId) => {
  const summaries = {
    healthcareHelping:
      "你可能會對照顧、支持、陪伴和專業幫助人的工作有感，而且願意面對責任和長期累積。",
    technologyData:
      "你比較像會被系統、資料、邏輯和解決問題吸引的人，做出能運作的東西會讓你有成就感。",
    engineeringSystems:
      "你可能喜歡把抽象想法變成真實系統、結構或裝置，也能接受規格、限制和實作測試。",
    designCreativeMedia:
      "你比較可能在創意表達、體驗設計、畫面感和作品完成度裡找到興趣，會在意感受和呈現方式。",
    businessLeadership:
      "你可能對推動事情前進、整合資源、商業判斷和影響他人比較有感，而不只是單點執行。",
    lawPublicImpact:
      "你可能會被規則、公平、制度、公共議題和保護他人的角色吸引，願意面對責任與立場判斷。",
    hospitalityService:
      "你比較可能喜歡真實體驗、服務節奏、作品完成感和現場感，會從讓人實際感受到結果中得到回饋。",
    languageEducation:
      "你可能對解釋、教學、語言轉換和幫助別人理解事情有感，重視溝通與理解的過程。",
    aviationOperations:
      "你可能會被高標準程序、專注控制、即時判斷和運輸節奏吸引，對安全感與流程感比較敏銳。"
  };

  return summaries[clusterId] ?? "這條方向和你的回答有明顯重疊，值得你先花一點時間做真實探索。";
};

const getDirectionCaution = (clusterId) => {
  const cautions = {
    healthcareHelping:
      "不要只因為『想幫助人』就衝進去，先確認自己能不能接受長期訓練、情緒壓力和專業責任。",
    technologyData:
      "不要只因為覺得科技很熱門就往前走，先確認你能不能接受長時間專注、除錯和持續學新東西。",
    engineeringSystems:
      "不要只看表面的酷或成就感，先確認自己能不能接受理論基礎、規格限制和反覆測試。",
    designCreativeMedia:
      "不要只因為喜歡好看作品就下結論，先確認自己能不能接受反覆修改、回饋和產出壓力。",
    businessLeadership:
      "不要只因為聽起來發展很多就衝，先確認你能不能接受模糊問題、協調壓力和結果責任。",
    lawPublicImpact:
      "不要只因為覺得有正義感就決定，先確認你能不能接受閱讀、規則、衝突和高責任判斷。",
    hospitalityService:
      "不要只看成品或浪漫感，先確認你能不能接受現場節奏、重複練習、輪班或服務壓力。",
    languageEducation:
      "不要只因為語言不錯或喜歡教人就決定，先確認你能不能長期做說明、修正和陪伴理解。",
    aviationOperations:
      "不要只因為飛行很酷就決定，先確認你能不能接受程序紀律、高標準安全要求和不固定節奏。"
  };

  return cautions[clusterId] ?? "先用小型探索確認自己是真的有感，不要太快把自己綁死在單一路線。";
};

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

  const desiredCareerSimilarityBoost = (() => {
    if (!matchedDesiredCareer) {
      return 0;
    }

    if (career.title === matchedDesiredCareer.title) {
      return 20;
    }

    const sharedTags = career.tags.filter((tag) => matchedDesiredCareer.tags.includes(tag)).length;
    const sameCategory = career.category === matchedDesiredCareer.category ? 6 : 0;
    const sameWorkStyle = career.workStyle === matchedDesiredCareer.workStyle ? 2 : 0;

    return Math.min(14, sharedTags * 2 + sameCategory + sameWorkStyle);
  })();

  return {
    closestDimensions: getClosestDimensions(userProfile, fitProfile),
    fitProfile,
    score: clampScore(matchScore + categoryBoost + tagBoost + desiredCareerSimilarityBoost)
  };
};

const getClusterSignals = (selectedInterestObjects) => {
  const selectedInterestIds = new Set(selectedInterestObjects.map((interest) => interest.id));
  const hasInterest = (interestId) => selectedInterestIds.has(interestId);

  return { selectedInterestIds, hasInterest };
};

const getClusterComboBoost = (clusterId, hasInterest) => {
  if (clusterId === "hospitalityService") {
    return (
      (hasInterest("work-with-service-experience") ? 7 : 0) +
      (hasInterest("action-build") ? 3 : 0) +
      (hasInterest("action-create") ? 4 : 0) +
      (hasInterest("action-precision") ? 3 : 0) +
      (hasInterest("action-service") ? 3 : 0)
    );
  }

  if (clusterId === "designCreativeMedia") {
    return (
      (hasInterest("work-with-creative-output") ? 7 : 0) +
      (hasInterest("action-create") ? 5 : 0) +
      (hasInterest("action-build") ? 1 : 0)
    );
  }

  if (clusterId === "businessLeadership") {
    return (
      (hasInterest("work-with-business") ? 7 : 0) +
      (hasInterest("action-organize") ? 4 : 0) +
      (hasInterest("action-persuade") ? 4 : 0) +
      (hasInterest("action-analyze") ? 3 : 0) +
      (hasInterest("action-precision") ? 3 : 0) +
      (hasInterest("work-with-business") &&
      hasInterest("action-analyze") &&
      hasInterest("action-precision")
        ? 8
        : 0)
    );
  }

  if (clusterId === "lawPublicImpact") {
    return (
      (hasInterest("work-with-rules") ? 8 : 0) +
      (hasInterest("action-express") ? 3 : 0) +
      (hasInterest("action-persuade") ? 2 : 0) +
      (hasInterest("action-care") ? 2 : 0) +
      (hasInterest("action-service") ? 3 : 0) +
      (hasInterest("work-with-care") &&
      hasInterest("action-care") &&
      hasInterest("action-service") &&
      hasInterest("action-persuade")
        ? 8
        : 0)
    );
  }

  if (clusterId === "technologyData") {
    return (
      (hasInterest("work-with-systems-data") ? 8 : 0) +
      (hasInterest("action-analyze") ? 4 : 0) +
      (hasInterest("action-precision") ? 3 : 0) +
      (hasInterest("action-build") ? 2 : 0)
    );
  }

  if (clusterId === "engineeringSystems") {
    return (
      (hasInterest("work-with-machines") ? 7 : 0) +
      (hasInterest("action-build") ? 4 : 0) +
      (hasInterest("action-precision") ? 2 : 0)
    );
  }

  if (clusterId === "healthcareHelping") {
    return (
      (hasInterest("work-with-care") ? 8 : 0) +
      (hasInterest("action-care") ? 5 : 0) +
      (hasInterest("action-precision") ? 2 : 0) +
      (hasInterest("work-with-care") && hasInterest("action-care") && !hasInterest("action-service")
        ? 4
        : 0)
    );
  }

  if (clusterId === "languageEducation") {
    return (
      (hasInterest("work-with-care") ? 2 : 0) +
      (hasInterest("work-with-creative-output") ? 3 : 0) +
      (hasInterest("action-express") ? 5 : 0) +
      (hasInterest("action-care") ? 3 : 0) +
      (hasInterest("work-with-care") && hasInterest("action-express") ? 4 : 0)
    );
  }

  if (clusterId === "aviationOperations") {
    return (
      (hasInterest("work-with-aviation-control") ? 10 : 0) +
      (hasInterest("action-service") ? 2 : 0) +
      (hasInterest("action-precision") ? 3 : 0)
    );
  }

  return 0;
};

const getClusterConflictPenalty = (clusterId, hasInterest) => {
  let penalty = 0;

  if (hasInterest("work-with-rules")) {
    if (clusterId === "aviationOperations") penalty += 18;
    if (clusterId === "engineeringSystems") penalty += 12;
    if (clusterId === "technologyData") penalty += 6;
  }

  if (hasInterest("work-with-systems-data")) {
    if (clusterId === "aviationOperations" && !hasInterest("work-with-aviation-control")) penalty += 20;
    if (clusterId === "lawPublicImpact" && !hasInterest("work-with-rules")) penalty += 6;
  }

  if (hasInterest("work-with-business")) {
    if (clusterId === "engineeringSystems") penalty += 14;
    if (clusterId === "technologyData" && !hasInterest("work-with-systems-data")) penalty += 10;
    if (clusterId === "aviationOperations") penalty += 12;
    if (clusterId === "lawPublicImpact" && !hasInterest("work-with-rules")) penalty += 6;
  }

  if (hasInterest("work-with-care")) {
    if (clusterId === "businessLeadership" && !hasInterest("action-organize")) penalty += 8;
    if (clusterId === "aviationOperations") penalty += 10;
  }

  if (hasInterest("work-with-service-experience")) {
    if (clusterId === "designCreativeMedia" && !hasInterest("work-with-creative-output")) penalty += 12;
    if (clusterId === "engineeringSystems" && !hasInterest("work-with-machines")) penalty += 8;
  }

  if (hasInterest("action-create") && hasInterest("action-build") && hasInterest("action-precision")) {
    if (clusterId === "designCreativeMedia" && !hasInterest("work-with-creative-output")) penalty += 10;
    if (clusterId === "hospitalityService" && !hasInterest("work-with-service-experience")) penalty += 8;
  }

  if (hasInterest("action-care") && hasInterest("action-service")) {
    if (clusterId === "businessLeadership" && !hasInterest("work-with-business")) penalty += 10;
    if (clusterId === "hospitalityService" && !hasInterest("work-with-service-experience")) penalty += 6;
    if (clusterId === "languageEducation" && !hasInterest("action-express")) penalty += 8;
    if (clusterId === "healthcareHelping" && hasInterest("action-persuade")) penalty += 6;
  }

  if (hasInterest("action-build") && hasInterest("action-analyze") && hasInterest("action-precision")) {
    if (clusterId === "aviationOperations" && !hasInterest("work-with-aviation-control")) penalty += 18;
    if (clusterId === "engineeringSystems" && !hasInterest("work-with-machines")) penalty += 6;
    if (clusterId === "businessLeadership" && hasInterest("work-with-business")) penalty -= 4;
  }

  if (hasInterest("work-with-business") && hasInterest("action-analyze") && hasInterest("action-precision")) {
    if (clusterId === "technologyData") penalty += 12;
    if (clusterId === "engineeringSystems") penalty += 12;
  }

  if (
    hasInterest("work-with-care") &&
    hasInterest("action-care") &&
    hasInterest("action-service") &&
    hasInterest("action-persuade")
  ) {
    if (clusterId === "languageEducation") penalty += 12;
    if (clusterId === "healthcareHelping") penalty += 8;
  }

  return penalty;
};

const getClusterScores = ({
  careersWithTags,
  userProfile,
  selectedInterestObjects,
  matchedDesiredCareer
}) =>
  Object.entries(careerClusters)
    .map(([clusterId, cluster]) => {
      const { hasInterest } = getClusterSignals(selectedInterestObjects);
      const clusterCareers = careersWithTags.filter((career) => cluster.careers.includes(career.title));

      const topCareerMatches = clusterCareers
        .map((career) => getMatchScore(userProfile, getCareerFitProfile(career)))
        .sort((a, b) => b - a)
        .slice(0, 3);

      const baseScore =
        topCareerMatches.length > 0
          ? Math.round(
              topCareerMatches.reduce((sum, score) => sum + score, 0) / topCareerMatches.length
            )
          : 0;

      const categoryBoost = selectedInterestObjects.reduce((sum, interest) => {
        const overlap = interest.categories.filter((category) =>
          cluster.categories.includes(category)
        ).length;

        return sum + overlap * 2;
      }, 0);

      const tagBoost = selectedInterestObjects.reduce((sum, interest) => {
        const overlap = interest.tags.filter((tag) => cluster.tags.includes(tag)).length;

        return sum + overlap * 1.5;
      }, 0);

      const comboBoost = getClusterComboBoost(clusterId, hasInterest);
      const conflictPenalty = getClusterConflictPenalty(clusterId, hasInterest);

      const aspirationBoost = matchedDesiredCareer
        ? cluster.careers.includes(matchedDesiredCareer.title)
          ? 10
          : matchedDesiredCareer.category &&
              cluster.categories.includes(matchedDesiredCareer.category)
            ? 4
            : 0
        : 0;

      return {
        clusterId,
        ...cluster,
        score: clampScore(
          Math.round(baseScore * 0.72 + categoryBoost + tagBoost + comboBoost + aspirationBoost - conflictPenalty)
        )
      };
    })
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [selectedEducation, setSelectedEducation] = useState("All");
  const [selectedWorkStyle, setSelectedWorkStyle] = useState("All");
  const [selectedPressure, setSelectedPressure] = useState("All");
  const [search, setSearch] = useState("");

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedWorkWith, setSelectedWorkWith] = useState("");
  const [selectedAction, setSelectedAction] = useState([]);
  const [careerDirection, setCareerDirection] = useState("unsure");
  const [desiredCareerInput, setDesiredCareerInput] = useState("");
  const [skipSituational, setSkipSituational] = useState(false);
  const [answers, setAnswers] = useState({});
  const [selectedDirectionId, setSelectedDirectionId] = useState("");

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
    () =>
      [
        workWithOptions.find((option) => option.id === selectedWorkWith),
        ...actionOptions.filter((option) => selectedAction.includes(option.id))
      ].filter(Boolean),
    [selectedWorkWith, selectedAction]
  );

  const selectedAgeObject = useMemo(
    () => ageGroups.find((ageGroup) => ageGroup.id === selectedAgeGroup) ?? null,
    [selectedAgeGroup]
  );
  const selectedAgePlan = selectedAgeGroup ? ageActionPlans[selectedAgeGroup] ?? null : null;

  const matchedDesiredCareer = useMemo(
    () =>
      careerDirection === "have-idea"
        ? findMatchedCareer(desiredCareerInput, careersWithTags)
        : null,
    [careerDirection, desiredCareerInput, careersWithTags]
  );

  const prerequisitesReady =
    Boolean(selectedAgeGroup) &&
    Boolean(selectedWorkWith) &&
    selectedAction.length > 0 &&
    (careerDirection === "unsure" || desiredCareerInput.trim().length > 0);

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

  const discoveryRankedClusters = getClusterScores({
    careersWithTags,
    userProfile: onboardingProfile,
    selectedInterestObjects,
    matchedDesiredCareer
  });
  const discoveryPrimaryCluster = discoveryRankedClusters[0] ?? null;
  const discoverySecondaryCluster = discoveryRankedClusters[1] ?? null;
  const shouldBlendDiscoveryQuestions =
    Boolean(discoveryPrimaryCluster) &&
    Boolean(discoverySecondaryCluster) &&
    Math.abs((discoveryPrimaryCluster?.score ?? 0) - (discoverySecondaryCluster?.score ?? 0)) <= 5;
  const discoveryQuestionClusters = shouldBlendDiscoveryQuestions
    ? [discoveryPrimaryCluster, discoverySecondaryCluster]
    : discoveryPrimaryCluster
      ? [discoveryPrimaryCluster]
      : [];

  const activeQuestions = useMemo(() => {
    if (!prerequisitesReady || discoveryQuestionClusters.length === 0) {
      return [];
    }

    if (discoveryQuestionClusters.length === 1) {
      return clusterScenarioQuestions[discoveryQuestionClusters[0].clusterId] ?? [];
    }

    return discoveryQuestionClusters.flatMap((cluster) =>
      (clusterScenarioQuestions[cluster.clusterId] ?? []).slice(0, 2)
    );
  }, [prerequisitesReady, discoveryQuestionClusters]);

  const activeAnswers = Object.fromEntries(
    Object.entries(answers).filter(([id]) => activeQuestions.some((question) => question.id === id))
  );
  const answeredCount = Object.keys(activeAnswers).length;
  const shouldAskSituational = !(skipSituational && matchedDesiredCareer);

  const quizComplete =
    prerequisitesReady &&
    (shouldAskSituational ? answeredCount === activeQuestions.length && activeQuestions.length > 0 : true);

  const userProfile = shouldAskSituational
    ? getUserProfile(activeAnswers, onboardingProfile)
    : onboardingProfile;

  const rankedClusters = getClusterScores({
    careersWithTags,
    userProfile,
    selectedInterestObjects,
    matchedDesiredCareer
  });
  const primaryCluster = rankedClusters[0] ?? null;
  const recommendationClusters = rankedClusters.filter(
    (cluster, index) =>
      index < 3 && cluster.score >= Math.max((rankedClusters[0]?.score ?? 0) - 6, 72)
  );
  const recommendationCareerSet = new Set(
    recommendationClusters.flatMap((cluster) => cluster.careers)
  );
  const fallbackCareerSet = new Set(careersWithTags.map((career) => career.title));

  const scoredCareers = careersWithTags
    .filter((career) =>
      recommendationCareerSet.size > 0
        ? recommendationCareerSet.has(career.title)
        : fallbackCareerSet.has(career.title)
    )
    .map((career) => {
      const recommendation = getRecommendationScore({
        career,
        userProfile,
        selectedInterestObjects,
        matchedDesiredCareer
      });

      const clusterBonus = recommendationClusters.reduce((sum, cluster, index) => {
        if (!cluster.careers.includes(career.title)) {
          return sum;
        }

        return sum + (index === 0 ? 6 : 3);
      }, 0);

      return { ...career, ...recommendation, score: clampScore(recommendation.score + clusterBonus) };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const allScoredCareers = careersWithTags
    .map((career) => {
      const recommendation = getRecommendationScore({
        career,
        userProfile,
        selectedInterestObjects,
        matchedDesiredCareer
      });

      const clusterBonus = recommendationClusters.reduce((sum, cluster, index) => {
        if (!cluster.careers.includes(career.title)) {
          return sum;
        }

        return sum + (index === 0 ? 6 : 3);
      }, 0);

      return { ...career, ...recommendation, score: clampScore(recommendation.score + clusterBonus) };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const recommendedCareers = scoredCareers.reduce((selected, career) => {
    if (selected.length >= 3) {
      return selected;
    }

    const usedCategories = new Set(selected.map((item) => item.category));

    if (usedCategories.has(career.category)) {
      return selected;
    }

    return [...selected, career];
  }, []);
  const finalRecommendedCareers = [
    ...recommendedCareers,
    ...allScoredCareers.filter(
      (career) =>
        !recommendedCareers.some((item) => item.title === career.title) &&
        !recommendedCareers.some((item) => item.category === career.category)
    ),
    ...allScoredCareers.filter(
      (career) => !recommendedCareers.some((item) => item.title === career.title)
    )
  ].slice(0, 3);
  const directionRecommendations = rankedClusters.slice(0, 3).map((cluster) => {
    const representativeCareers = allScoredCareers
      .filter((career) => cluster.careers.includes(career.title))
      .slice(0, 3);
    const firstCategory = cluster.categories[0];
    const categoryPlan = actionPlans[firstCategory] ?? null;

    return {
      ...cluster,
      representativeCareers,
      fitSummary: getDirectionFitSummary(cluster.clusterId),
      caution: getDirectionCaution(cluster.clusterId),
      nextTry:
        categoryPlan?.try ??
        representativeCareers[0]?.explore ??
        "先從一個小型嘗試開始，確認自己對這條方向有沒有感覺。",
      nextWatch:
        categoryPlan?.watch ??
        representativeCareers[0]?.explore ??
        "先找一支真實從業者影片，看看你對這個世界有沒有興趣。",
      nextLearn:
        categoryPlan?.learn ??
        representativeCareers[0]?.path ??
        "先理解這條路最基本的能力要求。"
    };
  });
  const activeDirection =
    directionRecommendations.find((direction) => direction.clusterId === selectedDirectionId) ??
    null;
  const focusedDirectionCareers = activeDirection
    ? allScoredCareers.filter((career) => activeDirection.careers.includes(career.title)).slice(0, 3)
    : [];

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
    setSelectedWorkWith("");
    setSelectedAction([]);
    setCareerDirection("unsure");
    setDesiredCareerInput("");
    setSkipSituational(false);
    setAnswers({});
    setSelectedDirectionId("");
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
                  </button>
                ))}
              </div>
            </article>

            <article className="discovery-card">
              <div className="stage-header">
                <span>Layer 2</span>
                <h3>你比較喜歡面對什麼？</h3>
              </div>
              <p className="stage-note">先選一個你最常想面對的對象，這比先選科系或產業更直覺。</p>
              <div className="chip-grid">
                {workWithOptions.map((interest) => {
                  const selected = selectedWorkWith === interest.id;

                  return (
                    <button
                      className={selected ? "selected" : ""}
                      key={interest.id}
                      onClick={() => {
                        setSelectedWorkWith(interest.id);
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
                <span>Layer 2B</span>
                <h3>你比較喜歡做什麼？</h3>
              </div>
              <p className="stage-note">這一層可以複選。選 1 到 3 個你做起來最有感的動作，第四層和推薦都會跟著一起調整。</p>
              <div className="chip-grid">
                {actionOptions.map((action) => {
                  const selected = selectedAction.includes(action.id);

                  return (
                    <button
                      className={selected ? "selected" : ""}
                      key={action.id}
                      onClick={() => {
                        setSelectedAction((current) =>
                          current.includes(action.id)
                            ? current.filter((id) => id !== action.id)
                            : [...current, action.id]
                        );
                        setSkipSituational(false);
                        setAnswers({});
                      }}
                      type="button"
                    >
                      <strong>{action.label}</strong>
                      <span>{action.description}</span>
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
                    第四層現在不再用共用題庫，而是先判斷你目前最像哪個職業群；如果你的訊號同時很接近兩群，就會各挑 2 題來幫你分辨。
                  </p>
                  {discoveryPrimaryCluster && (
                    <p className="stage-cluster-hint">
                      {shouldBlendDiscoveryQuestions && discoverySecondaryCluster
                        ? `目前暫時介於：${discoveryPrimaryCluster.label} / ${discoverySecondaryCluster.label}`
                        : `目前暫時判斷最像：${discoveryPrimaryCluster.label}`}
                    </p>
                  )}
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
                  <p className="eyebrow">Explore Directions</p>
                  <h3>你現在最值得探索的 3 條方向</h3>
                  {primaryCluster && (
                    <p className="cluster-summary">
                      目前最像的職業群：{primaryCluster.label}
                    </p>
                  )}
                </div>
                <p className="results-note">
                  系統不是直接替你決定答案，而是先整理出幾條合理的路，讓你知道接下來可以往哪裡試。
                </p>
              </div>
              <div className="recommendation-grid">
                {directionRecommendations.map((direction, index) => (
                  <article className="recommendation-card" key={direction.clusterId}>
                    <div className="recommendation-topline">
                      <p className="rank">#{index + 1}</p>
                      <p className="score">{direction.score}% direction fit</p>
                    </div>

                    <div>
                      <h4 className="direction-title">{direction.label}</h4>
                      <p className="direction-description">{direction.description}</p>
                    </div>

                    <div>
                      <p className="recommendation-label">Why this direction fits you</p>
                      <p>{direction.fitSummary}</p>
                    </div>

                    <div>
                      <p className="recommendation-label">Representative careers</p>
                      <div className="traits compact">
                        {direction.representativeCareers.map((career) => (
                          <span key={career.title}>{career.title}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="recommendation-label">What to try this month</p>
                      <p>{direction.nextTry}</p>
                    </div>

                    <div>
                      <p className="recommendation-label">What to watch first</p>
                      <p>{direction.nextWatch}</p>
                    </div>

                    <div>
                      <p className="recommendation-label">What to learn first</p>
                      <p>{direction.nextLearn}</p>
                    </div>

                    {selectedAgePlan && (
                      <div className="age-plan-box">
                        <p className="recommendation-label">{selectedAgePlan.title}</p>
                        <div className="age-plan-list">
                          <div className="age-plan-item">
                            <span>Focus</span>
                            <p>{selectedAgePlan.focus}</p>
                          </div>
                          <div className="age-plan-item">
                            <span>This week</span>
                            <p>{selectedAgePlan.thisWeek}</p>
                          </div>
                          <div className="age-plan-item">
                            <span>This month</span>
                            <p>{selectedAgePlan.thisMonth}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedAgePlan && (
                      <div className="recommendation-caution">
                        <p className="recommendation-label">What not to rush</p>
                        <p>{direction.caution}</p>
                      </div>
                    )}

                    <button
                      className={selectedDirectionId === direction.clusterId ? "direction-button active" : "direction-button"}
                      onClick={() => setSelectedDirectionId(direction.clusterId)}
                      type="button"
                    >
                      {selectedDirectionId === direction.clusterId
                        ? "正在深入看這條方向"
                        : "深入看這條方向"}
                    </button>
                  </article>
                ))}
              </div>

              {activeDirection ? (
                <>
                  <div className="recommendations-header">
                    <div>
                      <p className="eyebrow">Focused Careers</p>
                      <h3>{activeDirection.label} 裡可以先看的 3 個職業</h3>
                      <p className="cluster-summary">
                        這一步不是要你立刻決定答案，而是讓你先在同一條方向裡比較不同可能。
                      </p>
                    </div>
                  </div>
                  <div className="recommendation-grid">
                    {focusedDirectionCareers.map((career, index) => (
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
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="recommendation-placeholder compact">
                  先從上面的三條方向選一條深入看，下面才會出現那一類裡更具體的職業比較。
                </div>
              )}
            </div>
          ) : (
            <div className="recommendation-placeholder">
              完成四層探索後，這裡會先顯示值得探索的方向，而不是直接只給你單一職業答案。
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
