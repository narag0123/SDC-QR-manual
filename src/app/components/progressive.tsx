"use client";

import { useEffect, useState } from "react";
export default function Progressive() {
    // const [show, setShow] = useState(false);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShow(true);
    //     }, 1000); // 1초 딜레이 후 로딩 표시

    //     return () => clearTimeout(timeout); // 언마운트 시 정리
    // }, []);

    // if (!show) return null;

    return (
        <div className="flex flex-col items-center py-10 text-[#181818]">
            <span className="text-lg font-semibold mb-2">
                불러오는 중
            </span>
            <div className="flex space-x-2">
                <span className="w-3 h-3 bg-[#181818] rounded-full animate-dot-bounce [animation-delay:-0.32s]" />
                <span className="w-3 h-3 bg-[#181818] rounded-full animate-dot-bounce [animation-delay:-0.16s]" />
                <span className="w-3 h-3 bg-[#181818] rounded-full animate-dot-bounce" />
            </div>
        </div>
    );
}
