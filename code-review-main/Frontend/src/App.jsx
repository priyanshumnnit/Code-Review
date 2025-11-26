import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
  }

  return (
    <div className="page">
      <div className="panel left-panel">
        <h2 className="section-title">🧩 Code Editor</h2>

        <div className="editor-container">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 15,
              minHeight: "100%",
            }}
          />
        </div>

        <button className="review-btn" onClick={reviewCode}>
          🚀 Review Code
        </button>
      </div>

      <div className="panel right-panel">
        <h2 className="section-title">🔍 AI Review</h2>

        <div className="review-container">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;
