"use client";

import Hr_line from "@/app/components/hr_line";
import { useState, useEffect } from "react";
import Editor from "@/app/components/editor/editor";
import { JSONContent } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import { convertLocalNameKR2EN } from "@/app/(services)/convert/convert_localName";
import Progressive from "@/app/components/progressive";

export default function EditPostPage() {
    const { local, field, index } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [localName, setLocalName] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [post, setPost] = useState<JSONContent | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🧠 데이터 불러오기
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(
                `/api/post/${local}/${field}/${index}`
            );
            const data = await res.json();

            setTitle(data.title);
            setLocalName(data.local);
            setFieldName(data.field);
            setPost(data.content);
        };

        fetchPost();
    }, [local, field, index]);

    // 📤 수정 요청
    const onSubmit = async () => {
        if (!title || !localName || !fieldName || !post) {
            alert(
                "제목, 지역, 분야, 본문을 모두 입력해주세요."
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(
                `/api/post/${local}/${field}/${index}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        local: convertLocalNameKR2EN(
                            localName
                        ), // ✅ 한글 → 영문 코드 변환
                        field: fieldName,
                        content: post,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "수정 실패"
                );
            }

            alert("수정 완료! 🎉");

            router.push(
                `/${convertLocalNameKR2EN(
                    localName
                )}/${fieldName}`
            );
        } catch (err: any) {
            alert(`수정 실패: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✏️ 에디터 내용 변경 핸들러
    const onChange = (content: JSONContent) => {
        setPost(content);
    };

    return (
        <div>
            <h1 className="text-[20px] font-bold py-3">
                글 수정
            </h1>
            <Hr_line />
            <div className="flex justify-around p-3">
                {/* 지역 선택 */}
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
                        onChange={(e) =>
                            setLocalName(e.target.value)
                        }
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

                {/* 분야 선택 */}
                <div className="flex items-center">
                    <label
                        htmlFor="field"
                        className="block font-semibold"
                    >
                        분야 선택:
                    </label>
                    <select
                        id="field"
                        value={fieldName}
                        onChange={(e) =>
                            setFieldName(e.target.value)
                        }
                        className="border px-4 py-2 rounded bg-grayish"
                    >
                        <option value="electricity">
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
                        </option>
                    </select>
                </div>
            </div>

            {/* 제목 */}
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
            {/* 에디터: 로드되기 전엔 보여주지 않음 */}
            {post ? (
                <Editor
                    content={post}
                    onChange={onChange}
                />
            ) : (
                <Progressive />
            )}
            {/* 제출 */}
            <div className="w-full flex justify-center">
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 w-full mt-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting
                        ? "수정 중..."
                        : "수정 완료"}
                </button>
            </div>
        </div>
    );
}
