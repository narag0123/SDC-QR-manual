import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    ImagePlus,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
// import TextAlign from "@tiptap/extension-text-align";
// import Highlight from "@tiptap/extension-highlight";

export default function MenuBar({
    editor,
}: {
    editor: Editor | null;
}) {
    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 1 })
                    .run(),
            pressed: editor.isActive("heading", {
                level: 1,
            }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run(),
            pressed: editor.isActive("heading", {
                level: 2,
            }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 3 })
                    .run(),
            pressed: editor.isActive("heading", {
                level: 3,
            }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .setTextAlign("left")
                    .run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .setTextAlign("center")
                    .run(),
            pressed: editor.isActive({
                textAlign: "center",
            }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .setTextAlign("right")
                    .run(),
            pressed: editor.isActive({
                textAlign: "right",
            }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleBulletList()
                    .run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleOrderedList()
                    .run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () =>
                editor
                    .chain()
                    .focus()
                    .toggleHighlight()
                    .run(),
            pressed: editor.isActive("highlight"),
        },

        // {
        //     icon: <ImagePlus className="size-4" />,
        //     onClick: async () => {
        //         const input =
        //             document.createElement("input");
        //         input.type = "file";
        //         input.accept = "image/*";

        //         input.onchange = () => {
        //             const file = input.files?.[0];
        //             if (!file) return;

        //             const reader = new FileReader();
        //             reader.onload = () => {
        //                 const base64 =
        //                     reader.result as string;
        //                 editor
        //                     .chain()
        //                     .focus()
        //                     .setImage({ src: base64 })
        //                     .run();
        //             };
        //             reader.readAsDataURL(file);
        //         };

        //         input.click();
        //     },
        //     pressed: false, // 이미지에는 pressed 상태 필요 없음
        // },
        {
            icon: <ImagePlus className="size-4" />,
            onClick: async () => {
                const input =
                    document.createElement("input");
                input.type = "file";
                input.accept = "image/*";

                input.onchange = () => {
                    const file = input.files?.[0];
                    if (!file) return;

                    if (file.size > 5 * 1024 * 1024) {
                        alert(
                            "이미지 크기가 너무 큽니다. 5MB 이하로 업로드해주세요."
                        );
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 =
                            reader.result as string;
                        editor
                            .chain()
                            .focus()
                            .setImage({ src: base64 })
                            .run();
                    };
                    reader.readAsDataURL(file);
                };

                // ✅ 모바일 사파리 대응 (input을 DOM에 append하고 다시 제거)
                document.body.appendChild(input);
                input.click();
                document.body.removeChild(input);
            },
            pressed: false,
        },
    ];

    return (
        <div className="border-[1px] border-[#181818] rounded-md p-1 mb-1 bg-grayish  space-x-2 z-50">
            {Options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    );
}
