import { Button } from "@/components/ui/button";
import { HandCoins, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ColourfulText } from "@/components/ui/colourful-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto w-full max-w-2xl px-2 sm:px-8 flex flex-col items-center justify-center min-h-[70vh]">
            {/* Headings: Centered on desktop, left on mobile */}
            <div className="w-full py-4 flex flex-col gap-2">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center gap-2 sm:gap-4 py-2 text-2xl sm:text-4xl md:text-5xl font-bold 
                        sm:justify-center sm:text-center text-left"
                > 
                    <ColourfulText text="Send"/>
                    <Send className="size-7 sm:size-8"/> 
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                    className="flex items-center gap-2 sm:gap-4 py-2 text-2xl sm:text-4xl md:text-5xl font-bold 
                        sm:justify-center sm:text-center text-left"
                > 
                    <ColourfulText text="Receive"/> 
                    <HandCoins className="size-7 sm:size-8"/> 
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
                    className="py-2 text-xl sm:text-2xl md:text-3xl font-semibold 
                        sm:justify-center sm:text-center text-left"
                > 
                    <ColourfulText text="Manage Money Seamlessly"/>
                </motion.div>
            </div>

            {/* Get Started Button */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.9 }}
                className="w-full flex flex-col items-center"
            >
                <div className="relative flex justify-center w-full mt-8 mb-8">
                    <HoverBorderGradient className="w-full max-w-xs rounded-2xl">
                        <Button
                            variant={"ghost"}
                            onClick={() => navigate("/signin")}
                            className="w-full text-white px-8 py-5 rounded-2xl text-lg sm:text-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{ background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)" }}
                        >
                            Get Started
                        </Button> 
                    </HoverBorderGradient>
                </div>
                {/* Feature List: horizontal on desktop, vertical on mobile */}
                <ul className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-2 mb-8">
                    <li className="w-full sm:w-auto">
                        <div className="flex items-center justify-start sm:justify-center bg-muted px-4 py-3 rounded-xl text-base sm:text-lg font-medium shadow-sm w-full sm:min-w-[180px]">
                            <span className="text-2xl mr-2">💸</span>
                            Instant Transfers
                        </div>
                    </li>
                    <li className="w-full sm:w-auto mt-2 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-center bg-muted px-4 py-3 rounded-xl text-base sm:text-lg font-medium shadow-sm w-full sm:min-w-[180px]">
                            <span className="text-2xl mr-2">🔐</span>
                            Secure Wallet
                        </div>
                    </li>
                </ul>
                <p className="mt-8 text-gray-500 text-center text-sm sm:text-base px-2 w-full max-w-full break-words">
                    This is a demo project meant to explore how money moves through online payment systems. Ideal for developers and curious minds.
                </p>
            </motion.div>
        </div>
    );
}