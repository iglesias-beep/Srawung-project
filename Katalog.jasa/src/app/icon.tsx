import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          position: "relative",
        }}
      >
        {/* Gold border */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: 6,
            border: "1px solid #b08d57",
          }}
        />
        {/* Sign post */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 6,
            width: 4,
            height: 8,
            marginLeft: -2,
            background: "linear-gradient(135deg, #dfc59b, #b08d57, #d4a94e)",
            borderRadius: 1,
          }}
        />
        {/* Sign board */}
        <div
          style={{
            position: "absolute",
            top: 7,
            left: "50%",
            marginLeft: -10,
            width: 20,
            height: 11,
            background: "linear-gradient(135deg, #dfc59b, #b08d57, #d4a94e)",
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#1c2b3a",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#1c2b3a",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 2,
              height: 2,
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
