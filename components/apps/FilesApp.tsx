"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { organizations } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

const USC_PROFESSIONAL_IDS = ["ktp", "datasc", "maai", "cyborg", "avenues"];
const USC_SOCIAL_IDS = ["acts2", "flavors", "boardgames", "scoutfitters"];
const HS_CLUBS_IDS = ["sgvccc", "impact360"];
const HS_VOLUNTEER_IDS = ["baseball-coach", "mission-trip", "ambassador"];

type TopFolder = "usc" | "highschool";

const categoryColors: Record<string, string> = {
  Faith: "#5856D6",
  Professional: "#6C47FF",
  Social: "#FF9500",
  Volunteering: "#34C759",
};

function FolderSVG({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 46 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9C4 6.8 5.8 5 8 5H19L22.5 9.5H38C40.2 9.5 42 11.3 42 13.5V30C42 32.2 40.2 34 38 34H8C5.8 34 4 32.2 4 30V9Z"
        fill={color}
      />
    </svg>
  );
}

function OrgIcon({ org, size = 40 }: { org: typeof organizations[0]; size?: number }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: size * 0.22,
        background: org.logo ? "white" : `linear-gradient(145deg, ${org.color}dd, ${org.color})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: org.logo ? `1px solid ${org.color}22` : "none",
        overflow: "hidden", flexShrink: 0, position: "relative",
        boxShadow: `0 2px 8px ${org.color}28`,
      }}
    >
      {org.logo ? (
        <div style={{ position: "relative", width: "62%", height: "62%" }}>
          <Image src={org.logo} alt={org.name} fill style={{ objectFit: "contain" }} />
        </div>
      ) : (
        <span style={{ fontSize: size * 0.34, fontWeight: 800, color: "white", fontFamily: "-apple-system, sans-serif" }}>
          {org.shortName.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function OrgDetail({ org, onBack, showBack, backLabel = "Back" }: {
  org: typeof organizations[0];
  onBack: () => void;
  showBack: boolean;
  backLabel?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {showBack && (
        <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
          <button
            onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 5, color: "#007aff", fontSize: 16, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "-apple-system, sans-serif" }}
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M7 1L1 6.5L7 12" stroke="#007aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {backLabel}
          </button>
        </div>
      )}
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: showBack ? "8px 20px 32px" : "20px 20px 32px" }}>
        {/* Hero */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16, background: "white", borderRadius: 16, padding: "18px 16px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
          <OrgIcon org={org} size={62} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1c1c1e", lineHeight: 1.2, marginBottom: 4, fontFamily: "-apple-system, sans-serif" }}>{org.name}</h2>
            <p style={{ fontSize: 12, color: "#636366", marginBottom: 6 }}>{org.role} · {org.period}</p>
            <span style={{ fontSize: 11, fontWeight: 600, color: categoryColors[org.category] ?? "#8e8e93", background: `${categoryColors[org.category] ?? "#8e8e93"}18`, borderRadius: 6, padding: "2px 8px" }}>
              {org.category}
            </span>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: 11, color: "#8e8e93", fontWeight: 600, letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>About</p>
          <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.65, fontFamily: "-apple-system, sans-serif" }}>{org.description}</p>
        </div>

        {"achievements" in org && Array.isArray(org.achievements) && (org.achievements as string[]).length > 0 && (
          <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
            <p style={{ fontSize: 11, color: "#8e8e93", fontWeight: 600, letterSpacing: 0.5, marginBottom: 8, textTransform: "uppercase" }}>Impact</p>
            {(org.achievements as string[]).map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                <span style={{ color: org.color, fontWeight: 700, flexShrink: 0, fontSize: 14 }}>·</span>
                <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55 }}>{a}</p>
              </div>
            ))}
          </div>
        )}

        {"photos" in org && Array.isArray(org.photos) && (org.photos as string[]).length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
            {(org.photos as string[]).map((src, pi) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={pi} src={src} alt="" style={{ height: 110, width: "auto", borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
            ))}
          </div>
        )}

        {org.link && (
          <a
            href={org.link} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: org.color, color: "white", borderRadius: 14, padding: "13px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
          >
            Visit {org.name} {"\u2197"}
          </a>
        )}
      </div>
    </div>
  );
}

export default function FilesApp({ orientation }: Props) {
  const [topFolder, setTopFolder] = useState<TopFolder | null>(null);
  const [subfolder, setSubfolder] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";

  const topFolderDefs = [
    { id: "usc" as TopFolder, label: "USC", color: "#990000" },
    { id: "highschool" as TopFolder, label: "High School", color: "#007AFF" },
  ];

  // Level 2: symmetric subfolders for both top-level folders
  const level2Defs = topFolder === "usc"
    ? [
        { id: "professional", label: "Professional", color: "#6C47FF", count: USC_PROFESSIONAL_IDS.length },
        { id: "social",       label: "Social",       color: "#FF9500", count: USC_SOCIAL_IDS.length },
      ]
    : topFolder === "highschool"
    ? [
        { id: "clubs",       label: "Clubs",       color: "#007AFF", count: HS_CLUBS_IDS.length },
        { id: "volunteering", label: "Volunteering", color: "#34C759", count: HS_VOLUNTEER_IDS.length },
      ]
    : [];

  function getCol3Items() {
    if (topFolder === "usc") {
      if (subfolder === "professional") return organizations.filter((o) => USC_PROFESSIONAL_IDS.includes(o.id));
      if (subfolder === "social")       return organizations.filter((o) => USC_SOCIAL_IDS.includes(o.id));
    }
    if (topFolder === "highschool") {
      if (subfolder === "clubs")        return organizations.filter((o) => HS_CLUBS_IDS.includes(o.id));
      if (subfolder === "volunteering") return organizations.filter((o) => HS_VOLUNTEER_IDS.includes(o.id));
    }
    return [];
  }

  const col3Items = getCol3Items();
  const selectedOrg = selectedId ? (organizations.find((o) => o.id === selectedId) ?? null) : null;

  const handleTopFolder = (folder: TopFolder) => {
    setTopFolder(folder);
    setSubfolder(null);
    setSelectedId(null);
  };

  // Titles for each column header
  const col2Title = !topFolder ? "Select" : topFolder === "usc" ? "USC" : "High School";
  const col3Title = !subfolder ? "Select"
    : subfolder === "professional" ? "Professional"
    : subfolder === "social"       ? "Social"
    : subfolder === "clubs"        ? "Clubs"
    : "Volunteering";

  // Portrait depth: 0 → 1 → 2 → 3
  const portraitDepth = selectedId ? 3 : subfolder ? 2 : topFolder ? 1 : 0;

  // ─── Shared sub-components ────────────────────────────────────────────────

  function SubfolderList({ compact }: { compact?: boolean }) {
    const pad = compact ? "9px 10px" : "13px 16px";
    return (
      <>
        {level2Defs.map((sf, i) => (
          <motion.div
            key={sf.id}
            whileTap={{ backgroundColor: "#f2f2f7" }}
            onClick={() => { setSubfolder(sf.id); setSelectedId(null); }}
            style={{
              display: "flex", alignItems: "center", gap: compact ? 8 : 12, padding: pad,
              cursor: "pointer",
              borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.08)" : "none",
              background: subfolder === sf.id ? "rgba(0,122,255,0.07)" : "transparent",
            }}
          >
            <FolderSVG color={sf.color} size={compact ? 26 : 34} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: compact ? 12 : 15, fontWeight: subfolder === sf.id ? 600 : 500, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{sf.label}</p>
              <p style={{ fontSize: compact ? 10 : 12, color: "#8e8e93" }}>{sf.count} items</p>
            </div>
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M1 1l5 5L1 10" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
        ))}
      </>
    );
  }

  function OrgList({ items, compact }: { items: typeof organizations; compact?: boolean }) {
    const pad = compact ? "9px 10px" : "12px 16px";
    const iconSize = compact ? 32 : 42;
    return (
      <>
        {items.map((org, i) => (
          <motion.div
            key={org.id}
            whileTap={{ backgroundColor: "#f2f2f7" }}
            onClick={() => setSelectedId(org.id)}
            style={{
              display: "flex", alignItems: "center", gap: compact ? 8 : 12, padding: pad,
              cursor: "pointer",
              borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.08)" : "none",
              background: selectedId === org.id ? "rgba(0,122,255,0.07)" : "transparent",
            }}
          >
            <OrgIcon org={org} size={iconSize} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: compact ? 12 : 15, fontWeight: selectedId === org.id ? 600 : 400, color: "#1c1c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "-apple-system, sans-serif" }}>
                {org.name}
              </p>
              <p style={{ fontSize: compact ? 10 : 12, color: "#8e8e93" }}>{org.role}</p>
            </div>
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M1 1l5 5L1 10" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
        ))}
      </>
    );
  }

  function ColHeader({ title }: { title: string }) {
    return (
      <div style={{ padding: "10px 12px 8px", borderBottom: "0.5px solid rgba(60,60,67,0.1)", flexShrink: 0 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{title}</h3>
      </div>
    );
  }

  function EmptyColHint({ label }: { label: string }) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, height: "100%" }}>
        <FolderSVG color="#d1d1d6" size={34} />
        <p style={{ fontSize: 11, color: "#c7c7cc", fontFamily: "-apple-system, sans-serif", textAlign: "center" }}>{label}</p>
      </div>
    );
  }

  // ─── Landscape: 4-column Finder layout ───────────────────────────────────
  if (isLandscape) {
    return (
      <div className="app-window" style={{ background: "#f2f2f7", display: "flex", flexDirection: "row" }}>

        {/* Col 1 — Root folders (118px) */}
        <div style={{ width: 118, borderRight: "0.5px solid rgba(60,60,67,0.18)", background: "#f7f7f7", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "14px 12px 8px" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", letterSpacing: -0.2 }}>Organizations</h2>
          </div>
          <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 6px 16px" }}>
            {topFolderDefs.map((folder) => (
              <motion.div
                key={folder.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleTopFolder(folder.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "7px 7px",
                  borderRadius: 7, cursor: "pointer", marginBottom: 2,
                  background: topFolder === folder.id ? "rgba(0,122,255,0.12)" : "transparent",
                }}
              >
                <FolderSVG color={folder.color} size={24} />
                <span style={{ fontSize: 12, fontWeight: topFolder === folder.id ? 600 : 400, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                  {folder.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Col 2 — Subfolders (148px) */}
        <div style={{ width: 148, borderRight: "0.5px solid rgba(60,60,67,0.18)", background: "white", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <ColHeader title={col2Title} />
          <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
            {!topFolder ? (
              <EmptyColHint label="Select a folder" />
            ) : (
              <SubfolderList compact />
            )}
          </div>
        </div>

        {/* Col 3 — Org list (185px) */}
        <div style={{ width: 185, borderRight: "0.5px solid rgba(60,60,67,0.18)", background: "white", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <ColHeader title={col3Title} />
          <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
            {!subfolder ? (
              <EmptyColHint label="Select a category" />
            ) : col3Items.length === 0 ? (
              <EmptyColHint label="No items" />
            ) : (
              <OrgList items={col3Items} compact />
            )}
          </div>
        </div>

        {/* Col 4 — Detail (flex 1) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f7f7f7" }}>
          <AnimatePresence mode="wait">
            {selectedOrg ? (
              <motion.div key={selectedOrg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: "100%" }}>
                <OrgDetail org={selectedOrg} onBack={() => setSelectedId(null)} showBack={false} />
              </motion.div>
            ) : (
              <motion.div key="empty-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, height: "100%" }}>
                <FolderSVG color="#c7c7cc" size={48} />
                <p style={{ fontSize: 12, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>Select an organization</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    );
  }

  // ─── Portrait: stacked push-nav (4 depths) ───────────────────────────────
  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <AnimatePresence mode="wait">

        {/* Depth 0 — Root */}
        {portraitDepth === 0 && (
          <motion.div key="p0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
              <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1c1c1e", marginBottom: 20, fontFamily: "-apple-system, sans-serif", letterSpacing: -0.5 }}>Organizations</h1>
              <div style={{ background: "white", borderRadius: 12, overflow: "hidden" }}>
                {topFolderDefs.map((folder, i) => (
                  <motion.div
                    key={folder.id}
                    whileTap={{ backgroundColor: "#f2f2f7" }}
                    onClick={() => handleTopFolder(folder.id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none", cursor: "pointer" }}
                  >
                    <FolderSVG color={folder.color} size={36} />
                    <span style={{ fontSize: 17, flex: 1, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{folder.label}</span>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5L1 11" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Depth 1 — Subfolders */}
        {portraitDepth === 1 && (
          <motion.div key={`p1-${topFolder}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
              <button onClick={() => setTopFolder(null)} style={{ display: "flex", alignItems: "center", gap: 5, color: "#007aff", fontSize: 16, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "-apple-system, sans-serif" }}>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M7 1L1 6.5L7 12" stroke="#007aff" strokeWidth="1.8" strokeLinecap="round" /></svg>
                Organizations
              </button>
            </div>
            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1c1c1e", marginBottom: 16, fontFamily: "-apple-system, sans-serif", letterSpacing: -0.4 }}>
                {topFolder === "usc" ? "USC" : "High School"}
              </h1>
              <div style={{ background: "white", borderRadius: 12, overflow: "hidden" }}>
                <SubfolderList />
              </div>
            </div>
          </motion.div>
        )}

        {/* Depth 2 — Org list */}
        {portraitDepth === 2 && (
          <motion.div key={`p2-${subfolder}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
              <button
                onClick={() => { setSubfolder(null); setSelectedId(null); }}
                style={{ display: "flex", alignItems: "center", gap: 5, color: "#007aff", fontSize: 16, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "-apple-system, sans-serif" }}
              >
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M7 1L1 6.5L7 12" stroke="#007aff" strokeWidth="1.8" strokeLinecap="round" /></svg>
                {topFolder === "usc" ? "USC" : "High School"}
              </button>
            </div>
            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1c1c1e", marginBottom: 16, fontFamily: "-apple-system, sans-serif", letterSpacing: -0.4 }}>
                {col3Title}
              </h1>
              <div style={{ background: "white", borderRadius: 12, overflow: "hidden" }}>
                <OrgList items={col3Items} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Depth 3 — Org detail */}
        {portraitDepth === 3 && selectedOrg && (
          <motion.div key={`p3-${selectedOrg.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ height: "100%" }}>
            <OrgDetail
              org={selectedOrg}
              onBack={() => setSelectedId(null)}
              showBack
              backLabel={col3Title}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
