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
import React, { useEffect } from "react";

interface Props {
    local: string;
    field: string;
}

export default function FieldPage({
    params,
}: {
    params: Props;
}) {
    const { local, field } = params;
    const { localName, setLocalName, fieldName } =
        useGlobalStore();
    const localPathName = usePathname().split("/")[1];
    const router = useRouter();
    const arr = [samplePost];

    useEffect(() => {
        setLocalName(convertLocalNameEN2KR(localPathName));
    }, []);

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
                {arr.map((e, i) => {
                    return convertLocalNameEN2KR(local) ==
                        e?.local && field == e?.field ? (
                        <div
                            className="flex flex-col items-center justify-center my-3"
                            key={i}
                        >
                            <img src="/img/file.svg" />
                            <p>{e?.title}</p>
                        </div>
                    ) : (
                        <React.Fragment
                            key={i}
                        ></React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
