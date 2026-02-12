import { useState, useEffect, useRef } from "react";

const SLIDES = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "problem",
    label: "The Problem",
  },
  {
    id: "objectives",
    label: "Objectives",
  },
  {
    id: "data",
    label: "Data & Method",
  },
  {
    id: "model",
    label: "The Model",
  },
  {
    id: "flyash",
    label: "Fly Ash Finding",
  },
  {
    id: "calculator",
    label: "Live Calculator",
  },
  {
    id: "impact",
    label: "Business Impact",
  },
  {
    id: "summary",
    label: "Summary",
  },
];

// --- Utility components ---

const GrainOverlay = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999,
      opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

const Badge = ({ children, color = "#F59E0B" }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 14px",
      borderRadius: "100px",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      background: color + "18",
      color: color,
      border: `1px solid ${color}40`,
    }}
  >
    {children}
  </span>
);

const StatCard = ({ value, label, unit, accent = "#F59E0B" }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px",
      padding: "28px 24px",
      textAlign: "center",
      flex: 1,
      minWidth: 140,
    }}
  >
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "36px",
        fontWeight: 500,
        color: accent,
        lineHeight: 1.1,
      }}
    >
      {value}
      {unit && (
        <span style={{ fontSize: "16px", opacity: 0.6, marginLeft: 2 }}>
          {unit}
        </span>
      )}
    </div>
    <div
      style={{
        marginTop: 10,
        fontSize: "12px",
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.4)",
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  </div>
);

const FormulaBlock = ({ children }) => (
  <div
    style={{
      background: "rgba(0,0,0,0.35)",
      border: "1px solid rgba(245,158,11,0.15)",
      borderRadius: "12px",
      padding: "20px 28px",
      fontFamily: "'DM Mono', monospace",
      fontSize: "14px",
      color: "#F5D990",
      lineHeight: 1.8,
      overflowX: "auto",
      whiteSpace: "pre-wrap",
    }}
  >
    {children}
  </div>
);

const SectionDivider = () => (
  <div
    style={{
      width: 60,
      height: 3,
      background:
        "linear-gradient(90deg, #F59E0B, rgba(245,158,11,0.1))",
      borderRadius: 2,
      marginBottom: 20,
    }}
  />
);

// --- Slide Content Components ---

