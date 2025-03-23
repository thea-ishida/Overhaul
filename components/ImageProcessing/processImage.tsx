"use client";

import { useEffect, useState, useRef } from "react";

interface ProcessImageProps {
  imageSrc: string | null;
  onItemDetected: (item: string) => void;
  onErrorMessage?: (message: string) => void;
}

const ProcessImage: React.FC<ProcessImageProps> = ({
  imageSrc,
  onItemDetected,
  onErrorMessage,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedItem, setDetectedItem] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create the Web Worker
    workerRef.current = new Worker(new URL("@/workers/imageProcessor.worker.js", import.meta.url));

    // Load the model and metadata
    workerRef.current.postMessage({
      action: "loadModel",
      payload: {
        modelPath: "/models/model1/model.json",
        metadataPath: "/models/model1/metadata.json",
      },
    });

    // Listen for messages from the Web Worker
    workerRef.current.onmessage = (event) => {
      const { result, error } = event.data;

      if (error) {
        console.error(error);
        onErrorMessage?.(error);
        return;
      }

      if (result) {
        setDetectedItem(result.detectedItem);
        onItemDetected(result.detectedItem);
      }
    };

    // Cleanup the Web Worker when the component unmounts
    return () => {
      workerRef.current?.terminate();
    };
  }, [onErrorMessage, onItemDetected]);

  useEffect(() => {
    if (imageSrc) {
      setIsProcessing(true);
      setDetectedItem(null);

      // Send the image to the Web Worker for processing
      workerRef.current?.postMessage({
        action: "detectItem",
        payload: { imageSrc },
      });

      setIsProcessing(false);
    }
  }, [imageSrc]);

  return (
    <div className="mt-4 text-center">
      {isProcessing && <p className="text-xl text-black">Scanning...</p>}
      {detectedItem === "Cannot Detect Item" && (
        <div className="flex items-center mb-2">
          <div className="flex-1 text-3xl">{detectedItem}</div>
          <div className="h-6 w-6 bg-[#ffcccc] rounded-full flex items-center justify-center">X</div>
        </div>
      )}
      {detectedItem && detectedItem !== "Cannot Detect Item" && (
        <div className="flex items-center mb-2">
          <div className="flex-1 text-3xl">{detectedItem} - Detected</div>
          <div className="h-6 w-6 bg-[#e0f7e0] rounded-full flex items-center justify-center">✓</div>
        </div>
      )}
    </div>
  );
};

export default ProcessImage;