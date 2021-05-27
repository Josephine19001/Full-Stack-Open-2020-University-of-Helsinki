import React from "react";

export function SuccessNotification({message}) {
  return (
    <div
      style={{
        color: "green",
        border: "1px solid green"
      }}
    >
      <p>{message}</p>
    </div>
  );
}

export function ErrorNotification({ message }) {
  return (
    <div
      style={{ color: "red", border: "1px solid red" }}
    >
      <p>{message}</p>
    </div>
  );
}
