import { JSONContent } from "@tiptap/react";
import Hr_line from "../hr_line";

interface TOCItem {
    text: string;
    level: number;
    id: string;
}

export default function TableOfContents({
    content,
}: {
    content: JSONContent;
}) {
    const headings: TOCItem[] = [];

    content.content?.forEach((node, index) => {
        if (node.type === "heading" && node.attrs?.level) {
            const text =
                node.content?.map((c) => c.text).join("") ||
                "";
            headings.push({
                text,
                level: node.attrs.level,
                id: `heading-${index}`,
            });
        }
    });

    return (
        <div className="">
            <h2 className="font-bold py-2">목차</h2>
            <Hr_line />
            <ul className="text-sm py-3">
                {headings.map((item, idx) => (
                    <li
                        key={idx}
                        style={{
                            marginLeft: `${
                                (item.level - 1) * 16
                            }px`,
                        }} // 1 level = 16px 들여쓰기
                        className="my-1"
                    >
                        <a
                            // href={`#${item.id}`}
                            className="underline block"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
