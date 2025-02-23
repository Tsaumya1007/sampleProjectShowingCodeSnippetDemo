import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ language, code }) => {
  const [code2, setCode] = useState(code || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 sec
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
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
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

      <SyntaxHighlighter language={language} style={atomDark}>
        {code2}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
