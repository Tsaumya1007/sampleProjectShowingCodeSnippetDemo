import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ language, code }) => {
  const [uCode, setCode] = useState(code || ""); // Ensure initialCode is used correctly
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   setCode(initialCode);

  //   // fetchData();
  // });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #444",
        borderRadius: "5px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? "#4CAF50" : "#333",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={uCode}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            height: "200px",
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      ) : (
        <SyntaxHighlighter language={language} style={atomDark}>
          {uCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeSnippet;
