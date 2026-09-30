import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const COLORS = ['bg-red-400', 'bg-blue-400', 'bg-green-400']

function Card({ progress, index, total, color }) {
    const slot = 1 / total
    const start = index * slot

    // inside this card's slot: enter 0-40%, hold 40-60%, exit 60-100%
    const range = [
        start,
        start + slot * 0.4,
        start + slot * 0.6,
        start + slot,
    ]

    const x = useTransform(progress, range, ['-70vw', '0vw', '0vw', '-70vw'])
    const y = useTransform(progress, range, ['70vh', '0vh', '0vh', '-70vh'])
    const rotate = useTransform(progress, range, [25, 0, 0, -25])

    return (
        <motion.div
            style={{ x, y, rotate }}
            className={`col-start-1 row-start-1 w-[60vw] aspect-video ${color}`}
        />
    )
}

function RotatingAnimation() {
    const parallaxRef = useRef(null)
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        containerRef.current = parallaxRef.current.container.current
    }, [])

    const { scrollYProgress } = useScroll({ container: containerRef })
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

    return (
        <section className="relative w-full h-screen">
            <Parallax pages={4} ref={parallaxRef}>
                <ParallaxLayer
                    offset={0}
                    sticky={{ start: 0, end: 3 }}
                    className="grid place-items-center overflow-hidden"
                >
                    {COLORS.map((color, i) => (
                        <Card
                            key={color}
                            progress={progress}
                            index={i}
                            total={COLORS.length}
                            color={color}
                        />
                    ))}
                </ParallaxLayer>
            </Parallax>
        </section>
    )
}

export default RotatingAnimation