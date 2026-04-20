"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

type ViewState = { mode: "list" } | { mode: "doc"; expId: string };

/* ── Google Docs blue ── */
const GDOCS_BLUE = "#1a73e8";
const GDOCS_LIGHT_BLUE = "#e8f0fe";

/* ── Company logo with initials fallback ── */
function CompanyLogo({
  logo,
  company,
  color,
  size,
}: {
  logo: string | null;
  company: string;
  color: string;
  size: number;
}) {
  if (logo) {
    return (
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          borderRadius: size * 0.18,
          overflow: "hidden",
          background: "white",
          border: "1px solid rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}
      >
        <Image
          src={logo}
          alt={company}
          fill
          sizes={`${size}px`}
          style={{ objectFit: "contain", padding: Math.max(2, size * 0.08) }}
        />
      </div>
    );
  }
  const initials = company
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.18,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: size * 0.4,
        fontWeight: 700,
        fontFamily: "'Google Sans', -apple-system, sans-serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ── Toolbar button (File, Edit, etc.) ── */
function MenuButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: "#3c4043",
        fontFamily: "'Google Sans', -apple-system, sans-serif",
        padding: "4px 7px",
        borderRadius: 4,
        cursor: "default",
        background: hovered ? "#e8eaed" : "transparent",
        transition: "background 0.15s",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

/* ── Document card in the list view ── */
const DocCard = memo(function DocCard({
  exp,
  onOpen,
  index,
}: {
  exp: (typeof experience)[0];
  onOpen: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 340,
        damping: 28,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        width: 180,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Doc thumbnail */}
      <div
        style={{
          width: 180,
          height: 232,
          borderRadius: 8,
          border: hovered ? `2px solid ${GDOCS_BLUE}` : "1px solid #dadce0",
          background: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "border 0.15s, box-shadow 0.15s",
          boxShadow: hovered ? "0 2px 8px rgba(26,115,232,0.18)" : "none",
        }}
      >
        {/* Logo badge centered at top of thumbnail */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 18,
            paddingBottom: 10,
          }}
        >
          <CompanyLogo
            logo={exp.logo}
            company={exp.company}
            color={exp.color}
            size={56}
          />
        </div>
        {/* Mini doc preview */}
        <div style={{ padding: "0 14px 0", flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#202124",
              marginBottom: 4,
              fontFamily: "'Google Sans', -apple-system, sans-serif",
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            {exp.company}
          </div>
          <div
            style={{
              fontSize: 8,
              color: "#5f6368",
              marginBottom: 10,
              fontFamily: "-apple-system, sans-serif",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {exp.title}
          </div>
          {/* Fake text lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                height: 3,
                background: "#e0e0e0",
                borderRadius: 1,
                width: "100%",
              }}
            />
            <div
              style={{
                height: 3,
                background: "#e0e0e0",
                borderRadius: 1,
                width: "90%",
              }}
            />
            <div
              style={{
                height: 3,
                background: "#e0e0e0",
                borderRadius: 1,
                width: "75%",
              }}
            />
            <div
              style={{
                height: 3,
                background: "#e0e0e0",
                borderRadius: 1,
                width: "85%",
              }}
            />
            <div
              style={{
                height: 3,
                background: "#e0e0e0",
                borderRadius: 1,
                width: "60%",
              }}
            />
          </div>
        </div>
      </div>
      {/* Doc title + details */}
      <div
        style={{
          padding: "8px 4px 0",
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            flexShrink: 0,
            position: "relative",
            marginTop: 1,
          }}
        >
          <CompanyLogo
            logo={exp.logo}
            company={exp.company}
            color={exp.color}
            size={22}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#202124",
              fontFamily: "'Google Sans', -apple-system, sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.3,
            }}
          >
            {exp.company}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#5f6368",
              fontFamily: "-apple-system, sans-serif",
              marginTop: 1,
            }}
          >
            {exp.period}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ── Doc view: looks like an open Google Doc ── */
function DocView({
  exp,
  onBack,
}: {
  exp: (typeof experience)[0];
  onBack: () => void;
}) {
  const hasContributions = exp.achievements.length > 0;
  const hasExtras =
    exp.skills.length > 0 ||
    (exp.photos?.length ?? 0) > 0 ||
    Boolean(exp.website);

  return (
    <div
      className="app-window"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#f8f9fa",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #dadce0",
          padding: "8px 12px 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          zIndex: 2,
          boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)",
        }}
      >
        {/* Row 1: back arrow + doc icon + title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#5f6368"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div
            style={{
              width: 24,
              height: 24,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src="/assets/icons/googledocs.png"
              alt="Doc"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#202124",
                fontFamily: "'Google Sans', -apple-system, sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {exp.company}
            </div>
          </div>
        </div>

        {/* Row 2: Menu bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            paddingLeft: 36,
            paddingBottom: 4,
          }}
        >
          <MenuButton label="File" />
          <MenuButton label="Edit" />
          <MenuButton label="View" />
          <MenuButton label="Insert" />
          <MenuButton label="Format" />
          <MenuButton label="Tools" />
        </div>

        {/* Row 3: Formatting toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            paddingLeft: 36,
            paddingBottom: 8,
            borderTop: "1px solid #e8eaed",
            paddingTop: 6,
          }}
        >
          {/* Font dropdown */}
          <div
            style={{
              fontSize: 11,
              color: "#3c4043",
              border: "1px solid #dadce0",
              borderRadius: 4,
              padding: "2px 8px",
              fontFamily: "-apple-system, sans-serif",
              userSelect: "none",
            }}
          >
            Arial
          </div>
          {/* Size */}
          <div
            style={{
              fontSize: 11,
              color: "#3c4043",
              border: "1px solid #dadce0",
              borderRadius: 4,
              padding: "2px 6px",
              minWidth: 24,
              textAlign: "center",
              fontFamily: "-apple-system, sans-serif",
              userSelect: "none",
            }}
          >
            11
          </div>
          {/* Separator */}
          <div style={{ width: 1, height: 18, background: "#dadce0" }} />
          {/* B I U */}
          {["B", "I", "U"].map((l) => (
            <div
              key={l}
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: l === "B" ? 700 : 400,
                fontStyle: l === "I" ? "italic" : "normal",
                textDecoration: l === "U" ? "underline" : "none",
                color: "#3c4043",
                fontFamily: "-apple-system, sans-serif",
                userSelect: "none",
              }}
            >
              {l}
            </div>
          ))}
          {/* Separator */}
          <div style={{ width: 1, height: 18, background: "#dadce0" }} />
          {/* Text color indicator */}
          <div
            style={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 500,
              color: "#3c4043",
              fontFamily: "-apple-system, sans-serif",
              userSelect: "none",
            }}
          >
            A
          </div>
        </div>
      </div>

      {/* Document body */}
      <div
        className="ios-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          padding: "24px 12px 40px",
          userSelect: "text",
          WebkitUserSelect: "text",
        }}
      >
        {/* Page 1: Title + description */}
        <DocPage index={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <CompanyLogo
              logo={exp.logo}
              company={exp.company}
              color={exp.color}
              size={64}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#202124",
                  marginBottom: 4,
                  lineHeight: 1.3,
                }}
              >
                {exp.title}
              </h1>
              <div
                style={{
                  fontSize: 15,
                  color: GDOCS_BLUE,
                  fontWeight: 500,
                  marginBottom: 2,
                }}
              >
                {exp.company}
              </div>
              <div style={{ fontSize: 13, color: "#5f6368" }}>{exp.period}</div>
            </div>
          </div>

          <div style={{ height: 1, background: "#dadce0", marginBottom: 20 }} />

          <p
            style={{
              fontSize: 14,
              color: "#3c4043",
              lineHeight: 1.7,
              marginBottom: 0,
            }}
          >
            {exp.description}
          </p>
        </DocPage>

        {/* Page 2: Key Contributions */}
        {hasContributions && (
          <DocPage index={1}>
            <h2
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#202124",
                marginBottom: 10,
              }}
            >
              Key Contributions
            </h2>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {exp.achievements.map((a, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "#3c4043",
                    lineHeight: 1.65,
                    marginBottom: 8,
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </DocPage>
        )}

        {/* Page 3: Technologies + photos + website */}
        {hasExtras && (
          <DocPage index={hasContributions ? 2 : 1}>
            {exp.skills.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#202124",
                    marginBottom: 10,
                  }}
                >
                  Technologies
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: GDOCS_BLUE,
                        background: GDOCS_LIGHT_BLUE,
                        borderRadius: 12,
                        padding: "3px 10px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {exp.photos && exp.photos.length > 0 && (
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingBottom: 4,
                }}
              >
                {exp.photos.map((src, pi) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={pi}
                    src={src}
                    alt=""
                    style={{
                      height: 120,
                      width: 190,
                      borderRadius: 4,
                      objectFit: "cover",
                      flexShrink: 0,
                      border: "1px solid #dadce0",
                    }}
                  />
                ))}
              </div>
            )}

            {exp.website && (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 24,
                  fontSize: 13,
                  fontWeight: 500,
                  color: GDOCS_BLUE,
                  textDecoration: "none",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {exp.website} {"\u2197"}
              </a>
            )}
          </DocPage>
        )}
      </div>
    </div>
  );
}

