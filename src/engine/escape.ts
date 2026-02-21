export type EscapePathType = "Skill Upgrade" | "City Relocation" | "Role Switch";

export interface EscapePath {
    type: EscapePathType;
    title: string;
    salaryDelta: number;
    timeToTransitionMonths: number;
    riskRating: "Low" | "Medium" | "High";
    requiredSkills: string[];
    recommendedPlatforms: string[];
    investmentCost: number;
    successProbability: number; // 0 to 1
    roiScore: number;
    paybackPeriodMonths: number;
}

export interface EscapeInput {
    currentRealSalary: number;
    sector: string;
    currentRole: string;
}

export function generateEscapeRoutes(input: EscapeInput): EscapePath[] {
    // Mock logic: This would ideally ping an API fetching real market bounds.
    // We use heuristics for the hackathon product to demonstrate the feature.

    const routes: EscapePath[] = [];

    // Skill Upgrade
    const skillInvestment = 50000; // rs
    const skillDelta = input.currentRealSalary * 0.25; // +25%
    routes.push({
        type: "Skill Upgrade",
        title: `Advanced Certifications in ${input.sector}`,
        salaryDelta: Math.round(skillDelta),
        timeToTransitionMonths: 6,
        riskRating: "Low",
        requiredSkills: ["AI Integration", "Advanced Analytics", "Management"],
        recommendedPlatforms: ["Coursera", "Udacity", "UpGrad"],
        investmentCost: skillInvestment,
        successProbability: 0.85,
        roiScore: parseFloat((((skillDelta) / skillInvestment) * 0.85).toFixed(2)),
        paybackPeriodMonths: parseFloat((skillInvestment / (skillDelta / 12)).toFixed(1)),
    });

    // City Relocation
    const relocationCost = 150000;
    const relocationDelta = input.currentRealSalary * 0.45; // +45% in tier 1 hub
    routes.push({
        type: "City Relocation",
        title: "Move to Tier-1 Tech/Finance Hubs",
        salaryDelta: Math.round(relocationDelta),
        timeToTransitionMonths: 3,
        riskRating: "Medium",
        requiredSkills: ["Adaptability", "Networking"],
        recommendedPlatforms: ["LinkedIn", "Housing.com", "Naukri"],
        investmentCost: relocationCost,
        successProbability: 0.65,
        roiScore: parseFloat((((relocationDelta) / relocationCost) * 0.65).toFixed(2)),
        paybackPeriodMonths: parseFloat((relocationCost / (relocationDelta / 12)).toFixed(1)),
    });

    // Role Switch
    const switchCost = 80000; // Bootcamps or interim salary loss
    const switchDelta = input.currentRealSalary * 0.60;
    routes.push({
        type: "Role Switch",
        title: "Pivot to High-Growth Adjacent Role",
        salaryDelta: Math.round(switchDelta),
        timeToTransitionMonths: 9,
        riskRating: "High",
        requiredSkills: ["Cross-functional alignment", "Technical Deep Dive", "Product Sense"],
        recommendedPlatforms: ["Bootcamps", "Mentorship", "AngelList"],
        investmentCost: switchCost,
        successProbability: 0.45,
        roiScore: parseFloat((((switchDelta) / switchCost) * 0.45).toFixed(2)),
        paybackPeriodMonths: parseFloat((switchCost / (switchDelta / 12)).toFixed(1)),
    });

    // Rank by ROI
    return routes.sort((a, b) => b.roiScore - a.roiScore);
}
