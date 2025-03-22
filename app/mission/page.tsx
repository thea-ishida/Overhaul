
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function Mission() {
    return (
        // h-screen makes this background fill the entire screen
        <div className="h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
            <div className="container mx-auto py-20">
                <h1 className="text-white text-5xl font-bold">
                    OUR MISSION
                </h1>
                <p>
                    mission statement here
                </p>
            </div>
        </div>
    )
}