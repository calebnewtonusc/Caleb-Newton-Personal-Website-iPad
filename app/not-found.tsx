import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0c",
        padding: 24,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <p style={{ fontSize: 60, marginBottom: 8 }} aria-hidden="true">
          404
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            letterSpacing: -0.5,
          }}
        >
          That page is not on this iPad
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
            marginTop: 10,
          }}
        >
          Everything here lives inside one screen, so there was never a page at
          that address to begin with.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 22,
            background: "#007AFF",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 12,
            padding: "12px 22px",
            textDecoration: "none",
          }}
        >
          Go to the home screen
        </Link>
      </div>
    </main>
  );
}
