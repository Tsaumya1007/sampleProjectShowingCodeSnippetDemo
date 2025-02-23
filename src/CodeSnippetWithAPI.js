import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippetWithAPI = ({ url, language = "json" }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setCode(JSON.stringify(data, null, 2)); // Pretty format JSON
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : isEditing ? (
        <textarea
          value={code}
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
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeSnippetWithAPI;
