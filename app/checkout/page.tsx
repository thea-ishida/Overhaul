"use client";


import Image from "next/image"
import { Bot, Webcam } from "lucide-react"
import WebcamComponent from "@/components/ui/webcam"
import { useCallback, useState } from "react"
import ProcessImage from "@/components/ImageProcessing/processImage"
import { Button } from "@/components/ui/button"
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Checkout() {
  const itemPrices: { [key: string]: number } = {
    Apple: 1.99,
    banana:0.99,
    RedBull: 4.99,
    Bread: 3.99,
  }

  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({
    apple: 0,
    Redbull: 0,
    banana: 0,
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);

  const TotalPrice = items.reduce((total, item) => {
    const quantity = itemQuantities[item.name] || 0;
    return total + (item.price);
  }, 0);

  const handleCapture = (imageSrc: string | null) => {
    setImageSrc(imageSrc); // Update the captured image state
  };

  const handleItemDetected =  useCallback((item: string) => {
    if (!itemPrices[item]) {
      return;
    }
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: (prevQuantities[item] || 0) + 1,
    }));
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item ? { ...i, price: itemPrices[item] * (itemQuantities[item] + 1) } : i
        );
      } else {
        return [...prevItems, { name: item, price: itemPrices[item] }];
      }
    });
  } ,[itemPrices]);
  
  return (
    <div className="min-h-screen bg-white">
      
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-[#5c5a7c] p-6 relative h-full">
          <div className="h-[500px] w-full relative rounded-lg overflow-hidden">
          <WebcamComponent onCapture={handleCapture} />
            {/* <Image
              src="/placeholder.svg?height=500&width=400"
              alt="Banana bundle scan"
              width={400}
              height={500}
              className="object-cover w-full h-full"
            /> */}
            <div className="absolute top-2 left-4 bg-foreground/20 px-4 py-1 rounded-full text-white">Scanner</div>
          </div>
          <div className="flex justify-center mt-4">
          <ProcessImage imageSrc={imageSrc} onItemDetected={handleItemDetected} />
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          
          <div className="space-y-4">
            {/* <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Honeycrisp Apple: 3</span>
              <span className="text-xl">$0.99</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-xl">Banana Bundle - Large: 1</span>
              <span className="text-xl">$0.99</span>
            </div> */}
            {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-4">
                <span className="text-xl capitalize">{item.name}:{itemQuantities[item.name]}</span>
                <span className="text-xl">${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between pt-4 text-2xl font-bold">
              <span>Total:</span>
              <span>${TotalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-start gap-4">
              {/* <div className="bg-white p-2 rounded-full border">
                <Bot className="h-10 w-10" />
              </div>
              <div className="bg-gray-200 p-4 rounded-lg max-w-md">
                <p className="text-lg">Hi! How can I help you today?</p>
              </div> */}
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
