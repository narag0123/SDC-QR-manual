import { connectDB } from "@/app/api/mongodb-config";
import { NextResponse } from "next/server";

interface Params {
    params: {
        local: string;
        field: string;
    };
}

export async function GET(
    req: Request,
    { params }: Params
) {
    try {
        const { local, field } = params;

        if (!local || !field) {
            return NextResponse.json(
                { message: "Missing parameters" },
                { status: 400 }
            );
        }

        const client = await connectDB;
        const db = client.db("sdc-qr-manual");

        // ✅ content 등 무거운 필드 제외하고 title, _id만 가져오기
        const posts = await db
            .collection(local)
            .find(
                { field },
                { projection: { _id: 1, title: 1 } }
            )
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(posts);
    } catch (error) {
        console.error("게시글 로딩 에러:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
