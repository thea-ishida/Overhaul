"use client";

import Image from "next/image";
import { Bot, Webcam } from "lucide-react";
import WebcamComponent from "@/components/ui/webcam";
import { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Checkout() {
  const itemPrices: { [key: string]: number } = {
    apple: 0.99,
    banana: 0.99,
    Redbull: 2.99,
    bread: 1.99,
  };

  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({
    apple: 0,
    Redbull: 0,
    banana: 0,
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create the Web Worker
    workerRef.current = new Worker("/imageProcessing/imageProcessor.worker.js");

    // Listen for messages from the Web Worker
    workerRef.current.onmessage = (event) => {
      const { processedData } = event.data;
      console.log("Processed data from Web Worker:", processedData);

      // Handle the processed data (e.g., update state)
      processedData.items.forEach((item: string) => handleItemDetected(item));
    };

    // Cleanup the Web Worker when the component unmounts
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleCapture = (imageSrc: string | null) => {
    setImageSrc(imageSrc); // Update the captured image state

    // Send the image to the Web Worker for processing
    if (workerRef.current && imageSrc) {
      workerRef.current.postMessage({ imageSrc });
    }
  };

  const handleItemDetected = useCallback(
    (item: string) => {
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
    },
    [itemPrices]
  );

  const TotalPrice = items.reduce((total, item) => {
    const quantity = itemQuantities[item.name] || 0;
    return total + item.price;
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-[#5c5a7c] p-6 relative h-full">
          <div className="h-[500px] w-full relative rounded-lg overflow-hidden">
            <WebcamComponent onCapture={handleCapture} />
            <div className="absolute top-2 left-4 bg-foreground/20 px-4 py-1 rounded-full text-white">Scanner</div>
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-4">
                <span className="text-xl capitalize">
                  {item.name}:{itemQuantities[item.name]}
                </span>
                <span className="text-xl">${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 text-2xl font-bold">
              <span>Total:</span>
              <span>${TotalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-16">
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