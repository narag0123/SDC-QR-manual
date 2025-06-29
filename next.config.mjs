/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
            sizeLimit: "25mb", // 이미지 최대 크기에 맞게 늘려줌
        },
    },
};

export default nextConfig;
