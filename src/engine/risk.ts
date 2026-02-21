export type RiskCategory = "Healthy Growth" | "Slow Drift" | "Stagnation Risk" | "Poverty Creep";

export interface RiskInput {
    realCagr: number;
    expenseGrowthRatio: number; // 0 to 1, or > 1 if expenses outpace income
    debtRatio: number; // 0 to 1 (EMI / Income)
    sectorVulnerability: number; // 0 to 1
}

export interface RiskResult {
    score: number;
    category: RiskCategory;
}

const WEIGHTS = {
    inflationDrag: 0.3,
    savingsCompression: 0.2,
    emiBurden: 0.3,
    automationRisk: 0.2,
};

export function calculateRiskScore(input: RiskInput): RiskResult {
    // Normalize real CAGR inverse. 
    // If realCagr >= 4%, risk from this is 0. 
    // If realCagr <= -2%, risk from this is 100.
    let cagrRisk = 0;
    if (input.realCagr <= -2) {
        cagrRisk = 100;
    } else if (input.realCagr < 4) {
        cagrRisk = 100 - ((input.realCagr + 2) / 6) * 100;
    }

    // Normalize expense growth (1.0 = 100% risk)
    const expenseRisk = Math.min(input.expenseGrowthRatio * 100, 100);

    // Normalize debt ratio (0.5 = 50% DTI = 100 risk)
    const emiRisk = Math.min((input.debtRatio / 0.5) * 100, 100);

    // Automation risk is 0 to 100 based on sector vulnerability
    const automationRisk = input.sectorVulnerability * 100;

    const score = Math.round(
        (WEIGHTS.inflationDrag * cagrRisk) +
        (WEIGHTS.savingsCompression * expenseRisk) +
        (WEIGHTS.emiBurden * emiRisk) +
        (WEIGHTS.automationRisk * automationRisk)
    );

    let category: RiskCategory = "Healthy Growth";
    if (score > 75) category = "Poverty Creep";
    else if (score > 50) category = "Stagnation Risk";
    else if (score > 25) category = "Slow Drift";

    return { score, category };
}
