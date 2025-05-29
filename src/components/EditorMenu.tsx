import { Editor } from "@tiptap/react";

type EditorMenuProps = {
  editor: Editor;
};

export const EditorMenu = ({ editor }: EditorMenuProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Heading 1"
      >
        <span className="font-bold text-lg">H1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Heading 2"
      >
        <span className="font-bold text-base">H2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("paragraph")
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Paragraph"
      >
        <span className="text-sm">P</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("bold")
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Bold"
      >
        <span className="font-semibold">B</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("italic")
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Italic"
      >
        <span className="italic">I</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("code")
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Code"
      >
        <span className="font-mono text-sm">{"</>"}</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 ${
          editor.isActive("bulletList")
            ? "bg-gray-100 text-blue-600"
            : "text-gray-700"
        }`}
        title="Bullet List"
      >
        <span className="text-lg">•</span>
      </button>
    </div>
  );
};
