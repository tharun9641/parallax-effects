import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

const CARDS = [
    { title: 'Design', color: 'bg-rose-400' },
    { title: 'Build', color: 'bg-sky-400' },
    { title: 'Ship', color: 'bg-emerald-400' },
]

function RotatingCard({ progress, index, total, card }) {
    const slot = 1 / total
    const start = index * slot

    // Within this card's slot: rotate in (0–35%), hold in the centre (35–65%), rotate out (65–100%)
    const range = [start, start + slot * 0.35, start + slot * 0.65, start + slot]

    const x = useTransform(progress, range, ['-110vw', '0vw', '0vw', '-110vw'])
    const rotate = useTransform(progress, range, [-60, 0, 0, -60])
    const opacity = useTransform(progress, range, [0, 1, 1, 0])

    return (
        <motion.div
            style={{ x, rotate, opacity, transformOrigin: 'bottom left' }}
            className={`col-start-1 row-start-1 grid w-[70vw] max-w-4xl aspect-video place-items-center rounded-3xl text-5xl font-bold text-black shadow-2xl md:text-7xl ${card.color}`}
        >
            {card.title}
        </motion.div>
    )
}

function RotateSection() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

    return (
        // One viewport of scroll per card, plus one so the last card can leave
        <section ref={ref} style={{ height: `${(CARDS.length + 1) * 100}vh` }} className="relative">
            <div className="sticky top-0 grid h-screen place-items-center overflow-hidden">
                {CARDS.map((card, i) => (
                    <RotatingCard key={card.title} progress={progress} index={i} total={CARDS.length} card={card} />
                ))}
            </div>
        </section>
    )
}

export default RotateSection
