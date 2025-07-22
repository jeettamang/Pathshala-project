export const getFiscalYear = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  let startYear, endYear;
  if (month >= 6) {
    startYear = year;
    endYear = year + 1;
  } else {
    startYear = year - 1;
    endYear = year;
  }

  return {
    label: `FY${startYear}-${String(endYear).slice(-2)}`,
    start: new Date(startYear, 6, 1),
    end: new Date(endYear, 5, 30),
  };
};
