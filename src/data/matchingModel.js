export const matchingModel = {
  version: "2026-05-01",
  clusterScore: {
    baseWeight: 0.72,
    categoryOverlapWeight: 2,
    tagOverlapWeight: 1.5,
    primaryCareerBonus: 6,
    secondaryCareerBonus: 3,
    recommendationClusterGap: 6,
    recommendationClusterFloor: 72,
    blendQuestionGap: 5
  },
  aspiration: {
    exactCareerBoost: 20,
    similarityCap: 14,
    sameCategoryBoost: 6,
    sameWorkStyleBoost: 2,
    clusterExactBoost: 10,
    clusterCategoryBoost: 4
  },
  analytics: {
    version: "2026-05-01",
    maxEvents: 250
  }
};