function TitleSlide({ visible }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        padding: "60px 10vw",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(245,158,11,0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(245,158,11,0.03)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <Badge>StrataForge Construction Materials Ltd.</Badge>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 700,
          color: "#FAFAF9",
          lineHeight: 1.15,
          marginTop: 28,
          marginBottom: 16,
          maxWidth: 700,
        }}
      >
        Predicting Concrete{" "}
        <span style={{ color: "#F59E0B" }}>Strength</span>
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "18px",
          color: "rgba(255,255,255,0.45)",
          maxWidth: 520,
          lineHeight: 1.6,
        }}
      >
        Using regression analysis to support better material decisions,
        reduce waste, and cut procurement costs.
      </p>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {["R Language", "Regression", "Hypothesis Testing"].map((t) => (
          <span
            key={t}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.5px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    {
      icon: "💰",
      title: "Cement Overuse",
      desc: 'Conservative "safe" mixes inflate material costs by over-specifying cement content.',
    },
    {
      icon: "⚠️",
      title: "Strength Failures",
      desc: "Occasional failures at 28-day testing require costly rework and delay timelines.",
    },
    {
      icon: "📊",
      title: "No Predictive Tool",
      desc: "Decisions relied on experience and trial-and-error, not data-driven insight.",
    },
    {
      icon: "🌍",
      title: "Carbon Targets",
      desc: "Excess cement usage undermines sustainability goals and carbon commitments.",
    },
  ];
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#EF4444">The Business Risk</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        Why This Project Matters
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 15,
          maxWidth: 540,
          lineHeight: 1.6,
          marginBottom: 32,
        }}
      >
        Over 18 years of operations, StrataForge accumulated 1,030 mix
        trials — but still relied on gut feeling for critical strength
        decisions.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {problems.map((p) => (
          <div
            key={p.title}
            style={{
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.1)",
              borderRadius: 14,
              padding: "24px 20px",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#FAFAF9",
                marginBottom: 6,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.55,
              }}
            >
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObjectivesSlide() {
  const objectives = [
    {
      num: "01",
      title: "Quantify Influence",
      desc: "Determine how each mix component (cement, slag, water, age, etc.) affects compressive strength using multiple linear regression.",
      color: "#F59E0B",
    },
    {
      num: "02",
      title: "Fly Ash Impact",
      desc: "Test whether including fly ash in a mix significantly affects compressive strength using hypothesis testing (Kruskal-Wallis).",
      color: "#10B981",
    },
    {
      num: "03",
      title: "Prediction Tool",
      desc: "Build a reliable regression model that the batching plant can use to predict strength before pouring — optimising cost and reducing failures.",
      color: "#6366F1",
    },
  ];
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge>Project Scope</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 32,
        }}
      >
        Three Clear Objectives
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {objectives.map((o) => (
          <div
            key={o.num}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 14,
              padding: "24px 24px",
              borderLeft: `3px solid ${o.color}`,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 28,
                fontWeight: 700,
                color: o.color,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {o.num}
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#FAFAF9",
                  marginBottom: 4,
                }}
              >
                {o.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                {o.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataSlide() {
  const steps = [
    "1,030 mix trials loaded — entirely numeric, no missing values",
    "Columns renamed for clarity (cement, slag, flyAsh, water, etc.)",
    "Distributions checked via histograms; outliers assessed with boxplots",
    "Correlation matrix identified 4 key predictors: cement, water, superplasticizer, age",
    "Log transformation applied to age & superplasticizer to handle skew",
    "Forward stepwise regression used to build model iteratively",
    "Assumptions tested: linearity, residual independence, normality, homoscedasticity, VIF",
  ];
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#6366F1">Methodology</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 12,
        }}
      >
        Data & Approach
      </h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28, maxWidth: 520, lineHeight: 1.6 }}>
        The IMF-style rigour applied to concrete: clean data in, validated model out.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "10px 0",
              borderBottom:
                i < steps.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background:
                  i === steps.length - 1
                    ? "rgba(99,102,241,0.2)"
                    : "rgba(255,255,255,0.05)",
                border:
                  i === steps.length - 1
                    ? "1px solid rgba(99,102,241,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color:
                  i === steps.length - 1
                    ? "#818CF8"
                    : "rgba(255,255,255,0.3)",
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.5,
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelSlide() {
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#10B981">Final MLR Model</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 36px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        The Prediction Formula
      </h2>
      <FormulaBlock>
        {`strength = 23.914
  + 0.0974 × cement
  − 2.545 × ln(superplasticizer)
  − 0.2374 × water
  + 9.759 × ln(age)
  + 0.0683 × slag`}
      </FormulaBlock>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 28,
        }}
      >
        <StatCard value="81.35" unit="%" label="R² Explained" accent="#10B981" />
        <StatCard value="5/5" label="Assumptions Passed" accent="#F59E0B" />
        <StatCard value="<1.5" label="All VIF Values" accent="#6366F1" />
      </div>
      <p
        style={{
          marginTop: 24,
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.6,
          maxWidth: 560,
        }}
      >
        After log-transforming skewed predictors and using forward stepwise
        selection across 12 candidate models, Model 9 achieved the best
        balance of explanatory power and statistical validity — all
        coefficients significant at p &lt; 0.001.
      </p>
    </div>
  );
}

function FlyAshSlide() {
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#10B981">Hypothesis Testing</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 36px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        Fly Ash Does <span style={{ color: "#10B981" }}>Not</span> Reduce Strength
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        {[
          {
            test: "Kruskal-Wallis",
            hypothesis: "H₀: μ(no fly ash) = μ(fly ash)",
            result: "p = 0.2324 → Fail to reject H₀",
            verdict: "No significant difference in strength",
            color: "#10B981",
          },
          {
            test: "Kruskal-Wallis",
            hypothesis: "H₀: μ(coarse) = μ(fine)",
            result: "p = 0.3364 → Fail to reject H₀",
            verdict: "Concrete category doesn't affect strength",
            color: "#F59E0B",
          },
          {
            test: "Chi-Square",
            hypothesis: "H₀: Category and fly ash are independent",
            result: "p = 0.9812 → Fail to reject H₀",
            verdict: "No association between category & fly ash use",
            color: "#6366F1",
          },
        ].map((t) => (
          <div
            key={t.test + t.hypothesis}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderLeft: `3px solid ${t.color}`,
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: t.color, fontWeight: 700 }}>{t.test}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{t.hypothesis}</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>{t.result}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#FAFAF9" }}>{t.verdict}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 530 }}>
        This is a major finding: StrataForge can confidently substitute part of
        its cement content with fly ash — achieving the same strength while
        cutting costs and carbon emissions.
      </p>
    </div>
  );
}

