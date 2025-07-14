"use client";

import { useGlobalStore } from "@/app/(model)/data/store";
// TODO: 글 수정 및 삭제 권한 기능 개발해야함
export default function AuthorizationPWD() {
    const { authorization, setAuthorization } =
        useGlobalStore();

    return (
        <div>
            <div className="flex flex-col items-start my-3">
                <label className="font-bold mb-1">
                    비밀번호
                </label>
                <div className="flex gap-3">
                    <input
                        type="password"
                        className="bg-grayish p-2 rounded border-black border-[1px]"
                    />
                    <button className="rounded border-black border-[1px] p-2">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
