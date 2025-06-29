"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    useEditor,
    EditorContent,
    JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Hr_line from "@/app/components/hr_line";
import TableOfContents from "@/app/components/editor/tableOfContents";

interface Post {
    _id: string;
    title: string;
    local: string;
    field: string;
    content: JSONContent;
    createdAt: string;
    updatedAt: string;
}

export default function PostDetailPage() {
    const { local, field, index } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    // const editor = useEditor({
    //     editable: false,
    //     extensions: [
    //         StarterKit,
    //         Highlight,
    //         Image.configure({
    //             inline: false,
    //             HTMLAttributes: {
    //                 class: "w-full h-auto rounded my-2",
    //             },
    //         }),
    //         TextAlign.configure({
    //             types: ["heading", "paragraph"],
    //         }),
    //     ],
    //     content: {
    //         type: "doc",
    //         content: [],
    //     }, // 초기 content 비워둠
    // });
    const editor = useEditor({
        editable: false, // 읽기 전용
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
        content: {
            type: "doc",
            content: [],
        },
        editorProps: {
            attributes: {
                class: "prose [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl max-w-full [&_img]:block",
            },
        },
    });

    // 🧠 fetchPost 후 editor에 수동으로 content 적용
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(
                `/api/post/${local}/${field}/${index}`
            );
            const data = await res.json();
            setPost(data);
        };

        fetchPost();
    }, [local, field, index]);

    useEffect(() => {
        if (editor && post?.content) {
            // id 추가 (index 기준)
            const newContent = { ...post.content };
            let headingIndex = 0;
            newContent.content?.forEach((node) => {
                if (node.type === "heading") {
                    node.attrs = {
                        ...(node.attrs || {}),
                        id: `heading-${headingIndex++}`,
                    };
                }
            });

            editor.commands.setContent(newContent);
        }
    }, [editor, post]);

    if (!post || !editor) return <div>불러오는 중...</div>;

    // TOC 필요 여부 판단
    const shouldRenderTOC =
        post?.content?.content?.some(
            (node) =>
                node.type === "heading" &&
                [1, 2].includes(node.attrs?.level)
        ) ?? false;

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-3">
                    {post.title}
                </h1>
                <div className="flex gap-3">
                    <div className="min-h-full border-[0.5px] border-black"></div>
                    <button>수정하기</button>
                </div>
            </div>
            <Hr_line />
            {shouldRenderTOC ? (
                <TableOfContents content={post.content} />
            ) : (
                <p className="py-3">목차 없음</p>
            )}

            <Hr_line />
            <h2 className="font-bold py-3">본문</h2>
            <Hr_line />
            <div className="mb-3"></div>
            <EditorContent
                editor={editor}
                className="prose [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl max-w-full [&_img]:block"
            />
        </div>
    );
}