function CalculatorSlide() {
  const [cement, setCement] = useState(350);
  const [sp, setSp] = useState(8);
  const [water, setWater] = useState(170);
  const [age, setAge] = useState(28);
  const [slag, setSlag] = useState(100);

  const predicted =
    23.914 +
    0.0974 * cement -
    2.545 * Math.log(sp || 1) -
    0.2374 * water +
    9.759 * Math.log(age || 1) +
    0.0683 * slag;

  // Cost comparison: baseline vs optimised
  const baselineCement = 400;
  const cementCostPerKg = 0.12; // £/kg approx
  const savingPerM3 = ((baselineCement - cement) * cementCostPerKg).toFixed(2);

  const sliders = [
    { label: "Cement", value: cement, set: setCement, min: 100, max: 540, unit: "kg/m³", color: "#F59E0B" },
    { label: "Slag", value: slag, set: setSlag, min: 0, max: 360, unit: "kg/m³", color: "#10B981" },
    { label: "Water", value: water, set: setWater, min: 120, max: 250, unit: "kg/m³", color: "#3B82F6" },
    { label: "Superplasticizer", value: sp, set: setSp, min: 1, max: 32, unit: "kg/m³", color: "#A855F7" },
    { label: "Age", value: age, set: setAge, min: 1, max: 365, unit: "days", color: "#EF4444" },
  ];

  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#F59E0B">Interactive Demo</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(24px, 3vw, 32px)",
          color: "#FAFAF9",
          marginTop: 14,
          marginBottom: 24,
        }}
      >
        Strength Prediction Tool
      </h2>

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        {/* Sliders */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 14 }}>
          {sliders.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: s.color, fontWeight: 600 }}>
                  {s.value} {s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: s.color,
                  height: 6,
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>

        {/* Result */}
        <div
          style={{
            flex: "1 1 220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(245,158,11,0.04)",
            border: "1px solid rgba(245,158,11,0.12)",
            borderRadius: 20,
            padding: "32px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.3)", marginBottom: 8, fontWeight: 700 }}>
            Predicted Strength
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 52,
              fontWeight: 700,
              color: predicted >= 35 ? "#10B981" : predicted >= 25 ? "#F59E0B" : "#EF4444",
              lineHeight: 1,
            }}
          >
            {predicted.toFixed(1)}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>MPa</div>

          <div
            style={{
              marginTop: 24,
              padding: "12px 18px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: 10,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              vs 400 kg/m³ cement baseline
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 20,
                color: Number(savingPerM3) > 0 ? "#10B981" : "#EF4444",
                fontWeight: 600,
              }}
            >
              {Number(savingPerM3) > 0 ? "+" : ""}£{savingPerM3}
              <span style={{ fontSize: 12, opacity: 0.5 }}> /m³ saved</span>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 14, lineHeight: 1.5 }}>
            {predicted >= 35 ? "✅ Meets C25/30 specification" : predicted >= 25 ? "⚠️ Borderline — verify target spec" : "❌ Below typical structural threshold"}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactSlide() {
  return (
    <div style={{ padding: "60px 10vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Badge color="#10B981">Business Impact</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 36px)",
          color: "#FAFAF9",
          marginTop: 16,
          marginBottom: 12,
        }}
      >
        Exemplary Cost Reduction
      </h2>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28, maxWidth: 540, lineHeight: 1.6 }}>
        Consider a typical StrataForge project: a commercial warehouse
        foundation requiring 2,000 m³ of C30-grade concrete.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <div
          style={{
            flex: "1 1 260px",
            background: "rgba(239,68,68,0.04)",
            border: "1px solid rgba(239,68,68,0.1)",
            borderRadius: 14,
            padding: "24px",
          }}
        >
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#EF4444", fontWeight: 700, marginBottom: 12 }}>
            Before — Conservative Mix
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            Cement: <strong style={{ color: "#FAFAF9" }}>400 kg/m³</strong>
            <br />
            Slag: <strong style={{ color: "#FAFAF9" }}>0 kg</strong>
            <br />
            Cost: <strong style={{ color: "#FAFAF9" }}>£48.00/m³</strong> cement alone
            <br />
            Total cement cost: <strong style={{ color: "#EF4444" }}>£96,000</strong>
          </div>
        </div>
        <div
          style={{
            flex: "1 1 260px",
            background: "rgba(16,185,129,0.04)",
            border: "1px solid rgba(16,185,129,0.12)",
            borderRadius: 14,
            padding: "24px",
          }}
        >
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#10B981", fontWeight: 700, marginBottom: 12 }}>
            After — Model-Optimised Mix
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            Cement: <strong style={{ color: "#FAFAF9" }}>310 kg/m³</strong>
            <br />
            Slag: <strong style={{ color: "#FAFAF9" }}>100 kg/m³</strong>
            <br />
            Cost: <strong style={{ color: "#FAFAF9" }}>£37.20/m³</strong> cement alone
            <br />
            Total cement cost: <strong style={{ color: "#10B981" }}>£74,400</strong>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.15)",
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
            Saving on this single project
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 32, fontWeight: 700, color: "#10B981" }}>
            £21,600
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, color: "#F59E0B", fontWeight: 600 }}>22.5%</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>Cost reduction</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, color: "#F59E0B", fontWeight: 600 }}>~38 MPa</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>Predicted strength</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, color: "#F59E0B", fontWeight: 600 }}>−180t</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>CO₂ reduced</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySlide() {
  return (
    <div
      style={{
        padding: "60px 10vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <Badge>Key Takeaways</Badge>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 3.5vw, 40px)",
          color: "#FAFAF9",
          marginTop: 20,
          marginBottom: 32,
          maxWidth: 500,
        }}
      >
        Data Replaces Guesswork
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxWidth: 480,
          width: "100%",
        }}
      >
        {[
          "Cement and curing age are the strongest drivers of strength",
          "Fly ash does not reduce performance — use it confidently",
          "The model captures 81.35% of strength variability",
          "Potential to save £20k+ per major project through optimised mixes",
          "Reduced carbon footprint from lower cement dependency",
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              textAlign: "left",
              padding: "12px 18px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#F59E0B",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: 32,
          fontSize: 13,
          color: "rgba(255,255,255,0.25)",
          fontStyle: "italic",
          maxWidth: 400,
        }}
      >
        "Engineering Strength from the Ground Up" — now backed by evidence.
      </p>
    </div>
  );
}

