"use client";
import { Odd_field } from "@/app/components/field/odd_field";
import Hr_line from "@/app/components/hr_line";

import { samplePost } from "@/app/(model)/data/dummy/dummyfile";
import { useGlobalStore } from "@/app/(model)/data/store";
import { convertFieldNameKR2EN } from "@/app/(services)/convert/convert_fieldName";

import { convertFieldIndex } from "@/app/(services)/convert/convert_index";
import { convertLocalNameEN2KR } from "@/app/(services)/convert/convert_localName";
import {
    useParams,
    usePathname,
    useRouter,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import Progressive from "@/app/components/progressive";

interface Props {
    local: string;
    field: string;
}

interface Post {
    _id: string;
    title: string;
    local: string;
    field: string;
    content: JSONContent;
    createdAt: string;
    updatedAt: string;
}

export default function FieldPage({
    params,
}: {
    params: Props;
}) {
    const { local, field } = params;
    const {
        localName,
        setLocalName,
        fieldName,
        setFieldName,
    } = useGlobalStore();
    const localPathName = usePathname().split("/")[1];
    const router = useRouter();
    const arr = [samplePost];
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setLocalName(convertLocalNameEN2KR(localPathName));
        setFieldName(field);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    `/api/post/${local}/${field}`
                );
                const data = await res.json();
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("게시글 로딩 실패:", error);
            }
        };

        fetchPosts();
    }, [local, field]);

    return (
        <div>
            <Odd_field index={convertFieldIndex(field)} />
            <div
                className="w-full text-right text-[15px] p-3 font-bold"
                onClick={() => {
                    router.push("/write");
                }}
            >
                + 새글작성
            </div>
            <Hr_line />

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-3">
                {posts?.map((e, i) => {
                    return (
                        <a
                            href={`/${local}/${field}/${i}`}
                            className="flex flex-col items-center justify-start my-3 text-center"
                            key={i}
                        >
                            <img src="/img/file.svg" />
                            <p>{e?.title}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
