// ✅ 수정된 mongodb-config.ts

import { MongoClient } from "mongodb";

const url = process.env.NEXT_PUBLIC_MONGODB_URL;

if (!url) {
    throw new Error(
        "❌ MongoDB URL이 설정되지 않았습니다."
    );
}

declare global {
    var _mongo: Promise<MongoClient> | undefined;
}

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect(); // ← options 제거
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url).connect(); // ← options 제거
}

export { connectDB };
