import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/react";

import { useRef } from "react";

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
        height="80vh"
        defaultLanguage="c"
        defaultValue="// Write code here.\\n"
        onMount={handleEditorDidMount}
      />
      <button onClick={processCode}></button>
    </>
  );
}
