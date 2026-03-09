import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/react";
import { useXTerm, XTerm } from "react-xtermjs";

import { useRef, useEffect } from "react";

const Terminal = () => {
  const onData = (data: string) => {
    console.log(`Received data: ${data}`);
  };

  const onResize = (event: { cols: number; rows: number }) => {
    console.log(
      `Terminal resized to ${event.cols} columns and ${event.rows} rows`,
    );
  };

  return (
    <XTerm
      options={{ cursorBlink: true }}
      style={{ width: "100%", height: "100%" }}
      listeners={{
        onData,
        onResize,
      }}
    />
  );
};

export default function Room() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount = (
    codeEditor: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editorRef.current = codeEditor;
  };

  const processCode = () => {
    console.log(editorRef.current?.getValue());
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
      <Terminal />
    </>
  );
}