/* ── Individual Google Docs-style page card ── */
function DocPage({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        delay: index * 0.05,
      }}
      style={{
        width: "100%",
        maxWidth: 560,
        background: "white",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        padding: "40px 40px 60px",
        fontFamily: "Arial, -apple-system, sans-serif",
        userSelect: "text",
        WebkitUserSelect: "text",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main WorkApp ── */
export default function WorkApp({ onClose: _onClose }: Props) {
  const [view, setView] = useState<ViewState>({ mode: "list" });

  if (view.mode === "doc") {
    const exp = experience.find((e) => e.id === view.expId);
    if (!exp) return null;
    return <DocView exp={exp} onBack={() => setView({ mode: "list" })} />;
  }

  const groups = [
    { label: "2026", items: experience.filter((e) => e.year === "2026") },
    { label: "2025", items: experience.filter((e) => e.year === "2025") },
    { label: "2024", items: experience.filter((e) => e.year === "2024") },
  ].filter((g) => g.items.length > 0);

  return (
    <div
      className="app-window"
      style={{
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Google Docs header bar */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #dadce0",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{ width: 28, height: 28, position: "relative", flexShrink: 0 }}
        >
          <Image
            src="/assets/icons/googledocs.png"
            alt="Docs"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#202124",
            fontFamily: "'Google Sans', -apple-system, sans-serif",
          }}
        >
          Work
        </span>
      </div>

      {/* Template strip */}
      <div
        style={{
          background: "#f1f3f4",
          borderBottom: "1px solid #dadce0",
          padding: "12px 16px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#202124",
            fontFamily: "'Google Sans', -apple-system, sans-serif",
          }}
        >
          Work Experience
        </span>
      </div>

      {/* Doc list */}
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}
      >
        {groups.map((group) => (
          <div key={group.label} style={{ padding: "16px 16px 0" }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#5f6368",
                fontFamily: "'Google Sans', -apple-system, sans-serif",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{group.label}</span>
              <div style={{ flex: 1, height: 1, background: "#dadce0" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              {group.items.map((exp, i) => (
                <DocCard
                  key={exp.id}
                  exp={exp}
                  index={i}
                  onOpen={() => setView({ mode: "doc", expId: exp.id })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
