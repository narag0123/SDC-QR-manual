import { NextResponse } from "next/server";
import { connectDB } from "../mongodb-config";
import { convertLocalNameKR2EN } from "@/app/(services)/convert/convert_localName";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, local, field, content } = body;

        if (!title || !local || !field || !content) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        const client = await connectDB;
        const db = client.db("sdc-qr-manual");

        const result = await db
            .collection(convertLocalNameKR2EN(local))
            .insertOne({
                title,
                local,
                field,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        return NextResponse.json({
            message: "Success",
            postId: result.insertedId,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
