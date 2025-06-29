"use client";
import Image from "next/image";
import Hr_line from "./components/hr_line";
import Header from "./components/header";
import Footer from "./components/footer";
import { Odd_field } from "./components/field/odd_field";
import { Even_field } from "./components/field/even_field";
import { field_name } from "./(model)/data/index_data";
import React, { useEffect } from "react";
import { useGlobalStore } from "./(model)/data/store";

export default function Home() {
    return (
        <div className="h-full w-full">
            <h1 className="text-6xl font-thin my-5 leading-tight">
                SDC 자동제어 <br />
                매뉴얼
            </h1>
            <Hr_line />

            <div className="w-full">
                {field_name.map((e, i) => {
                    return (
                        <React.Fragment key={i}>
                            {i % 2 ? (
                                <Even_field index={i + 1} />
                            ) : (
                                <Odd_field index={i + 1} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="w-full flex items-center justify-center">
                <Footer />
            </div>
        </div>
    );
}
