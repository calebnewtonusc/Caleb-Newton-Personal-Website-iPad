"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { organizations } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Two folders, not three overlapping ones: what he is doing now, and what he did.
const SECTIONS = [
  {
    id: "current",
    label: "Current",
    color: "#007AFF",
    ids: [
      "usctts",
      "gencollege",
      "maai",
      "troy-philippines",
      "dragon-boat",
      "scoutfitters",
      "flavors",
      "boardgames",
    ],
  },
  {
    id: "past",
    label: "Past",
    color: "#8E8E93",
    ids: ["okb-hope", "echo-ai", "sgvccc", "youth-baseball"],
  },
];


function FolderSVG({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden="true"
      width={size}
      height={size * 0.8}
      viewBox="0 0 46 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9C4 6.8 5.8 5 8 5H19L22.5 9.5H38C40.2 9.5 42 11.3 42 13.5V30C42 32.2 40.2 34 38 34H8C5.8 34 4 32.2 4 30V9Z"
        fill={color}
      />
    </svg>
  );
}

function OrgIcon({
  org,
  size = 40,
}: {
  org: (typeof organizations)[0];
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: org.logo ? "var(--surface)" : org.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: org.logo ? "1px solid rgba(0,0,0,0.08)" : "none",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {org.logo ? (
        <div style={{ position: "relative", width: "62%", height: "62%" }}>
          <Image
            src={org.logo}
            alt={org.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      ) : (
        <span
          style={{
            fontSize: size * 0.34,
            fontWeight: 800,
            color: "var(--surface)",
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          {org.shortName.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

function OrgDetail({
  org,
  onBack,
  showBack,
  backLabel = "Back",
}: {
  org: (typeof organizations)[0];
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#007aff",
              fontSize: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            <svg aria-hidden="true" width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path
                d="M7 1L1 6.5L7 12"
                stroke="#007aff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </button>
        </div>
      )}
      <div
        className="ios-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: showBack ? "8px 20px 32px" : "20px 20px 32px",
        }}
      >
        {/* Hero */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginBottom: 16,
            background: "var(--surface)",
            borderRadius: 16,
            padding: "18px 16px",
            boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
          }}
        >
          <OrgIcon org={org} size={62} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "var(--label)",
                lineHeight: 1.2,
                marginBottom: 4,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {org.name}
            </h2>
            <p style={{ fontSize: 12, color: "var(--label-3)", marginBottom: 6 }}>
              {org.role} · {org.period}
            </p>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--label-4)",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {org.category}
            </span>
          </div>
        </div>

        <div
          style={{
            background: "var(--surface)",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "var(--label-4)",
              fontWeight: 600,
              letterSpacing: 0.5,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            About
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--label-2)",
              lineHeight: 1.65,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {org.description}
          </p>
        </div>

        {"achievements" in org &&
          Array.isArray(org.achievements) &&
          (org.achievements as string[]).length > 0 && (
            <div
              style={{
                background: "var(--surface)",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 10,
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--label-4)",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Impact
              </p>
              {(org.achievements as string[]).map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 8, marginBottom: 7 }}
                >
                  <span
                    style={{
                      color: "var(--label-4)",
                      fontWeight: 700,
                      flexShrink: 0,
                      fontSize: 14,
                    }}
                  >
                    ·
                  </span>
                  <p
                    style={{ fontSize: 13, color: "var(--label-2)", lineHeight: 1.55 }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          )}

        {"photos" in org &&
          Array.isArray(org.photos) &&
          (org.photos as string[]).length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 10,
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {(org.photos as string[]).map((src, pi) => (
                <Image
                  key={pi}
                  src={src}
                  alt=""
                  width={160}
                  height={110}
                  style={{
                    height: 110,
                    width: "auto",
                    borderRadius: 12,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}

        {org.link && (
          <a
            href={org.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#1c1c1e",
              color: "var(--surface)",
              borderRadius: 14,
              padding: "13px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Visit {org.name} {"↗"}
          </a>
        )}
      </div>
    </div>
  );
}

// Sort orgs by a given ID order array
function sortByIds(
  orgs: typeof organizations,
  ids: string[],
): typeof organizations {
  return ids
    .map((id) => orgs.find((o) => o.id === id))
    .filter(Boolean) as typeof organizations;
}

function ColHeader({ title }: { title: string }) {
  return (
    <div style={{ padding: "10px 12px 8px", borderBottom: "0.5px solid var(--separator)", flexShrink: 0 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--label)", fontFamily: "-apple-system, sans-serif" }}>{title}</h3>
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

function OrgList({
  items,
  compact,
  selectedId,
  onSelect,
}: {
  items: typeof organizations;
  compact?: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const pad = compact ? "9px 10px" : "12px 16px";
  const iconSz = compact ? 32 : 42;
  return (
    <>
      {items.map((org, i) => (
        <motion.button
          key={org.id}
          type="button"
          whileTap={{ opacity: 0.55 }}
          onClick={() => onSelect(org.id)}
          aria-label={`${org.name}, ${org.role}`}
          style={{
            display: "flex", alignItems: "center", gap: compact ? 8 : 12, padding: pad,
            cursor: "pointer", width: "100%", textAlign: "left", border: "none",
            borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.08)" : "none",
            background: selectedId === org.id ? "rgba(0,122,255,0.07)" : "transparent",
            font: "inherit",
          }}
        >
          <OrgIcon org={org} size={iconSz} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: compact ? 12 : 15, fontWeight: selectedId === org.id ? 600 : 400, color: "var(--label)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "-apple-system, sans-serif" }}>
              {org.name}
            </p>
            <p style={{ fontSize: compact ? 10 : 12, color: "var(--label-4)" }}>{org.role}</p>
          </div>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true"><path d="M1 1l5 5L1 10" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
      ))}
    </>
  );
}

export default function FilesApp({ orientation }: Props) {
  const [topFolder, setTopFolder] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";

  const activeSection = SECTIONS.find((s) => s.id === topFolder) ?? null;
  const sectionOrgs = activeSection
    ? sortByIds(organizations, activeSection.ids)
    : [];
  const sectionTitle = activeSection?.label ?? "";
  const selectedOrg = selectedId
    ? (organizations.find((o) => o.id === selectedId) ?? null)
    : null;

  const handleTopFolder = (folder: string) => {
    setNavDir(1);
    setTopFolder(folder);
    setSelectedId(null);
  };

  const showCol2 = topFolder !== null;
  const portraitDepth = selectedId ? 2 : topFolder ? 1 : 0;

  // Push slides the new pane in from the right, pop brings it back from the left
  const [navDir, setNavDir] = useState(1);
  const enterX = 24 * navDir;
  const exitX = -24 * navDir;

  const openOrg = (id: string) => {
    setNavDir(1);
    setSelectedId(id);
  };
  const backToList = () => {
    setNavDir(-1);
    setSelectedId(null);
  };
  const backToFolders = () => {
    setNavDir(-1);
    setTopFolder(null);
  };

  // ─── Landscape: progressive columns ─────────────────────────────────────────
  if (isLandscape) {
    return (
      <div
        className="app-window"
        style={{ background: "var(--surface-sunken)", display: "flex", flexDirection: "row" }}
      >
        {/* Col 1 — Sections (always visible, 120px) */}
        <div
          style={{
            width: 120,
            borderRight: "0.5px solid var(--separator)",
            background: "#f7f7f7",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "14px 12px 8px" }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--label)",
                fontFamily: "-apple-system, sans-serif",
                letterSpacing: -0.2,
              }}
            >
              Organizations
            </h2>
          </div>
          <div
            className="ios-scroll"
            style={{ flex: 1, overflowY: "auto", padding: "0 6px 16px" }}
          >
            {SECTIONS.map((folder) => (
              <motion.div
                key={folder.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleTopFolder(folder.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "7px 7px",
                  borderRadius: 7,
                  cursor: "pointer",
                  marginBottom: 2,
                  background:
                    topFolder === folder.id
                      ? "rgba(0,122,255,0.12)"
                      : "transparent",
                }}
              >
                <FolderSVG color={folder.color} size={24} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: topFolder === folder.id ? 600 : 400,
                    color: "var(--label)",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  {folder.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Col 2 — Org list for the selected section */}
        <AnimatePresence>
          {showCol2 && (
            <motion.div
              key="col2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 190, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              style={{
                borderRight: "0.5px solid var(--separator)",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 190 }}>
                <ColHeader title={sectionTitle} />
              </div>
              <div
                className="ios-scroll"
                style={{ flex: 1, overflowY: "auto", width: 190 }}
              >
                {sectionOrgs.length === 0 ? (
                  <EmptyColHint label="No items" />
                ) : (
                  <OrgList items={sectionOrgs} compact selectedId={selectedId} onSelect={openOrg} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Col 3 — Detail (flex 1, always) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#f7f7f7",
            minWidth: 0,
          }}
        >
          <AnimatePresence mode="wait">
            {selectedOrg ? (
              <motion.div
                key={selectedOrg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: "100%" }}
              >
                <OrgDetail
                  org={selectedOrg}
                  onBack={backToList}
                  showBack={false}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  height: "100%",
                }}
              >
                <FolderSVG color="#c7c7cc" size={48} />
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--label-4)",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  Select an organization
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ─── Portrait: stacked push-nav ──────────────────────────────────────────────
  return (
    <div className="app-window" style={{ background: "var(--surface-sunken)" }}>
      <AnimatePresence mode="wait">
        {/* Depth 0 — Sections */}
        {portraitDepth === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, x: enterX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitX }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              className="ios-scroll"
              style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}
            >
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "var(--label)",
                  marginBottom: 20,
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                Organizations
              </h1>
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {SECTIONS.map((folder, i) => (
                  <motion.div
                    key={folder.id}
                    whileTap={{ opacity: 0.55 }}
                    onClick={() => handleTopFolder(folder.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 16px",
                      borderTop:
                        i > 0 ? "0.5px solid var(--separator)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <FolderSVG color={folder.color} size={36} />
                    <span
                      style={{
                        fontSize: 17,
                        flex: 1,
                        color: "var(--label)",
                        fontFamily: "-apple-system, sans-serif",
                      }}
                    >
                      {folder.label}
                    </span>
                    <span
                      style={{ fontSize: 14, color: "var(--label-4)", marginRight: 6 }}
                    >
                      {folder.ids.length}
                    </span>
                    <svg aria-hidden="true" width="7" height="12" viewBox="0 0 7 12" fill="none">
                      <path
                        d="M1 1l5 5L1 11"
                        stroke="#c7c7cc"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Depth 1 — Org list for the section */}
        {portraitDepth === 1 && (
          <motion.div
            key={`p1-${topFolder}`}
            initial={{ opacity: 0, x: enterX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitX }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
              <button
                onClick={backToFolders}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#007aff",
                  fontSize: 16,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                <svg aria-hidden="true" width="8" height="13" viewBox="0 0 8 13" fill="none">
                  <path
                    d="M7 1L1 6.5L7 12"
                    stroke="#007aff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Organizations
              </button>
            </div>
            <div
              className="ios-scroll"
              style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}
            >
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--label)",
                  marginBottom: 16,
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.4,
                }}
              >
                {sectionTitle}
              </h1>
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <OrgList items={sectionOrgs} selectedId={selectedId} onSelect={openOrg} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Depth 2 — Org detail */}
        {portraitDepth === 2 && selectedOrg && (
          <motion.div
            key={`p2-${selectedOrg.id}`}
            initial={{ opacity: 0, x: enterX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitX }}
            style={{ height: "100%" }}
          >
            <OrgDetail
              org={selectedOrg}
              onBack={backToList}
              showBack
              backLabel={sectionTitle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
