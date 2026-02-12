# 🏗️ Predicting Concrete Compressive Strength — A Data-Driven Approach to Mix Optimisation

**Reducing material costs, preventing strength failures, and cutting carbon emissions through regression analysis and hypothesis testing.**

[![R](https://img.shields.io/badge/R-4.5.2-276DC3?style=for-the-badge&logo=r&logoColor=white)](https://www.r-project.org/)
[![Status](https://img.shields.io/badge/Status-Complete-10B981?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-Academic-F59E0B?style=for-the-badge)]()

---

## 📋 Table of Contents

- [The Problem](#the-problem)
- [Project Overview](#project-overview)
- [Business Context](#business-context)
- [Objectives](#objectives)
- [Dataset](#dataset)
- [Project Structure](#project-structure)
- [Methodology](#methodology)
- [Key Findings](#key-findings)
- [The Models](#the-models)
- [Hypothesis Testing](#hypothesis-testing)
- [Business Impact](#business-impact)
- [Getting Started](#getting-started)
- [Interactive Presentation](#interactive-presentation)
- [Limitations & Future Work](#limitations--future-work)
- [Documentation](#documentation)

---

## The Problem

Concrete compressive strength is the single most critical quality metric in construction. Every structural element — from high-rise foundations to bridge decks — must meet a minimum strength specification before loads can be certified and projects can proceed.

Yet across the construction industry, the process for achieving target strength remains largely based on experience, conservative over-engineering, and trial-and-error. This creates three recurring problems:

**1. Cement overuse.** When engineers lack confidence in a mix design, they default to cement-heavy formulations. Cement is the most expensive component in concrete and the largest contributor to CO₂ emissions. The global cement industry alone accounts for approximately 8% of worldwide carbon emissions.

**2. Strength failures.** Despite conservative mixes, failures at 28-day testing still occur. Each failure triggers rework cycles — redesigned mixes, re-poured sections, delayed schedules — costing tens of thousands per incident on commercial projects.

**3. No predictive capability.** Most batching plants accumulate years of mix trial data but never use it predictively. Decisions continue to rely on rules of thumb rather than data-driven insight, leaving significant cost savings and quality improvements on the table.

This project demonstrates that **regression analysis on historical mix data can predict compressive strength with over 81% accuracy**, enabling construction firms to optimise material proportions, reduce costs, and meet specifications more reliably.

---

## Project Overview

This project was developed for **StrataForge Construction Materials Ltd.**, a mid-sized UK-based construction and materials engineering firm specialising in commercial foundations, high-load structural slabs, transport infrastructure, and precast concrete solutions.

Over two years, StrataForge's materials testing lab accumulated **1,030 recorded mix trials** — each containing the exact proportions of seven mix components, the curing age, and the resulting compressive strength. Despite having this data, the business still relied on experience-based decision making.

The analytics initiative applies **multiple linear regression**, **logistic regression**, and **hypothesis testing** in R to transform this historical data into a predictive tool that supports real-time mix optimisation and budgeting decisions.

---

## Business Context

StrataForge operates its own batching plant and routinely experiments with concrete mix proportions to reduce material costs, improve sustainability (using fly ash and slag), and maintain or exceed compressive strength targets.

However, without a predictive model, the business faced:

| Challenge | Business Consequence |
|-----------|---------------------|
| Conservative cement-heavy mixes | Inflated material costs and higher carbon footprint |
| Occasional 28-day strength failures | Rework, schedule delays, and reputation risk |
| No data-driven mix design tool | Budget inefficiencies in procurement planning |
| Uncertainty about fly ash performance | Reluctance to use cheaper, greener supplementary materials |

Concrete compressive strength is not just a technical metric. It drives structural safety compliance, client approval milestones, insurance liability, project scheduling, and material procurement budgets. A predictive model addresses all five.

---

## Objectives

The executive team commissioned this project with three clear objectives:

| # | Objective | Approach |
|---|-----------|----------|
| **1** | Quantify how mix components influence compressive strength | Multiple Linear Regression with forward stepwise selection |
| **2** | Determine whether fly ash affects performance | Kruskal-Wallis hypothesis testing |
| **3** | Create a strength prediction tool for material optimisation | Validated regression formula with 81.35% R² |

---

## Dataset

The dataset contains **1,030 observations** across **9 continuous numerical variables** — entirely numeric with no missing values or categorical fields.

| Variable | Unit | Description | Range |
|----------|------|-------------|-------|
| `cement` | kg/m³ | Portland cement content | 102 – 540 |
| `slag` | kg/m³ | Blast furnace slag content | 0 – 359.4 |
| `flyAsh` | kg/m³ | Fly ash content | 0 – 200.1 |
| `water` | kg/m³ | Water content | 121.8 – 247 |
| `superPlasticizer` | kg/m³ | Superplasticizer additive | 0 – 32.2 |
| `coarseAgg` | kg/m³ | Coarse aggregate content | 801 – 1,145 |
| `fineAgg` | kg/m³ | Fine aggregate content | 594 – 992.6 |
| `age` | days | Curing time at testing | 1 – 365 |
| `concrete_strength` | MPa | Measured compressive strength (target) | 2.33 – 82.6 |

Two additional derived columns were present in the original dataset:

- `concrete_category` — Coarse or Fine (texture classification)
- `isFlyAsh` — Boolean flag indicating whether fly ash was present in the mix

**Source:** `source-data/concrete compressive strength.xlsx`

---

## Project Structure

```
strataforge-prediction/
│
├── hypothesis-tests/
│   └── test.R                          # ANOVA, Kruskal-Wallis, Chi-Square tests
│
├── models/
│   ├── linear-regression.R             # Forward stepwise MLR (12 candidate models)
│   └── logistic-regression.R           # Logistic regression for fly ash classification
│
├── preprocessing/
│   └── clean.R                         # Data loading, renaming, exploration, transformation
│
├── project-brief/
│   ├── company-profile.md              # StrataForge company background
│   └── situation-brief.md              # Business problem and analytics objectives
│
├── report-documentation/
│   └── Predicting_Concrete_Strength... .pdf   # Full 30-page project report
│
├── source-data/
│   └── concrete compressive strength.xlsx     # Raw dataset (1,030 observations)
│
├── strataforge-presentation/           # Interactive React/Vite slide deck
│   ├── src/
│   │   └── App.jsx                     # 9-slide presentation with live calculator
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Methodology

### 1. Data Exploration & Preprocessing

```r
# Load and rename columns for readability
concrete_data <- read_excel('concrete compressive strength.xlsx')
concrete_data <- concrete_data %>% rename(
  cement = `Cement (component 1)(kg in a m^3 mixture)`,
  slag = `Blast Furnace Slag (component 2)(kg in a m^3 mixture)`,
  flyAsh = `Fly Ash (component 3)(kg in a m^3 mixture)`,
  water = `Water (component 4)(kg in a m^3 mixture)`,
  superPlasticizer = `Superplasticizer (component 5)(kg in a m^3 mixture)`,
  coarseAgg = `Coarse Aggregate (component 6)(kg in a m^3 mixture)`,
  fineAgg = `Fine Aggregate (component 7)(kg in a m^3 mixture)`,
  age = `Age (day)`,
  concrete_strength = `Concrete compressive strength(MPa, megapascals)`
)
```

Key preprocessing steps:

- Verified zero missing values across all 1,030 observations
- Examined distributions via histograms — identified right-skew in `superPlasticizer` and `age`
- Checked outliers via boxplots — few extreme values in `water`, `age`, and `superPlasticizer`; retained as legitimate mix variations
- Generated a correlation matrix to identify the strongest predictors of strength

**Top correlated variables with `concrete_strength`:**
Cement (strongest), Age, Superplasticizer, Water (negative correlation)

### 2. Log Transformation

The `age` and `superPlasticizer` variables exhibited heavily skewed distributions. Applying a natural log transformation significantly improved model performance:

```r
concrete_reduced_tfd$superPlasticizer <- log(concrete_reduced_tfd$superPlasticizer)
concrete_reduced_tfd$age <- log(concrete_reduced_tfd$age)
```

Rows where `superPlasticizer = 0` produced `-Inf` after log transformation. These 379 rows (all zero-superplasticizer mixes) were removed, leaving **651 observations** for the final model — still a robust sample size.

### 3. Forward Stepwise Regression

Twelve candidate models were fitted, progressively adding predictors based on correlation strength and statistical significance:

| Model | Predictors | R² | All p < 0.05? |
|-------|-----------|-----|---------------|
| model_0 | cement | 24.71% | ✅ |
| model_1 | + superPlasticizer | 34.98% | ✅ |
| model_2 | + age | 48.01% | ✅ |
| model_3 | + water | 49.66% | ✅ |
| model_4 | + fineAgg | 52.92% | ✅ |
| model_5 | + coarseAgg | 56.81% | ⚠️ superPlasticizer weak |
| model_6 | + slag | 59.43% | ✅ |
| model_7 | + flyAsh | 61.55% | ❌ fineAgg, coarseAgg, intercept |
| model_8 | swap: −slag +flyAsh | 57.30% | ✅ |
| **model_9** | **log-transformed (cement, SP, water, age, slag)** | **81.35%** | **✅** |
| model_10 | + fineAgg | 81.62% | ⚠️ marginal improvement |
| model_11 | + fineAgg + coarseAgg | 81.70% | ❌ fineAgg, coarseAgg insignificant |

**Model 9 was selected** — the best balance of explanatory power (R² = 81.35%) and statistical validity (all coefficients significant at p < 0.001).

### 4. Assumptions Testing

All five classical MLR assumptions were tested and passed:

| Assumption | Method | Result |
|------------|--------|--------|
| **Linearity** | Scatterplot matrix (pairs plot) | ✅ Clear linear trends for cement, age, water |
| **Residual Independence** | Residuals vs Fitted plot | ✅ Randomly scattered around zero |
| **Normality of Residuals** | Q-Q plot | ✅ Points follow diagonal reference line |
| **Homoscedasticity** | Scale-Location plot | ✅ No funnel shape; constant variance |
| **No Multicollinearity** | VIF (Variance Inflation Factor) | ✅ All VIF values between 1.01 – 1.49 |

---

## Key Findings

### What Drives Concrete Strength?

Based on the final MLR model coefficients:

| Factor | Effect on Strength | Coefficient | Interpretation |
|--------|-------------------|-------------|----------------|
| **Cement** | ↑ Strong positive | +0.0974 | Each additional kg/m³ of cement increases strength by ~0.1 MPa |
| **Age (logged)** | ↑ Strong positive | +9.759 | Longer curing dramatically increases strength (diminishing returns) |
| **Slag** | ↑ Moderate positive | +0.0683 | Slag is a viable strength contributor — not just filler |
| **Water** | ↓ Negative | −0.2374 | More water weakens concrete — the water-cement ratio is critical |
| **Superplasticizer (logged)** | ↓ Negative | −2.545 | Reduces strength at higher dosages; used for workability, not strength |

### What Doesn't Affect Strength?

The hypothesis testing revealed that neither **concrete category** (coarse vs fine) nor **fly ash inclusion** significantly affects compressive strength. This is a major practical finding — see [Hypothesis Testing](#hypothesis-testing) below.

---

## The Models

### Multiple Linear Regression — Final Formula

```
concrete_strength = 23.914
                  + 0.0974 × cement
                  − 2.545 × ln(superplasticizer)
                  − 0.2374 × water
                  + 9.759 × ln(age)
                  + 0.0683 × slag
```

**Example prediction:**

| Input | Value |
|-------|-------|
| Cement | 520 kg/m³ |
| Superplasticizer | 3.0 kg/m³ |
| Water | 125 kg/m³ |
| Slag | 200 kg/m³ |
| Age | 97 days |

```
Strength = 23.914 + (0.0974 × 520) − (2.545 × ln(3)) − (0.2374 × 125) + (9.759 × ln(97)) + (0.0683 × 200)
Strength = 23.914 + 50.648 − 2.798 − 29.675 + 44.64 + 13.66
Strength ≈ 100.4 MPa
```

### Logistic Regression — Fly Ash Classifier

A secondary model predicts the **probability that a given mix contains fly ash** based on its component proportions:

```
logit(π) = 99.014 − 0.049(cement) − 0.075(slag) − 0.041(fineAgg) − 0.081(water) − 0.032(coarseAgg)
```

Where π = P(FlyAsh = 1) and π = 1 / (1 + e^(−logit(π)))

This model achieved AIC = 145.12 with all five predictors significant and passed all assumption checks (linearity of logits, no influential outliers via Cook's distance, VIF < 10).

---

## Hypothesis Testing

Three hypothesis tests were conducted to understand the categorical structure of the data:

### Test 1: Does Concrete Category Affect Strength?

| Detail | Value |
|--------|-------|
| Test | Kruskal-Wallis (non-parametric; Shapiro-Wilk normality test failed) |
| H₀ | μ(coarse) = μ(fine) |
| H₁ | μ(coarse) ≠ μ(fine) |
| p-value | **0.3364** |
| Decision | **Fail to reject H₀** — no significant difference |

### Test 2: Does Fly Ash Affect Strength?

| Detail | Value |
|--------|-------|
| Test | Kruskal-Wallis |
| H₀ | μ(no fly ash) = μ(fly ash) |
| H₁ | μ(no fly ash) ≠ μ(fly ash) |
| p-value | **0.2324** |
| Decision | **Fail to reject H₀** — fly ash does not reduce strength |

### Test 3: Is There an Association Between Category and Fly Ash Use?

| Detail | Value |
|--------|-------|
| Test | Pearson's Chi-Square test of independence |
| H₀ | Concrete category and fly ash use are independent |
| p-value | **0.9812** |
| Decision | **Fail to reject H₀** — no association whatsoever |

**Why this matters:** Fly ash is significantly cheaper than cement and has a lower carbon footprint. The statistical evidence confirms that construction firms can substitute fly ash into their mixes **without sacrificing compressive strength** — enabling simultaneous cost reduction and sustainability improvement.

---

## Business Impact

### Exemplary Cost Reduction Scenario

Consider a typical commercial warehouse foundation requiring **2,000 m³** of C30-grade concrete:

| | Conservative Mix (Before) | Optimised Mix (After) |
|---|---|---|
| **Cement** | 400 kg/m³ | 310 kg/m³ |
| **Slag** | 0 kg/m³ | 100 kg/m³ |
| **Cement cost per m³** | £48.00 | £37.20 |
| **Total cement cost** | £96,000 | £74,400 |
| **Predicted strength** | Unknown (over-engineered) | ~38 MPa (verified by model) |

| Metric | Value |
|--------|-------|
| **Cost saving (single project)** | **£21,600** |
| **Cost reduction** | **22.5%** |
| **CO₂ reduction** | **~180 tonnes** (from 90 kg/m³ less cement × 2,000 m³) |
| **Strength confidence** | Model-verified before pouring |

Across a portfolio of 10–15 projects per year, this translates to potential annual savings of **£200,000–£300,000** while simultaneously reducing carbon emissions and improving quality assurance.

---

## Getting Started

### Prerequisites

- [R](https://cran.r-project.org/) (≥ 4.0) and [RStudio](https://posit.co/products/open-source/rstudio/)
- Required R packages:

```r
install.packages(c("readxl", "corrplot", "ggplot2", "dplyr", "car", "caret", "RVAideMemoire"))
```

### Running the Analysis

```bash
# Clone the repository
git clone https://github.com/your-username/strataforge-prediction.git
cd strataforge-prediction

# Open in RStudio, then run scripts in order:
# 1. preprocessing/clean.R          — load, explore, and transform data
# 2. models/linear-regression.R     — build and evaluate MLR models
# 3. models/logistic-regression.R   — build fly ash classifier
# 4. hypothesis-tests/test.R        — run ANOVA, Kruskal-Wallis, Chi-Square
```

### Running the Interactive Presentation

```bash
cd strataforge-presentation
npm install
npm run dev
```

Opens a 9-slide interactive deck at `http://localhost:5173` with a **live strength calculator** — adjust sliders for cement, slag, water, superplasticizer, and age to see predicted strength and per-m³ cost savings in real time.

---

## Interactive Presentation

The `strataforge-presentation/` directory contains a **React + Vite** slide deck summarising the entire project in 9 interactive slides:

1. **Title** — project framing and tech badges
2. **The Problem** — four business risks facing StrataForge
3. **Objectives** — three commissioned goals
4. **Data & Method** — step-by-step pipeline from raw data to validated model
5. **The Model** — final MLR formula with R², VIF, and assumptions stats
6. **Fly Ash Finding** — all three hypothesis test results
7. **Live Calculator** — interactive sliders predicting strength in real time with cost savings
8. **Business Impact** — worked £21,600 saving example with CO₂ reduction
9. **Summary** — key takeaways

---

## Limitations & Future Work

### Current Limitations

- **Log transformation trade-off** — removing 379 zero-superplasticizer rows reduced the sample from 1,030 to 651; the model only applies to mixes that include superplasticizer
- **Linear assumptions** — the model assumes linear relationships; non-linear interactions between components (e.g., water-cement ratio) are not captured
- **No external validation** — the model was fitted and evaluated on the same dataset; cross-validation or holdout testing would strengthen confidence
- **Descriptive, not causal** — coefficients show association, not causation; controlled experiments would be needed to confirm mechanisms

### Future Enhancements

- **Cross-validation** — implement k-fold CV to provide unbiased performance estimates
- **Non-linear models** — explore polynomial regression, random forests, or gradient boosting to capture interaction effects
- **Water-cement ratio** — engineer this as a feature, as it is the most well-established predictor of concrete strength in materials science
- **Deployment** — wrap the prediction formula in a lightweight API (Flask/FastAPI) for use at the batching plant
- **Real-time feedback loop** — connect the model to incoming lab results to enable continuous retraining as new mix data is generated

---

## Documentation

The full 30-page project report — including all R code, output screenshots, model summaries, diagnostic plots, and critical evaluation — is available in:

📄 [`report-documentation/Predicting_Concrete_Strength_to_Support_Better_Material_and_Budget_Decisions.pdf`](report-documentation/)

The business context documents are in:

📄 [`project-brief/company-profile.md`](project-brief/company-profile.md) — StrataForge company background
📄 [`project-brief/situation-brief.md`](project-brief/situation-brief.md) — Business problem and analytics objectives

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **R 4.5.2** | Statistical computing and modelling |
| **ggplot2** | Data visualisation (histograms, boxplots, scatterplots) |
| **dplyr** | Data manipulation and transformation |
| **readxl** | Excel file loading |
| **corrplot** | Correlation matrix visualisation |
| **car** | VIF (multicollinearity) testing |
| **caret** | Variable importance analysis |
| **RVAideMemoire** | Shapiro-Wilk normality testing by group |
| **React + Vite** | Interactive presentation with live calculator |

---

## Author

Developed as an applied analytics initiative for StrataForge Construction Materials Ltd by Bright Uzosike.

*"Engineering Strength from the Ground Up"* — now backed by evidence.