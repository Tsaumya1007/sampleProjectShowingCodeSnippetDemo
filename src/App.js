import React from "react";
import CodeSnippet from "./CodeSnippet";
import CodeSnippett from "./CodeSnippett";
import CodeSnippetWithAPI from "./CodeSnippetWithAPI";

const sampleCode = `
function greet() {
    console.log("Hello, World!");
}
`;

const App = () => {
  return (
    <div>
      <h2>Code Snippet Example</h2>
      <CodeSnippet language="javascript" code={sampleCode} />
      <h2>Code Snippet Example</h2>
      <CodeSnippett language="javascript" code={sampleCode} />
      <h2>API Data in Code Snippet</h2>
      <CodeSnippetWithAPI url="https://jsonplaceholder.typicode.com/todos/1" />
    </div>
  );
};

export default App;
