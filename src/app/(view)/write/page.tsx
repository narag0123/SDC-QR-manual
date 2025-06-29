"use client";

import Hr_line from "@/app/components/hr_line";
import { useGlobalStore } from "@/app/(model)/data/store";
import { convertFieldNameKR2EN } from "@/app/(services)/convert/convert_fieldName";
import { useState } from "react";
import Editor from "@/app/components/editor/editor";
import { JSONContent } from "@tiptap/react";

export default function PostNew() {
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
        console.log(content);
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
                        <option value="전기">전기</option>
                        <option value="기계">기계</option>
                        <option value="통신">통신</option>
                        <option value="소방">소방</option>
                    </select>
                </div>
            </div>
            <Editor content={post} onChange={onChange} />
        </div>
    );
}
