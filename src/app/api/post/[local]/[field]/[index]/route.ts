import { connectDB } from "@/app/api/mongodb-config";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Params {
    params: {
        local: string;
        field: string;
        index: string;
    };
}

export async function GET(
    req: Request,
    { params }: Params
) {
    try {
        const { local, field, index } = params;
        const idx = parseInt(index);

        if (!local || !field || isNaN(idx)) {
            return NextResponse.json(
                { message: "Invalid parameters" },
                { status: 400 }
            );
        }

        const client = await connectDB;
        const db = client.db("sdc-qr-manual");

        const posts = await db
            .collection(local)
            .find({ field })
            .sort({ createdAt: -1 })
            .toArray();

        if (!posts[idx]) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(posts[idx]);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
