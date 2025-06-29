// types/post.ts
export interface TiptapContentJSON {
    type: string;
    content?: TiptapNode[];
}

export interface TiptapNode {
    type: string;
    attrs?: Record<string, any>;
    content?: TiptapNode[];
    text?: string;
}

export interface Post {
    _id?: string;
    title: string;
    local: string;
    field: string;
    content: TiptapContentJSON;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const samplePost = {
    title: "Tiptap 게시물 예시",
    local: "중원구",
    field: "electricity",
    content: {
        type: "doc",
        content: [
            {
                type: "heading",
                attrs: { level: 2 },
                content: [
                    {
                        type: "text",
                        text: "📌 게시물 시작",
                    },
                ],
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "이건 예시 게시물입니다. 아래 이미지를 보세요.",
                    },
                ],
            },
            {
                type: "image",
                attrs: {
                    src: "/uploads/sample1.jpg",
                    alt: "샘플 이미지 1",
                },
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "이미지 아래 문장입니다. 다음은 또 다른 이미지입니다.",
                    },
                ],
            },
            {
                type: "image",
                attrs: {
                    src: "/uploads/sample2.jpg",
                    alt: "샘플 이미지 2",
                },
            },
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "마무리 문장입니다. 감사합니다 🙏",
                    },
                ],
            },
        ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
