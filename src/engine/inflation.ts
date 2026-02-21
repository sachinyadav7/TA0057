// Base year 2014 as requested
// CPI-IW or CPI-Combined estimates from 2014 to 2024
export const CPI_DATA: Record<number, number> = {
    2014: 100.0,
    2015: 104.9, // approx 4.9% inflation
    2016: 109.9, // approx 4.9%
    2017: 113.8, // approx 3.6%
    2018: 118.2, // approx 3.9%
    2019: 122.6, // approx 3.7%
    2020: 130.3, // approx 6.6%
    2021: 137.0, // approx 5.1%
    2022: 146.2, // approx 6.7%
    2023: 154.5, // approx 5.5%
    2024: 161.8, // approx 4.8%
};

/**
 * Calculates the real salary for a given nominal salary in a specific year,
 * adjusted for inflation relative to the base year (2014).
 */
export function calculateRealSalary(nominalSalary: number, year: number) {
    const cpi = CPI_DATA[year];
    if (!cpi) throw new Error(`NO CPI data for year ${year}`);
    const baseCpi = CPI_DATA[2014];
    return nominalSalary * (baseCpi / cpi);
}

/**
 * Calculates the purchasing power delta (erosion or gain).
 */
export function calculatePurchasingPowerDelta(nominalContent: number, realSalary: number) {
    return nominalContent - realSalary;
}

/**
 * Calculates inflation drag rate
 */
export function calculateInflationDragRate(year: number) {
    const currentCpi = CPI_DATA[year];
    const prevCpi = CPI_DATA[year - 1] || CPI_DATA[year];
    if (prevCpi === currentCpi) return 0;
    return ((currentCpi - prevCpi) / prevCpi) * 100;
}
