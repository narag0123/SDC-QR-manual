"use client";
import { usePathname } from "next/navigation";

import { useGlobalStore } from "../(model)/data/store";
import Hr_line from "../components/hr_line";
import { useEffect } from "react";
import { convertLocalNameEN2KR } from "../(services)/convert/convert_localName";

export default function Header() {
    const { localName, setLocalName } = useGlobalStore();
    const url: string = usePathname();

    return (
        <header>
            <Hr_line />
            <div className="flex justify-between items-center">
                <a href="/">
                    <img
                        className="my-3 mx-1"
                        src="/img/square.grid.3x3.png"
                        width={14}
                        height={14}
                    />
                </a>
                <p className="font-light text-[15px]">
                    {url == "/"
                        ? "도로시설팀"
                        : `${localName}`}
                </p>
            </div>
            <Hr_line />
        </header>
    );
}
