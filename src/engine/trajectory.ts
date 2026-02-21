import { calculateRealSalary } from "./inflation";

export interface SalaryPoint {
    year: number;
    nominal: number;
}

export interface TrajectoryPoint {
    year: number;
    nominal: number;
    real: number;
    divergence: number;
}

export function computeWageTrajectory(salaryHistory: SalaryPoint[]): {
    trajectory: TrajectoryPoint[];
    nominalCagr: number;
    realCagr: number;
    declineOnsetYear: number | null;
    purchasingPowerPeakYear: number;
} {
    if (salaryHistory.length === 0) {
        return { trajectory: [], nominalCagr: 0, realCagr: 0, declineOnsetYear: null, purchasingPowerPeakYear: 2014 };
    }

    const sorted = [...salaryHistory].sort((a, b) => a.year - b.year);

    let peakReal = 0;
    let purchasingPowerPeakYear = sorted[0].year;
    let declineOnsetYear: number | null = null;

    const trajectory = sorted.map((pt, index) => {
        const real = calculateRealSalary(pt.nominal, pt.year);
        if (real > peakReal) {
            peakReal = real;
            purchasingPowerPeakYear = pt.year;
        } else if (declineOnsetYear === null && index > 0) {
            // First year where real wage is lower than the previous year
            const prevReal = calculateRealSalary(sorted[index - 1].nominal, sorted[index - 1].year);
            if (real < prevReal) {
                declineOnsetYear = pt.year;
            }
        }

        return {
            year: pt.year,
            nominal: pt.nominal,
            real: Math.round(real),
            divergence: Math.round(pt.nominal - real)
        };
    });

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const years = last.year - first.year;

    let nominalCagr = 0;
    let realCagr = 0;

    if (years > 0) {
        nominalCagr = (Math.pow(last.nominal / first.nominal, 1 / years) - 1) * 100;
        const firstReal = calculateRealSalary(first.nominal, first.year);
        const lastReal = calculateRealSalary(last.nominal, last.year);
        realCagr = (Math.pow(lastReal / firstReal, 1 / years) - 1) * 100;
    }

    return {
        trajectory,
        nominalCagr,
        realCagr,
        declineOnsetYear,
        purchasingPowerPeakYear
    };
}
