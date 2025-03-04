"use client"

import { motion, useSpring, useScroll } from "motion/react"
// import Home from "../pages/Home"
import MainLayout from "../layouts/MainLayout"

export default function ScrollLinked() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#ff0088",
                    zIndex:999
                }}
            />
            {/* <Content /> */}
            {/* <Home></Home> */}
            <MainLayout></MainLayout>
        </>
    )
}