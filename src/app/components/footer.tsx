"use client";

import React from "react";
import { useGlobalStore } from "../(model)/data/store";

export default function Footer() {
    const { localName, setLocalName } = useGlobalStore();
    const localNameArr = ["분당구", "중원구", "수정구"];

    return (
        <footer className="border-black border-y-[0.5px] absolute bottom-0 flex justify-around mx-auto items-center w-full max-w-[800px]">
            {localNameArr.map((e, i) => {
                return (
                    <React.Fragment key={i}>
                        <div
                            onClick={() => {
                                setLocalName(e);
                            }}
                            className={`w-1/3 h-full border-r-[0.5px] border-black flex items-center justify-center p-5 
                                ${
                                    localName == e
                                        ? "bg-greenish"
                                        : ""
                                }
                                ${
                                    i == 0
                                        ? "border-black border-l-[0.5px]"
                                        : ""
                                }
                                
                                `}
                        >
                            {e}
                        </div>
                    </React.Fragment>
                );
            })}
        </footer>
    );
}
