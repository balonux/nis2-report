import { useState } from "react";

const keywordData = [
  // TIER 1: Główne frazy NIS2 (wysoki wolumen)
  { keyword: "nis2", vol: 4400, trend: "+84%", cpc: "1.33", diff: 9, intent: "commercial", category: "NIS2 ogólne", priority: "A" },
  { keyword: "dyrektywa nis2", vol: 1600, trend: "+26%", cpc: "0.91", diff: 22, intent: "informational", category: "NIS2 ogólne", priority: "A" },
  { keyword: "nis2 kogo dotyczy", vol: 480, trend: "+50%", cpc: "0.85", diff: null, intent: "informational", category: "NIS2 ogólne", priority: "A" },
  { keyword: "nis2 co to jest", vol: 480, trend: "+120%", cpc: "0.68", diff: 8, intent: "informational", category: "NIS2 ogólne", priority: "B" },
  { keyword: "nis2 directive", vol: 210, trend: "+52%", cpc: "4.17", diff: 51, intent: "informational", category: "NIS2 ogólne", priority: "B" },

  // TIER 2: NIS2 implementacja / compliance
  { keyword: "nis2 compliance", vol: 170, trend: "—", cpc: "—", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "A" },
  { keyword: "wdrożenie nis2", vol: 140, trend: "+136%", cpc: "4.01", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "A" },
  { keyword: "nis2 polska ustawa", vol: 140, trend: "+24%", cpc: "1.38", diff: null, intent: "informational", category: "NIS2 compliance", priority: "B" },
  { keyword: "nis2 wymagania", vol: 90, trend: "+91%", cpc: "1.11", diff: null, intent: "informational", category: "NIS2 compliance", priority: "A" },
  { keyword: "audyt nis2", vol: 90, trend: "+91%", cpc: "2.97", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "A" },
  { keyword: "nis2 w polsce", vol: 90, trend: "+180%", cpc: "1.06", diff: null, intent: "informational", category: "NIS2 compliance", priority: "B" },
  { keyword: "szkolenie nis2", vol: 70, trend: "+180%", cpc: "1.71", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "B" },
  { keyword: "nis2 od kiedy", vol: 70, trend: "+57%", cpc: "1.03", diff: null, intent: "informational", category: "NIS2 compliance", priority: "B" },
  { keyword: "ksc nis2", vol: 40, trend: "+267%", cpc: "1.11", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "B" },
  { keyword: "dyrektywa nis2 wymagania", vol: 10, trend: "—", cpc: "1.16", diff: null, intent: "informational", category: "NIS2 compliance", priority: "C" },
  { keyword: "nis2 wdrożenie", vol: 20, trend: "+200%", cpc: "3.60", diff: null, intent: "commercial", category: "NIS2 compliance", priority: "B" },

  // TIER 3: Vulnerability Management
  { keyword: "vulnerability management", vol: 140, trend: "stabilny", cpc: "11.95", diff: 33, intent: "commercial", category: "Vulnerability Mgmt", priority: "A" },
  { keyword: "vulnerability scanner", vol: 140, trend: "+21%", cpc: "8.23", diff: 75, intent: "commercial", category: "Vulnerability Mgmt", priority: "B" },
  { keyword: "tenable nessus", vol: 170, trend: "-35%", cpc: "3.65", diff: 25, intent: "commercial", category: "Tenable / Nessus", priority: "A" },
  { keyword: "tenable vulnerability management", vol: 30, trend: "+50%", cpc: "7.38", diff: null, intent: "commercial", category: "Tenable / Nessus", priority: "A" },
  { keyword: "vulnerability management system", vol: 20, trend: "+200%", cpc: "—", diff: 41, intent: "commercial", category: "Vulnerability Mgmt", priority: "B" },

  // TIER 4: GRC / Narzędzia
  { keyword: "sap grc", vol: 140, trend: "+50%", cpc: "2.61", diff: null, intent: "informational", category: "GRC narzędzia", priority: "A" },
  { keyword: "grc platform", vol: 40, trend: "+300%", cpc: "6.81", diff: null, intent: "navigational", category: "GRC narzędzia", priority: "A" },
  { keyword: "rsa archer", vol: 30, trend: "+33%", cpc: "—", diff: null, intent: "commercial", category: "GRC narzędzia", priority: "B" },

  // TIER 5: Integracja / Cross-sell (niski wolumen, wysoka wartość)
  { keyword: "nis2 zarządzanie podatnościami", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "grc vulnerability management", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "tenable grc integration", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "sap grc nis2", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "archer grc nis2", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "smartgrc", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "navigational", category: "GRC narzędzia", priority: "B" },
  { keyword: "nessus grc", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "commercial", category: "Integracja NIS2+VM", priority: "A" },
  { keyword: "zarządzanie ryzykiem nis2", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "informational", category: "NIS2 compliance", priority: "B" },
  { keyword: "cyber risk management", vol: 10, trend: "stabilny", cpc: "—", diff: null, intent: "informational", category: "Vulnerability Mgmt", priority: "C" },
  { keyword: "nis2 cyberbezpieczeństwo", vol: "<10", trend: "nowy", cpc: "—", diff: null, intent: "informational", category: "NIS2 ogólne", priority: "C" },
];

