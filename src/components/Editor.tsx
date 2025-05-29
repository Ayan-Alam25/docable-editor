"use client";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import { SlashCommand } from "./SlashCommand";
import { EditorMenu } from "./EditorMenu";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      BulletList,
      Placeholder.configure({
        placeholder: "Type / for commands...",
      }),
      SlashCommand,
    ],
    content: "<p>Start typing here...</p>",
  });

  if (!editor) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {editor && <EditorMenu editor={editor} />}
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[500px] border border-gray-200 rounded-lg p-6 focus:outline-none bg-white shadow-sm prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
        />
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-lg border border-gray-200">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-md hover:bg-gray-100 ${
                  editor.isActive("bold")
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <span className="font-semibold">B</span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-md hover:bg-gray-100 ${
                  editor.isActive("italic")
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <span className="italic">I</span>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded-md hover:bg-gray-100 ${
                  editor.isActive("code")
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <span className="font-mono text-sm">{"</>"}</span>
              </button>
            </div>
          </BubbleMenu>
        )}
      </div>
    </div>
  );
};
