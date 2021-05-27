import React from "react";

export function SuccessNotification({ message }) {
  return (
    <div
      style={{
        color: "green",
        border: "1px solid green",
        backgroundColor: "	#D3D3D3",
        color: "green",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <h3>{message}</h3>
    </div>
  );
}

export function ErrorNotification({ message }) {
  return (
    <div
      style={{
        color: "red",
        border: "1px solid red",
        backgroundColor: "	#D3D3D3",
        color: "red",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <h3>{message}</h3>
    </div>
  );
}
