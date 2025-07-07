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
import { useEffect, useRef } from "react";

interface RichTextEditorProps {
    content: JSONContent | null;
    onChange: (content: JSONContent) => void;
}

export default function Editor({
    content,
    onChange,
}: RichTextEditorProps) {
    const MAX_IMAGE_SIZE_MB = 5;
    const didSetContentRef = useRef(false); // 처음에만 setContent 하기 위한 ref

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
                class: "min-h-[50vh] sm:min-h-[55vh] border-[#181818] border-[1px] rounded-md bg-grayish py-2 px-3 focus:outline-none overflow-scroll scrollbar-hide",
            },

            // ✅ 이미지 드래그 앤 드롭
            handleDrop(view, event) {
                const files = event.dataTransfer?.files;
                if (!files || files.length === 0)
                    return false;

                Array.from(files).forEach((file, index) => {
                    if (!file.type.startsWith("image/"))
                        return;

                    if (
                        file.size >
                        MAX_IMAGE_SIZE_MB * 1024 * 1024
                    ) {
                        alert(
                            "이미지 크기가 너무 큽니다. 5MB 이하로 업로드해주세요."
                        );
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 =
                            reader.result as string;
                        editor?.commands.insertContent({
                            type: "image",
                            attrs: { src: base64 },
                        });
                    };
                    reader.readAsDataURL(file);
                });

                return true;
            },

            // ✅ 이미지 복사 붙여넣기
            handlePaste(view, event) {
                const items = event.clipboardData?.items;
                if (!items || items.length === 0)
                    return false;

                let handled = false;

                Array.from(items).forEach((item, index) => {
                    if (!item.type.startsWith("image/"))
                        return;

                    const file = item.getAsFile();
                    if (!file) return;

                    if (
                        file.size >
                        MAX_IMAGE_SIZE_MB * 1024 * 1024
                    ) {
                        console.warn(
                            `클립보드 이미지 ${
                                index + 1
                            } 너무 큼`
                        );
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 =
                            reader.result as string;
                        console.log(
                            `클립보드 이미지 ${
                                index + 1
                            } 삽입 시도`
                        );

                        // insertContent를 통해 순차 삽입
                        editor?.commands.insertContent({
                            type: "image",
                            attrs: { src: base64 },
                        });

                        console.log(
                            `클립보드 이미지 ${
                                index + 1
                            } 삽입 완료`
                        );
                    };
                    reader.readAsDataURL(file);

                    handled = true;
                });

                return handled;
            },
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
    });

    useEffect(() => {
        if (
            editor &&
            content &&
            !didSetContentRef.current
        ) {
            editor.commands.setContent(content, false);
            didSetContentRef.current = true;
        }
    }, [editor, content]);

    return (
        <div className="relative">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl max-w-full"
            />
        </div>
    );
}
