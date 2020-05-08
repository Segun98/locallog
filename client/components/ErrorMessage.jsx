import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div>
      <div className="error-msg">
        <h3>{message}</h3>
      </div>
      <style jsx>
        {`
          .error-msg {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            width: 80%;
          }
        `}
      </style>
    </div>
  );
}