const categories = [...new Set(keywordData.map(d => d.category))];
const priorities = ["A", "B", "C"];

const categoryColors = {
  "NIS2 ogólne": { bg: "#1a1a2e", text: "#e94560", border: "#e94560" },
  "NIS2 compliance": { bg: "#16213e", text: "#0f3460", border: "#53a8b6" },
  "Vulnerability Mgmt": { bg: "#1a1a2e", text: "#e94560", border: "#e94560" },
  "Tenable / Nessus": { bg: "#0d1117", text: "#6fc276", border: "#6fc276" },
  "GRC narzędzia": { bg: "#1b1b2f", text: "#a855f7", border: "#a855f7" },
  "Integracja NIS2+VM": { bg: "#0c1821", text: "#f59e0b", border: "#f59e0b" },
};

const priorityLabels = {
  A: { label: "Must-have", color: "#ef4444" },
  B: { label: "Warto mieć", color: "#f59e0b" },
  C: { label: "Niszowe", color: "#6b7280" },
};

const intentIcons = {
  commercial: "💰",
  informational: "📚",
  navigational: "🔍",
};

export default function KeywordDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("vol");
  const [showInsights, setShowInsights] = useState(true);

  const filtered = keywordData
    .filter(d => selectedCategory === "all" || d.category === selectedCategory)
    .filter(d => selectedPriority === "all" || d.priority === selectedPriority)
    .sort((a, b) => {
      if (sortBy === "vol") {
        const av = typeof a.vol === "number" ? a.vol : 0;
        const bv = typeof b.vol === "number" ? b.vol : 0;
        return bv - av;
      }
      if (sortBy === "priority") return a.priority.localeCompare(b.priority);
      return a.keyword.localeCompare(b.keyword);
    });

  const totalKeywords = filtered.length;
  const highPriority = filtered.filter(d => d.priority === "A").length;

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0a0a0f 0%, #121218 50%, #0d0d14 100%)",
      color: "#e2e8f0",
      minHeight: "100vh",
      padding: "24px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: "linear-gradient(135deg, #e94560, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700,
          }}>🔑</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Keyword Research: NIS2 × Tenable × GRC
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
              GRC Advisory — Analiza fraz kluczowych · Polska · Kwiecień 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Frazy ogółem", value: keywordData.length, accent: "#3b82f6" },
          { label: "Priorytet A", value: keywordData.filter(d => d.priority === "A").length, accent: "#ef4444" },
          { label: "Top wolumen (nis2)", value: "4 400", accent: "#6fc276" },
          { label: "Frazy \"Integracja\"", value: keywordData.filter(d => d.category === "Integracja NIS2+VM").length, accent: "#f59e0b" },
        ].map((card, i) => (
          <div key={i} style={{
            background: "#15151f",
            border: "1px solid #222233",
            borderRadius: 10,
            padding: "16px 18px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 3, height: "100%",
              background: card.accent,
            }} />
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              {card.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: card.accent, fontFamily: "'JetBrains Mono', monospace" }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Insights Panel */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        border: "1px solid #2a2a44",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 24,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer", marginBottom: showInsights ? 16 : 0,
        }} onClick={() => setShowInsights(!showInsights)}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#f59e0b" }}>
            ⚡ Kluczowe wnioski strategiczne
          </h2>
          <span style={{ color: "#64748b", fontSize: 13 }}>{showInsights ? "▲" : "▼"}</span>
        </div>
        {showInsights && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, lineHeight: 1.7 }}>
            <div>
              <p style={{ color: "#53a8b6", fontWeight: 600, margin: "0 0 6px" }}>🟢 Szansa: Luka na rynku</p>
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Frazy łączące NIS2 z zarządzaniem podatnościami i GRC (np. „nis2 zarządzanie podatnościami", „tenable grc integration", „sap grc nis2") mają bliski zeru wolumen — nikt jeszcze nie zagospodarował tego tematu w PL. To idealne pole do budowy autorytetu content marketingowego.
              </p>
            </div>
            <div>
              <p style={{ color: "#e94560", fontWeight: 600, margin: "0 0 6px" }}>📈 Trend: NIS2 eksploduje</p>
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Fraza „nis2" wzrosła o +84% r/r (z 2 900 do 8 100/mies. w III.2026). „Wdrożenie nis2" rośnie +136%, „ksc nis2" +267%. Rynek szuka rozwiązań. Wchodzenie z contentem TERAZ oznacza pozycjonowanie się przed wejściem ustawy krajowej.
              </p>
            </div>
            <div>
              <p style={{ color: "#a855f7", fontWeight: 600, margin: "0 0 6px" }}>🎯 Strategia: Piramida treści</p>
              <p style={{ color: "#94a3b8", margin: 0 }}>
                Buduj content od szerokiego „nis2" (4 400/mies.) przez „wdrożenie nis2" / „audyt nis2" (90-140/mies.), aż do niszowych fraz integracyjnych. Szerokie frazy = ruch, niszowe = konwersja leadów na usługi Tenable + GRC Advisory.
              </p>
            </div>
            <div>
              <p style={{ color: "#6fc276", fontWeight: 600, margin: "0 0 6px" }}>💡 CPC sygnalizuje wartość</p>
              <p style={{ color: "#94a3b8", margin: 0 }}>
                „Vulnerability management" ma CPC 11.95 PLN, „grc platform" — 6.81 PLN, „tenable vulnerability management" — 7.38 PLN. Wysoki CPC = wysoka wartość komercyjna. Te frazy konwertują, warto je targetować w SEO i Google Ads.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Kategoria:</div>
        {["all", ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: selectedCategory === cat ? "1px solid #e94560" : "1px solid #2a2a44",
              background: selectedCategory === cat ? "#e9456020" : "#15151f",
              color: selectedCategory === cat ? "#e94560" : "#94a3b8",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: selectedCategory === cat ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {cat === "all" ? "Wszystkie" : cat}
          </button>
        ))}

        <div style={{ width: 1, height: 24, background: "#2a2a44", margin: "0 8px" }} />

        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Priorytet:</div>
        {["all", ...priorities].map(p => (
          <button
            key={p}
            onClick={() => setSelectedPriority(p)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: selectedPriority === p ? `1px solid ${p === "all" ? "#3b82f6" : priorityLabels[p]?.color}` : "1px solid #2a2a44",
              background: selectedPriority === p ? `${p === "all" ? "#3b82f6" : priorityLabels[p]?.color}20` : "#15151f",
              color: selectedPriority === p ? (p === "all" ? "#3b82f6" : priorityLabels[p]?.color) : "#94a3b8",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: selectedPriority === p ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {p === "all" ? "Wszystkie" : `${p} — ${priorityLabels[p].label}`}
          </button>
        ))}

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {[
            { key: "vol", label: "Wolumen ↓" },
            { key: "priority", label: "Priorytet" },
            { key: "keyword", label: "A–Z" },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              style={{
                padding: "5px 12px", borderRadius: 5,
                border: sortBy === s.key ? "1px solid #53a8b6" : "1px solid #2a2a44",
                background: sortBy === s.key ? "#53a8b620" : "transparent",
                color: sortBy === s.key ? "#53a8b6" : "#64748b",
                fontSize: 11, cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: "#12121a",
        border: "1px solid #222233",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #2a2a44" }}>
              {["Fraza kluczowa", "Wolumen", "Trend r/r", "CPC (PLN)", "KD", "Intent", "Kategoria", "Priorytet"].map(h => (
                <th key={h} style={{
                  padding: "12px 14px",
                  textAlign: "left",
                  color: "#64748b",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const catColor = categoryColors[row.category] || {};
              const priColor = priorityLabels[row.priority] || {};
              return (
                <tr key={i} style={{
                  borderBottom: "1px solid #1e1e2e",
                  transition: "background 0.1s",
                }}>
                  <td style={{
                    padding: "11px 14px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#e2e8f0",
                  }}>
                    {row.keyword}
                  </td>
                  <td style={{
                    padding: "11px 14px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: typeof row.vol === "number" && row.vol >= 100 ? "#6fc276" : "#94a3b8",
                  }}>
                    {typeof row.vol === "number" ? row.vol.toLocaleString("pl-PL") : row.vol}
                  </td>
                  <td style={{
                    padding: "11px 14px",
                    fontSize: 12,
                    color: row.trend.startsWith("+") ? "#6fc276" : row.trend === "stabilny" ? "#64748b" : "#94a3b8",
                    fontWeight: row.trend.startsWith("+") ? 600 : 400,
                  }}>
                    {row.trend}
                  </td>
                  <td style={{
                    padding: "11px 14px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: row.cpc !== "—" && parseFloat(row.cpc) > 5 ? "#f59e0b" : "#94a3b8",
                  }}>
                    {row.cpc}
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    {row.diff !== null ? (
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: row.diff < 20 ? "#6fc27620" : row.diff < 50 ? "#f59e0b20" : "#ef444420",
                        color: row.diff < 20 ? "#6fc276" : row.diff < 50 ? "#f59e0b" : "#ef4444",
                      }}>
                        {row.diff}
                      </span>
                    ) : (
                      <span style={{ color: "#3a3a4a", fontSize: 11 }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12 }}>
                    <span title={row.intent}>{intentIcons[row.intent] || ""} {row.intent}</span>
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 500,
                      border: `1px solid ${catColor.border}40`,
                      color: catColor.border,
                      background: `${catColor.border}10`,
                    }}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 10px",
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 700,
                      color: priColor.color,
                      background: `${priColor.color}15`,
                      border: `1px solid ${priColor.color}30`,
                    }}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24,
        padding: "16px 20px",
        background: "#15151f",
        border: "1px solid #222233",
        borderRadius: 10,
        fontSize: 12,
        color: "#64748b",
        lineHeight: 1.7,
      }}>
        <strong style={{ color: "#94a3b8" }}>Legenda:</strong>{" "}
        Wolumen = średnia miesięczna (Google, PL). Trend r/r = zmiana roczna. CPC = koszt kliknięcia Google Ads (PLN). KD = Keyword Difficulty (0–100, niżej = łatwiej).
        Intent: 💰 commercial = szukający rozwiązań, 📚 informational = edukacja, 🔍 navigational = szukanie konkretnej marki/strony.
        Priorytet A = kluczowe dla strategii sprzedażowej, B = wspierające, C = niszowe/uzupełniające.
        <br /><strong style={{ color: "#94a3b8" }}>Źródło danych:</strong> DataForSEO / Google Ads · Lokalizacja: Polska · Data: kwiecień 2026.
      </div>
    </div>
  );
}
