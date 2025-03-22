import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Bot } from "lucide-react";
import Link from "next/link";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Ai() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-6xl font-white font-bold tracking-tight text-white">AI</h1>
              <div>
                <p className="text-2xl">How we use AI, for your shopping!</p>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-[300px]"></div>
            </div>
          </div>
        </div>
      </section>
      <AccessibilityButton />
    </div>
  );
}
