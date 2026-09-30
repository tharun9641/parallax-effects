import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function ScrollingAnimation() {
    const parallaxRef = useRef(null)   // Parallax's API object
    const containerRef = useRef(null)  // the real scrolling <div>

    // Must come BEFORE useScroll so containerRef is set when useScroll attaches
    useLayoutEffect(() => {
        containerRef.current = parallaxRef.current.container.current
    }, [])

    const { scrollYProgress } = useScroll({ container: containerRef })

    // 5 pages means 4 pages of scroll: 0.25 = page 1, 0.5 = page 2, 0.75 = page 3
    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.75])
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.85])

    return (
        <section className="relative w-full h-screen">
            <Parallax pages={5} ref={parallaxRef}>
                <ParallaxLayer
                    offset={0}
                    sticky={{ start: 0, end: 2 }}
                    className="flex items-center justify-center"
                >
                    <motion.div
                        style={{ scale: scale1 }}
                        className="w-[80%] aspect-video bg-red-400"
                    />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    sticky={{ start: 1, end: 2 }}
                    className="flex items-center justify-center"
                >
                    <motion.div
                        style={{ scale: scale2 }}
                        className="w-[80%] aspect-video bg-blue-400"
                    />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    sticky={{ start: 2, end: 2 }}
                    className="flex items-center justify-center"
                >
                    <motion.div
                        className="w-[80%] aspect-video bg-yellow-400"
                    />
                </ParallaxLayer>


            </Parallax>
        </section>
    )
}

export default ScrollingAnimation