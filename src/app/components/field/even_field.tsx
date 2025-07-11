"use client";

import {
    convertFieldEN,
    convertFieldKR,
} from "@/app/(services)/convert/convert_index";
import Hr_line from "../hr_line";
import { useGlobalStore } from "@/app/(model)/data/store";
import Link from "next/link";
import { convertLocalNameKR2EN } from "@/app/(services)/convert/convert_localName";

interface Props {
    index: number;
}

export const Even_field = ({ index }: Props) => {
    const { localName, fieldName } = useGlobalStore();

    return (
        <Link
            href={`${convertLocalNameKR2EN(
                localName
            )}/${convertFieldEN(index)}`}
        >
            {/* <Hr_line /> */}
            <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                    <img src="/img/arrow.svg" />
                </div>
                <div className="font-light flex items-center gap-5">
                    <div>
                        <span className="text-xl">
                            {convertFieldKR(index)}
                        </span>
                        <span className="text-base">
                            {convertFieldEN(
                                index
                            )?.toUpperCase()}
                        </span>
                    </div>
                    <hr className="border-black border-l-[0.5px] h-10 my-1" />
                    <h1 className="font-black text-[42px]">
                        0{index}
                    </h1>
                </div>
            </div>
            <Hr_line />
        </Link>
    );
};
