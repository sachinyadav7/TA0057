
# 📊 StagnationScanner

## Real Wage Decline Alert System

> **“Your Salary Is Growing. Your Life Might Not Be.”**


## 🚀 Overview

StagnationScanner is a financial diagnostic engine that detects hidden wage stagnation by adjusting salary history for inflation and calculating real purchasing power trends.

Most professionals track nominal salary growth.
Very few understand real income growth.

StagnationScanner reveals:

* Real income trajectory
* Purchasing power erosion
* Financial stagnation risk
* Career pivot recommendations

This is not a budgeting app.
This is a **financial trajectory scanner.**

## 🎯 Problem Statement

Despite receiving annual raises, many working professionals experience:

* Savings stagnation
* EMI stress
* Reduced lifestyle growth
* Delayed wealth accumulation

The reason?

**Inflation-adjusted income is often declining.**

There is currently no simple tool in India that:

* Adjusts salary history using CPI data
* Detects real wage stagnation
* Quantifies poverty creep
* Suggests actionable career pivots


## 💡 Solution

StagnationScanner analyzes salary history using official CPI data and computes:

* Real income (inflation-adjusted)
* Real CAGR
* Divergence Index
* Stagnation Risk Score
* Escape Route Recommendations

It transforms macroeconomic inflation data into **personal financial insight.**


## 🔥 Key Features

### 1️⃣ Inflation-Adjusted Salary Engine

* Converts nominal salary into real salary
* Uses RBI CPI data
* Year-by-year adjustment


### 2️⃣ Real vs Nominal Growth Visualization

* Dual-line graph comparison
* Erosion zone highlighting
* Break-even detection


### 3️⃣ Financial Stagnation Risk Score

* Risk score (0–100)
* Categories:

  * Healthy Growth
  * Slow Drift
  * Stagnation Risk
  * Poverty Creep

### 4️⃣ Turning Point Detection

* Identifies peak purchasing power year
* Detects start of real decline


### 5️⃣ Escape Route Recommendation Engine

Suggests:

* Skill Upgrade
* City Relocation
* Role Transition

Each includes:

* Expected salary increase
* ROI calculation
* Transition time
* Probability of success


### 6️⃣ Personalized Report Export

* PDF summary
* Career insights
* Risk analysis
* Salary comparison charts


### 7️⃣ Secure & Privacy-First

* Local-first calculations
* No third-party trackers
* Encrypted storage (if cloud enabled)


## 🧠 How It Works

```
User Input (Salary History)
        ↓
Inflation Engine (CPI Adjustment)
        ↓
Real Wage Analysis
        ↓
Risk Scoring Algorithm
        ↓
Escape Route Engine
        ↓
Personalized Career Action Plan
```


## 🏗️ Tech Stack

### Frontend

* React / Next.js
* Recharts / D3.js
* Tailwind CSS

### Backend

* Node.js / Express OR Spring Boot
* REST APIs
* JWT Authentication

### Database

* PostgreSQL
* CPI dataset integration

### Deployment

* Vercel (Frontend)
* Railway / AWS / Render (Backend)


## 📊 Risk Scoring Model

Risk Score is calculated based on:

* Real CAGR
* Inflation drag rate
* EMI burden ratio
* Sector automation exposure
* Industry growth rate

```
Risk Score =
  (Inflation Impact Weight × Real CAGR Inverse)
+ (Debt Ratio Weight)
+ (Automation Risk Weight)
```


## 🎯 Target Users

* IT Professionals
* Mid-Level Managers
* Startup Employees
* MBA Graduates
* Urban salaried workforce

Primary age group: 23–40 years

## 🌍 Impact

### Individual Level

* Financial awareness
* Better career decisions
* Data-backed salary negotiation
* Early stagnation detection

### Societal Level

* Wage transparency awareness
* Increased upskilling
* Reduced economic anxiety


## 🏆 Differentiation

| Existing Tools     | StagnationScanner           |
| ------------------ | --------------------------- |
| Expense trackers   | Real wage analysis          |
| Salary calculators | Inflation-adjusted modeling |
| Generic advice     | ROI-based pivot engine      |
| No risk scoring    | Quantified stagnation index |


## 🔮 Future Roadmap

* AI-powered career advisor
* Industry wage heatmaps
* Company transparency dashboards
* Skill gap prediction engine
* Global expansion (PPP modeling)


## 🛡️ Data & Privacy

* CPI data sourced from RBI
* No personal financial data sold
* Zero third-party trackers
* User data deletable on request


## 🧪 Hackathon Implementation Plan

### Phase 1

* Salary input
* CPI inflation adjustment
* Real wage graph

### Phase 2

* Risk scoring model
* Divergence index

### Phase 3

* Escape route engine
* Recommendation ranking
* PDF export


## 📈 Success Metrics

* 80% users understand real vs nominal difference
* 40% users explore escape routes
* High engagement in risk scoring dashboard


## 📌 Why This Matters

Inflation silently erodes the middle class.

StagnationScanner quantifies that erosion.

We are not building a finance app.

We are building a **Wage Reality Detector.**

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
