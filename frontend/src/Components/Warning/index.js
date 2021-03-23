import React from "react";
import "./style.css";

export default function WarningComponent({
  type,
  children,
  width,
  height,
  fontWeight,
  borderRadius,
}) {
  switch (type) {
    case "Warning":
      return (
        <div
          className="Warning-Container"
          style={{ width, height, borderRadius }}
        >
          <span style={{ fontWeight }}>{children}</span>
        </div>
      );
    case "Danger":
      return (
        <div
          className="Danger-Container"
          style={{ width, height, borderRadius }}
        >
          <span style={{ fontWeight }}>{children}</span>
        </div>
      );
    default:
      return <div />;
  }
}
