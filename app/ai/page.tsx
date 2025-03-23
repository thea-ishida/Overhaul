import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Bot } from "lucide-react";
import Link from "next/link";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Ai() {
  return (
    <div>
      <section className="h-screen relative bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24 ">
          <div className="grid md:grid-cols-2 gap-8 items-center my-5 bg-slate-100 rounded-md py-10 px-10">
            <div className="space-y-6">
              <h1 className="text-6xl font-white font-bold tracking-tight text-purple-900">AI</h1>
              <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="text-2xl">We make your shopping easier, accessable and hassle free with some help from AI.</p>
                <p className="text-2xl py-2">Utilizing Tensorflow AI, we are looking to innovate uppon the standard checkout procedure.</p>
              </div>
                <div className="h-70">
                <Image src="/learn-hero.svg" alt="Tensorflow computation, Courtesy of Tensorflow AI" width={500} height={400} className="object-cover overflow-hidden rounded-lg drop-shadow-xl" />
              </div></div>
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
