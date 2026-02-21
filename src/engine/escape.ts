export type EscapePathType = "Skill Upgrade" | "City Relocation" | "Role Switch";

export interface RoadmapStep {
    phase: string;
    monthRange: string;
    description: string;
    actionItems: string[];
}

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
    roadmapSteps: RoadmapStep[];
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
        roadmapSteps: [
            {
                phase: "Skill Acquisition",
                monthRange: "Months 1-3",
                description: "Enroll in a specialized certification program focusing on direct market gaps.",
                actionItems: ["Complete primary Coursera/Udacity track", "Build 2 portfolio projects demonstrating new skills"]
            },
            {
                phase: "Market Positioning",
                monthRange: "Months 4-5",
                description: "Rewrite resume and LinkedIn to highlight the new certification as core competency.",
                actionItems: ["Update LinkedIn headline & summary", "Network with 15 professionals in target role"]
            },
            {
                phase: "Interview & Transition",
                monthRange: "Month 6",
                description: "Aggressively apply to roles demanding the target skill.",
                actionItems: ["Apply to 50 targeted roles", "Negotiate minimum 25% bump on current base"]
            }
        ]
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
        roadmapSteps: [
            {
                phase: "Market Research & Applications",
                monthRange: "Month 1",
                description: "Identify high-paying roles in Tier-1 cities heavily compensating for your current skill set.",
                actionItems: ["Filter job boards exclusively by Tier-1 locations", "Begin remote interview processes"]
            },
            {
                phase: "Logistics Planning",
                monthRange: "Month 2",
                description: "Secure the offer and negotiate relocation assistance if possible. Plan the physical move.",
                actionItems: ["Sign offer with location premium", "Budget 1.5L INR for deposit and moving costs"]
            },
            {
                phase: "Execution & Stabilization",
                monthRange: "Month 3",
                description: "Relocate and establish new base while adjusting to the higher cost of living vs. higher nominal pay.",
                actionItems: ["Finalize housing", "Recalculate monthly budget with new real delta"]
            }
        ]
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
        roadmapSteps: [
            {
                phase: "Skill Audit & Gap Analysis",
                monthRange: "Months 1-2",
                description: "Identify the overlap between your current role and the target high-growth role.",
                actionItems: ["Map transferable skills", "Identify critical technical gaps requiring a bootcamp"]
            },
            {
                phase: "Intensive Upskilling",
                monthRange: "Months 3-6",
                description: "Commit to an intensive bootcamp or prolonged self-study routine.",
                actionItems: ["Complete core curriculum", "Build a capstone project solving a real industry problem"]
            },
            {
                phase: "Lateral Movement & Networking",
                monthRange: "Months 7-9",
                description: "Leverage existing industry connections to attempt a lateral move rather than starting at entry-level.",
                actionItems: ["Pitch internal lateral move at current company", "Leverage alumni networks for warm referrals"]
            }
        ]
    });

    // Rank by ROI
    return routes.sort((a, b) => b.roiScore - a.roiScore);
}
