import { Editor } from "@/components/Editor";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Docable Editor
          </h1>
          <p className="text-gray-600">
            A clean, Notion-style editor built with Tiptap
          </p>
        </div>
        <Editor />
      </div>
    </main>
  );
}
