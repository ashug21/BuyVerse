"use client";

import Snowfall from "react-snowfall";

export default function Snow() {
  return (
    <Snowfall
      snowflakeCount={60}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
