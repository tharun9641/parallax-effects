import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// speed: how far (in vh) the layer travels over the section's scroll. Bigger = feels closer.
const LAYERS = [
    { speed: 20, className: 'left-[8%] top-[15%] w-40 h-56 bg-amber-300' },
    { speed: -40, className: 'right-[10%] top-[10%] w-56 h-40 bg-violet-400' },
    { speed: 60, className: 'left-[20%] bottom-[5%] w-64 h-44 bg-cyan-300' },
    { speed: -80, className: 'right-[22%] bottom-[12%] w-36 h-52 bg-pink-400' },
]

function Layer({ progress, speed, className }) {
    const y = useTransform(progress, [0, 1], [`${speed}vh`, `${-speed}vh`])
    return <motion.div style={{ y }} className={`absolute rounded-2xl shadow-xl ${className}`} />
}

function ParallaxSection() {
    const ref = useRef(null)
    // Track the section from when it enters the bottom of the viewport until it leaves the top
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

    const titleY = useTransform(scrollYProgress, [0, 1], ['-30vh', '30vh'])
    const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

    return (
        <section ref={ref} className="relative h-[200vh] overflow-hidden">
            <motion.h2
                style={{ y: titleY, scale: titleScale }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-7xl font-bold md:text-9xl"
            >
                Parallax
            </motion.h2>
            {LAYERS.map((layer, i) => (
                <Layer key={i} progress={scrollYProgress} {...layer} />
            ))}
        </section>
    )
}

export default ParallaxSection
