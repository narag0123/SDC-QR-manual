// ✅ editor.tsx
"use client";

import {
    useEditor,
    EditorContent,
    JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
    content: JSONContent | null;
    onChange: (content: JSONContent) => void;
}

export default function Editor({
    content,
    onChange,
}: RichTextEditorProps) {
    const MAX_IMAGE_SIZE_MB = 5;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            Image.configure({
                inline: false,
                HTMLAttributes: {
                    class: "w-full h-auto rounded my-2",
                },
            }),
        ],
        content: content || { type: "doc", content: [] },
        editorProps: {
            attributes: {
                class: "min-h-[50vh] sm:min-h-55vh] border-[#181818] border-[1px] rounded-md bg-grayish py-2 px-3 focus:outline-none overflow-scroll scrollbar-hide",
            },
            handleDrop(view, event) {
                const file = event.dataTransfer?.files?.[0];

                if (
                    !file ||
                    !file.type.startsWith("image/")
                )
                    return false;

                if (
                    file.size >
                    MAX_IMAGE_SIZE_MB * 1024 * 1024
                ) {
                    alert(
                        "이미지 크기가 너무 큽니다. 5MB 이하로 업로드해주세요."
                    );
                    return true;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result as string;

                    // ✅ 체이닝으로 삽입 (가장 안전)
                    editor
                        ?.chain()
                        .focus()
                        .setImage({ src: base64 })
                        .run();
                };
                reader.readAsDataURL(file);

                return true;
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl max-w-full"
            />
        </div>
    );
}
