"use client";
import {
    convertFieldEN,
    convertFieldKR,
} from "@/app/(services)/convert/convert_index";
import Hr_line from "../hr_line";
import Link from "next/link";
import { useGlobalStore } from "@/app/(model)/data/store";
import { convertLocalNameKR2EN } from "@/app/(services)/convert/convert_localName";
import { usePathname } from "next/navigation";

interface Props {
    index: number;
}

export const Odd_field = ({ index }: Props) => {
    const { localName } = useGlobalStore();
    const url: string = usePathname();
    return (
        <Link
            href={`${convertLocalNameKR2EN(
                localName
            )}/${convertFieldEN(index)}`}
            onClick={(e) => {
                if (url !== "/") {
                    e.preventDefault(); // 링크 이동 막기
                }
            }}
        >
            <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-5 ">
                    <h1 className="font-black text-[42px]">
                        0{index}
                    </h1>
                    <hr className="border-black border-l-[0.5px] h-10 my-1" />
                    <div className="font-light">
                        <span className="text-xl">
                            {convertFieldKR(index)}
                        </span>
                        <span className="text-base">
                            {convertFieldEN(
                                index
                            )?.toUpperCase()}
                        </span>
                    </div>
                </div>
                {url == "/" ? (
                    <img
                        src="/img/arrow.svg"
                        className="rotate-180"
                    />
                ) : (
                    <></>
                )}
            </div>
            <Hr_line />
        </Link>
    );
};
