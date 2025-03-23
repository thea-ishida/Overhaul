import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Bot } from "lucide-react";
import Link from "next/link";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Mission() {
  return (
    // h-screen makes this background fill the entire screen
    <div className="h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold mb-8">OUR MISSION</h1>
        <div className="flex flex-row items-start space-x-8">
          <Image src="/pexels.jpg" alt="Grocery store, courtesy of Pexels" width={500} height={400} className="object-scale-down overflow-hidden rounded-lg drop-shadow-xl" />
          <div className="text-xl flex flex-col space-y-4">
            <p>
              At <b>SmartCart</b>, we’re reimagining the checkout experience with AI that’s fast, accurate, and built for everyone.
            </p>
            <p>Inspired by Faith’s hometown grocery roots, we’re creating accessible, human-centered technology that shortens lines, reduces friction, and makes shopping feel personal again.</p>
            <p>Because innovation should start with people — not just data.</p>
          </div>
        </div>
      </div>
      <AccessibilityButton />
    </div>
  );
}
