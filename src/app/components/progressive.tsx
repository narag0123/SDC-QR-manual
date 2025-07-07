export default function Progressive() {
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
