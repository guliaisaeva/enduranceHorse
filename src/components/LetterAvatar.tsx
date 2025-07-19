export function LetterAvatar({ name }: { name: string }) {
  const initial = name?.trim()[0]?.toUpperCase() || "U";

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        backgroundColor: "#ccc",
        color: "#555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {initial}
    </div>
  );
}
