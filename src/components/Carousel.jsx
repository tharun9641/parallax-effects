const ITEMS = [
    { label: 'One', color: 'bg-rose-400' },
    { label: 'Two', color: 'bg-sky-400' },
    { label: 'Three', color: 'bg-emerald-400' },
    { label: 'Four', color: 'bg-amber-300' },
    { label: 'Five', color: 'bg-violet-400' },
    { label: 'Six', color: 'bg-pink-400' },
]

function Carousel() {
    return (
        <section className="flex h-screen flex-col justify-center gap-12 overflow-hidden">
            <h2 className="text-center text-5xl font-bold md:text-7xl">Carousel</h2>

            {/* The track holds the items twice; sliding it by exactly half its width makes the loop seamless */}
            <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <div
                        key={i}
                        aria-hidden={i >= ITEMS.length}
                        className={`mr-6 grid h-56 w-80 shrink-0 place-items-center rounded-2xl text-3xl font-bold text-black ${item.color}`}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Carousel
