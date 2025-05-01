const getCurrentSeasonInfo = (): { season: string; year: number } => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let season: string;
  if (month >= 0 && month <= 2) {
    season = "winter";
  } else if (month >= 3 && month <= 5) {
    season = "spring";
  } else if (month >= 6 && month <= 8) {
    season = "summer";
  } else {
    season = "fall";
  }
  return { season, year };
};

const getPreviousSeasonInfo = (): { season: string; year: number } => {
  const { season, year } = getCurrentSeasonInfo();
  if (season === "winter") {
    return { season: "fall", year: year - 1 };
  } else if (season === "spring") {
    return { season: "winter", year };
  } else if (season === "summer") {
    return { season: "spring", year };
  } else {
    return { season: "summer", year };
  }
};

export { getCurrentSeasonInfo, getPreviousSeasonInfo };
