import {useEffect, useRef, useState} from 'preact/hooks';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
	isSavedCallBack: (saved: boolean) => void;
}

export function MonacoEditor({ isSavedCallBack }: MonacoEditorProps) {
	const editorContainer = useRef(null);
	const editorRef = useRef(null);
	const [isSaved, setIsSaved] = useState<boolean>(true);

	monaco.editor.defineTheme("dark-neutral", {
		base: "vs-dark",
		inherit: true,
		rules: [],
		colors: {
			"editor.background": "#0E0E0E",
			"editor.foreground": "#FFFFFF",

			"editorLineNumber.foreground": "#5A5A5A",
			"editorLineNumber.activeForeground": "#FFFFFF",

			"editorCursor.foreground": "#FFFFFF",
			"editor.selectionBackground": "#2A2A2A",
			"editor.lineHighlightBackground": "#1A1A1A",

			"editorWhitespace.foreground": "#2B2B2B",
			"editorIndentGuide.background": "#2B2B2B",
		},
	});


	useEffect(() => {

		if (editorContainer.current) {
			editorRef.current = monaco.editor.create(editorContainer.current, {
				value: '#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n'.trim(),
				language: 'c',
				theme: 'dark-neutral',
				automaticLayout: true,
				fontFamily: "JetBrains Mono, Fira Code, monospace",
				fontSize: 14,
				minimap: { enabled: false },
				cursorBlinking: "smooth",
				renderLineHighlight: "all",
			});

			editorRef.current.onDidChangeModelContent(() => {
				isSavedCallBack(false);
				setIsSaved(false);
			});

			return () => {
				editorRef.current?.dispose();
			};
		}
	}, []);

	// every 10s save content
	useEffect(() => {
		const interval = setInterval(() => {
			if (isSaved) return;

			if (editorRef.current) {
				// TODO
				console.log("Saving content:", editorRef.current.getValue());
				isSavedCallBack(true);
				setIsSaved(true);
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [isSavedCallBack]);

	return <div ref={editorContainer} className="w-full h-full" />;
}