// --- Main Presentation Component ---

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (index) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const next = () => goTo(Math.min(currentSlide + 1, SLIDES.length - 1));
  const prev = () => goTo(Math.max(currentSlide - 1, 0));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const slideComponents = [
    <TitleSlide />,
    <ProblemSlide />,
    <ObjectivesSlide />,
    <DataSlide />,
    <ModelSlide />,
    <FlyAshSlide />,
    <CalculatorSlide />,
    <ImpactSlide />,
    <SummarySlide />,
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#0C0C0C",
        fontFamily: "'DM Sans', sans-serif",
        color: "#FAFAF9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <GrainOverlay />

      {/* Slide container */}
      <div
        style={{
          width: "100%",
          minHeight: 540,
          flex: 1,
          position: "relative",
          background: "rgba(255,255,255,0.015)",
          border: "none",
          borderRadius: 0,
          overflow: "hidden",
          margin: "0",
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {slideComponents[currentSlide]}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 0,
          padding: "16px 0",
          marginBottom: 0,
        }}
      >
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            color: currentSlide === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
            padding: "10px 18px",
            cursor: currentSlide === 0 ? "default" : "pointer",
            fontSize: 14,
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          ← Prev
        </button>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6 }}>
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={s.label}
              style={{
                width: i === currentSlide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentSlide ? "#F59E0B" : "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={currentSlide === SLIDES.length - 1}
          style={{
            background:
              currentSlide === SLIDES.length - 1
                ? "rgba(255,255,255,0.05)"
                : "rgba(245,158,11,0.12)",
            border:
              currentSlide === SLIDES.length - 1
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(245,158,11,0.25)",
            borderRadius: 10,
            color:
              currentSlide === SLIDES.length - 1
                ? "rgba(255,255,255,0.15)"
                : "#F59E0B",
            padding: "10px 18px",
            cursor:
              currentSlide === SLIDES.length - 1 ? "default" : "pointer",
            fontSize: 14,
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          Next →
        </button>
      </div>

      {/* Slide label */}
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        {currentSlide + 1} / {SLIDES.length} — {SLIDES[currentSlide].label}
      </div>
    </div>
  );
}