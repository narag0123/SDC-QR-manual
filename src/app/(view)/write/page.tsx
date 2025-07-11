"use client";

import Hr_line from "@/app/components/hr_line";
import { useGlobalStore } from "@/app/(model)/data/store";
import {
    convertFieldNameEN2KR,
    convertFieldNameKR2EN,
} from "@/app/(services)/convert/convert_fieldName";
import { useState } from "react";
import Editor from "@/app/components/editor/editor";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { convertLocalNameKR2EN } from "@/app/(services)/convert/convert_localName";
import { field_name } from "@/app/(model)/data/index_data";
import { convertFieldEN } from "@/app/(services)/convert/convert_index";

export default function PostNew() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState("");
    const {
        localName,
        setLocalName,
        fieldName,
        setFieldName,
    } = useGlobalStore();

    const [post, setPost] = useState<JSONContent | null>(
        null
    );
    const onChange = (content: JSONContent) => {
        setPost(content);
    };
    const router = useRouter();

    const onSubmit = async () => {
        if (!title || !localName || !fieldName || !post) {
            alert(
                "제목, 지역, 분야, 본문을 모두 입력해주세요."
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    local: localName,
                    field: fieldName,
                    content: post,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "업로드 실패"
                );
            }

            alert("업로드 성공! 🎉");
            router.push(
                `/${convertLocalNameKR2EN(
                    localName
                )}/${fieldName}`
            );
        } catch (err: any) {
            alert(`업로드 실패: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="text-[20px] font-bold py-3">
                글쓰기
            </h1>
            <Hr_line />
            <div className="flex justify-around p-3">
                <div className="flex items-center">
                    <label
                        htmlFor="district"
                        className="block font-semibold"
                    >
                        지역 선택:
                    </label>

                    <select
                        id="district"
                        value={localName}
                        onChange={(e) => {
                            setLocalName(e.target.value);
                        }}
                        className="border px-4 py-2 rounded bg-grayish"
                    >
                        <option value="분당구">
                            분당구
                        </option>
                        <option value="중원구">
                            중원구
                        </option>
                        <option value="수정구">
                            수정구
                        </option>
                    </select>
                </div>

                <div className="flex items-center">
                    <label
                        htmlFor="district"
                        className="block font-semibold"
                    >
                        분야 선택:
                    </label>

                    <select
                        id="district"
                        value={fieldName}
                        onChange={(e) => {
                            setFieldName(e.target.value);
                        }}
                        className="border px-4 py-2 rounded bg-grayish"
                    >
                        {field_name.map((e, i) => {
                            return (
                                <option
                                    key={i}
                                    value={`${convertFieldEN(
                                        i + 1
                                    )}`}
                                >
                                    {e}
                                </option>
                            );
                        })}
                        {/* <option value="electricity">
                            전기
                        </option>
                        <option value="mechanic">
                            기계
                        </option>
                        <option value="telecommunication">
                            통신
                        </option>
                        <option value="fireservice">
                            소방
                        </option> */}
                    </select>
                </div>
            </div>
            {/* 제목 입력 */}
            <div className="py-3">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="w-full border-[1px] border-[#181818] rounded bg-grayish px-3 py-2"
                />
            </div>
            {/* 에디터 */}
            <Editor content={post} onChange={onChange} />
            {/* 제출 버튼 */}
            <div className="w-full flex justify-center">
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 w-full mt-2 rounded  hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting
                        ? "업로드 중..."
                        : "업로드"}
                </button>
            </div>
        </div>
    );
}
