export default function HomePageLoader() {
  return (
    <section className="grid gap-6 grid-cols-[repeat(auto-fill,342px)]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[513px] w-[342px] rounded-xl bg-gray-300
                     relative overflow-hidden"
        >
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      ))}
    </section>
  );
}
