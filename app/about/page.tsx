import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Bot } from "lucide-react"
import Link from "next/link"
import TextToSpeech from "../voice/TextToSpeech";  //import tts component

export default function About() {
    return (
      <div>
      <section className="relative bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight text-white">About Us</h1>
              <h2 className="text-3xl font-medium">Shop Smarter, Checkout Faster!</h2>
              <p className="text-lg max-w-md">
                SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions —
                making every trip faster, easier, and smarter for all.
              </p>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-[300px]">
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
            <h1 className="text-3xl font-bold tracking-tight">
                our name
            </h1>
            <div className="">
            <p>
                potential name containers for each of us to put our little summary and a photo 
            </p>
                        <Image
                          src="/placeholder.svg?height=400&width=300"
                          alt="Banana bundle"
                          width={300}
                          height={400}
                          className="object-cover rounded-lg"
                        />
            </div>
        </div>
      </section>

      {/* Add the floating TTS button at the bottom */}
      <TextToSpeech fileName="about-us.txt" />
      </div>
    )
}