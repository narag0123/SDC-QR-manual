import { connectDB } from "@/app/api/mongodb-config";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { convertLocalNameEN2KR } from "@/app/(services)/convert/convert_localName";
// app/api/post/[local]/[field]/[index]/route.ts

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
            .sort({ title: 1, createdAt: -1 })
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
export async function DELETE(
    req: Request,
    {
        params,
    }: {
        params: {
            local: string;
            field: string;
            index: string;
        };
    }
) {
    const { local, field, index } = params;

    try {
        const idx = parseInt(index);
        if (!local || !field || isNaN(idx)) {
            return NextResponse.json(
                { message: "Invalid parameters" },
                { status: 400 }
            );
        }

        const client = await connectDB;
        const db = client.db("sdc-qr-manual");

        // 먼저 해당 게시글을 찾음
        const posts = await db
            .collection(local)
            .find({ field })
            .sort({ createdAt: -1 })
            .toArray();

        const postToDelete = posts[idx];
        if (!postToDelete) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        // 해당 게시글의 _id를 기준으로 삭제
        await db.collection(local).deleteOne({
            _id: new ObjectId(postToDelete._id),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("삭제 실패:", error);
        return NextResponse.json(
            { error: "삭제 실패" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    {
        params,
    }: {
        params: {
            local: string;
            field: string;
            index: string;
        };
    }
) {
    const {
        local: prevLocal,
        field: prevField,
        index,
    } = params;
    const idx = parseInt(index);
    const body = await req.json();

    try {
        const client = await connectDB;
        const db = client.db("sdc-qr-manual");

        // 🔍 이전 컬렉션, 이전 field 기준으로 찾아야 함
        const posts = await db
            .collection(prevLocal)
            .find({ field: prevField })
            .sort({ createdAt: -1 })
            .toArray();

        const targetPost = posts[idx];
        if (!targetPost) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // ✅ local, field가 바뀐 경우 "컬렉션 이동" 처리
        const isLocalChanged = body.local !== prevLocal;

        if (isLocalChanged) {
            // 👉 1. 새 컬렉션에 insert
            await db.collection(body.local).insertOne({
                title: body.title,
                field: body.field,
                local: convertLocalNameEN2KR(body.local),
                content: body.content,
                createdAt: targetPost.createdAt,
                updatedAt: new Date(),
            });

            // 👉 2. 이전 컬렉션에서 delete
            await db.collection(prevLocal).deleteOne({
                _id: new ObjectId(targetPost._id),
            });
        } else {
            // 👉 지역은 그대로고 field만 바뀐 경우 update
            await db.collection(prevLocal).updateOne(
                { _id: new ObjectId(targetPost._id) },
                {
                    $set: {
                        title: body.title,
                        field: body.field,
                        local: convertLocalNameEN2KR(
                            body.local
                        ),
                        content: body.content,
                        updatedAt: new Date(),
                    },
                }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("수정 실패", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
