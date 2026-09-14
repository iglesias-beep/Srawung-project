import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c2b3a, #2a3f55)",
          borderRadius: 20,
          position: "relative",
        }}
      >
        {/* Gold border */}
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: 17,
            border: "3px solid #b08d57",
          }}
        />
        {/* Inner subtle border */}
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: 13,
            border: "1px solid rgba(176, 141, 87, 0.35)",
          }}
        />
        {/* Sign post */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 30,
            width: 18,
            height: 42,
            marginLeft: -9,
            background: "linear-gradient(135deg, #dfc59b, #b08d57, #d4a94e)",
            borderRadius: 5,
          }}
        />
        {/* Sign board */}
        <div
          style={{
            position: "absolute",
            top: 35,
            left: "50%",
            marginLeft: -55,
            width: 110,
            height: 60,
            background: "linear-gradient(135deg, #dfc59b, #b08d57, #d4a94e)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1c2b3a",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1c2b3a",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1c2b3a",
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
