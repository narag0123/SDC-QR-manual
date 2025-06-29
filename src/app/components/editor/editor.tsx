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
    const MAX_IMAGE_SIZE_MB = 25;

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
                    class: "rounded max-w-full my-2",
                },
            }),
        ],
        content: content || { type: "doc", content: [] },
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 focus:outline-none",
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
                        "이미지 크기가 너무 큽니다. 25MB 이하로 업로드해주세요."
                    );
                    return true;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    const { schema } = view.state;
                    const node = schema.nodes.image.create({
                        src: base64,
                    });
                    const transaction =
                        view.state.tr.replaceSelectionWith(
                            node
                        );
                    view.dispatch(transaction);
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
