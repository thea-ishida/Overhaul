"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface ProcessImageProps {
    imageSrc: string | null;
    onItemDetected: (item: string) => void;
    onErrorMessage?: (message: string) => void;
}




const ProcessImage: React.FC<ProcessImageProps> = ({ imageSrc, onItemDetected, onErrorMessage }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [detectedItem, setDetectedItem] = useState<string | null>(null);
    const modelPath = "/model.json";

    const detectItem = async (imageSrc: string): Promise<string | null> => {
        try {
            const image = new Image();
            image.src = imageSrc;
            await new Promise((resolve) => {
                image.onload = resolve;
            });

            const model = await tf.loadLayersModel("/model/model.json");
            const tensor = tf.browser.fromPixels(image)
                .resizeNearestNeighbor([224, 224]) // Resize to model's expected input size
                .toFloat() // Convert to float
                .div(tf.scalar(255)) // Normalize pixel values to [0, 1]
                .expandDims();
            const predictions = await model.predict(tensor) as tf.Tensor;

            const predictedClass = tf.argMax(predictions, 1).dataSync()[0];
            const classNames = ["Redbull", "RubberDuck", "class3"]; // Replace with your class names
            const detectedItem = classNames[predictedClass];

            return detectedItem;
        } catch (error) {
            console.error("Error detecting item:", error);
            onErrorMessage?.(`Failed to detect item: ${error instanceof Error ? error.message : "Unknown error"}`);
            return null;
        }
    };
    
    useEffect(() => {
        tf.setBackend("webgl")
          .then(() => {
            console.log("Backend set to WebGL");
          })
          .catch(() => {
            tf.setBackend("cpu").then(() => {
              console.log("Backend set to CPU");
            });
          });
      }, []);

    useEffect(() => {
        if (imageSrc) {
            setIsProcessing(true);
            setDetectedItem(null);

            detectItem(imageSrc)
                .then((detectedItem) => {
                    if (detectedItem) {
                        setDetectedItem(detectedItem);
                        onItemDetected(detectedItem);
                    }
                })
                .finally(() => setIsProcessing(false));
        }
    }, [imageSrc, onItemDetected, onErrorMessage]);

    return (
        <div className="mt-4 text-center">
            <img src={imageSrc ?? undefined} alt="Captured item" className="object-cover w-full h-full" />
            {isProcessing && <p className="text-lg text-blue-500">Scanning...</p>}
            {detectedItem && (
                <p className="text-lg text-green-500">Detected: {detectedItem}</p>
            )}
        </div>
    );
};

export default ProcessImage;