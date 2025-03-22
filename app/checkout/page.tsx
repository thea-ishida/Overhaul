"use client";

import Image from "next/image";
import { Bot, Webcam } from "lucide-react";
import WebcamComponent from "@/components/ui/webcam";
import { useState } from "react";
import ProcessImage from "@/components/ImageProcessing/processImage";
import { Button } from "@/components/ui/button";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Checkout() {
  const itemPrices: { [key: string]: number } = {
    apple: 0.99,
    banana: 0.99,
  };

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);

  const handleCapture = (imageSrc: string | null) => {
    setImageSrc(imageSrc); // Update the captured image state
  };

  const handleItemDetected = (item: string) => {
    if (itemPrices[item]) {
      setItems((prevItems) => [...prevItems, { name: item, price: itemPrices[item] }]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-[#5c5a7c] p-6 relative">
          <div className="h-[500px] w-full relative rounded-lg overflow-hidden">
            <WebcamComponent onCapture={handleCapture} />
            <Image src="/placeholder.svg?height=500&width=400" alt="Banana bundle scan" width={400} height={500} className="object-cover w-full h-full" />
            <div className="absolute top-2 left-4 bg-foreground/20 px-4 py-1 rounded-full text-white">Scanner</div>
          </div>
          <ProcessImage imageSrc={imageSrc} onItemDetected={handleItemDetected} />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Honeycrisp Apple: 3</span>
              <span className="text-xl">$0.99</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Banana Bundle - Large: 1</span>
              <span className="text-xl">$0.99</span>
            </div>

            <div className="flex justify-between pt-4 text-2xl font-bold">
              <span>Total:</span>
              <span>$1.98</span>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-full border">
                <Bot className="h-10 w-10" />
              </div>
              <div className="bg-gray-200 p-4 rounded-lg max-w-md">
                <p className="text-lg">Hi! How can I help you today?</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mt-8">Like Bananas? You might also like:</h2>
            <div className="overflow-x-auto py-4">
              <div className="flex space-x-4">
                <div className="min-w-[300px] bg-gray-200 p-4 rounded-lg">Oranges</div>
                <div className="min-w-[300px] bg-gray-200 p-4 rounded-lg">Grapefruits</div>
                <div className="min-w-[300px] bg-gray-200 p-4 rounded-lg">Plantain Chips</div>
                <div className="min-w-[300px] bg-gray-200 p-4 rounded-lg">Richard's Organic Banana Yogurt</div>
                <div className="min-w-[300px] bg-gray-200 p-4 rounded-lg">Freeze-Dried Gros Michel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessibilityButton />
    </div>
  );
}
