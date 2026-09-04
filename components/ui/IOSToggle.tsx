/* One toggle for the whole iPad. It was duplicated in Settings and Health. */
export default function IOSToggle({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 51,
        height: 31,
        borderRadius: 15.5,
        background: on ? "#34C759" : "#e5e5ea",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: on ? 22 : 2,
          width: 27,
          height: 27,
          borderRadius: "50%",
          background: "var(--surface)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}
