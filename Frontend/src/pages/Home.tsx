import { Button } from "@/components/ui/button";
import { HandCoins, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto py-2 mt-2">
            <div className="text-4xl font-bold py-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
						duration: 0.3,
						ease: "easeInOut"
					}}
                    className="flex items-center gap-4 py-2"
                > 
                    Send 
                    <Send className="size-8"/> 
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
						duration: 0.3,
						ease: "easeInOut",
                        delay: 0.3
					}}
                    className="flex items-center gap-4 py-2"
                > 
                    Receive 
                    <HandCoins className="size-8"/> 
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
						duration: 0.3,
						ease: "easeInOut",
                        delay: 0.6
					}}
                    className="flex items-center gap-2 py-2"
                > 
                    Manage Money Seamlessly 
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.9
                }}
            >
                <div className="flex justify-center my-16">
                <Button
                    variant={"default"}
                    onClick={() => navigate("/signin")}
                    className="mb-16 text-white px-10 py-6 rounded-lg text-xl shadow-md"
                >
                    Get Started
                </Button> 
            </div>
            <ul className="mt-8 mb-8 grid gap-4 md:grid-cols-2">
                <li className="border bg-muted px-4 py-2 rounded-2xl flex justify-center">
                    💸 Instant Transfers
                </li>
                <li className="border bg-muted px-4 py-2 rounded-2xl flex justify-center">
                    🔐 Secure Wallet
                </li>
            </ul>
            <p className="mt-16 text-gray-500">
                This is a demo project meant to explore how money moves through online payment systems. Ideal for developers and curious minds.
            </p>
            </motion.div>
        </div>
    );
}