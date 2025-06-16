export default function DetialsPageLoader() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="h-[513px] w-[342px] rounded-xl bg-gray-300/60 relative overflow-hidden">
        <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="flex-1 space-y-4">
        <div className="h-6 w-3/4 bg-gray-300/60 rounded" />
        <div className="h-5 w-1/2 bg-gray-300/60 rounded" />
        <div className="h-5 w-2/3 bg-gray-300/60 rounded" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-300 rounded" />
        ))}

        <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
