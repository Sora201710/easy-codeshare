import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useXTerm } from "react-xtermjs";

import { useRef, useEffect, useState } from "react";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

type TerminalProps = {
  terminalText: string;
};

const Terminal = ({ terminalText }: TerminalProps) => {
  const { instance, ref } = useXTerm();

  useEffect(() => {
    instance?.clear();
    instance?.writeln(terminalText);
  }, [terminalText]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default function Room() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const [consoleOutput, setConsoleOutput] = useState(
    "Welcome to EasyCodeShare!",
  );
  const handleEditorDidMount = (codeEditor: editor.IStandaloneCodeEditor) => {
    editorRef.current = codeEditor;
  };

  const processCode = async () => {
    const code_text = editorRef.current?.getValue();
    const res = await fetch("http://127.0.0.1:8000/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code_text: code_text }),
    });
    const data = await res.json();
    setConsoleOutput(data.code);
  };

  return (
    <>
      <Editor
        height="50vh"
        defaultLanguage="c"
        defaultValue="// Write code here.\\n"
        onMount={handleEditorDidMount}
      />
      <button onClick={processCode}></button>
      <Terminal terminalText={consoleOutput} />
      <div>
        <div style={{ width: "100%", height: "500px" }}>
          <Tldraw />
        </div>
      </div>
    </>
  );
}
