"use client";

import {  useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

interface ProcessImageProps {
    imageSrc: string | null;
    onItemDetected: (item: string) => void;
    onErrorMessage?: (message: string) => void;
}




const ProcessImage: React.FC<ProcessImageProps> = ({ imageSrc, onItemDetected, onErrorMessage }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [detectedItem, setDetectedItem] = useState<string | null>(null);
    const [classNames, setClassNames] = useState<string[]>([]);
    const modelPath = "/models/model3/model.json";


    useEffect(() => {
        fetch("/models/model3/metadata.json")
            .then((response) => response.json())
            .then((data) => {
                setClassNames(data.labels);
            })
            .catch((error) => {
                console.error("Error loading metadata:", error);
                onErrorMessage?.("Failed to load class names from metadata.");
            });
    }, [onErrorMessage]);

    const detectItem = async (imageSrc: string): Promise<string | null> => {

        tf.setBackend("webgl")
        .then(() => {
          console.log("Backend set to WebGL");
        })
        .catch(() => {
          tf.setBackend("cpu").then(() => {
            console.log("Backend set to CPU");
          });
        });
        try {
            const image = new Image();
            image.src = imageSrc;
            await new Promise((resolve) => {
                image.onload = resolve;
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));

            const model = await tf.loadLayersModel(modelPath);
            const tensor = tf.browser.fromPixels(image)
                .resizeNearestNeighbor([224, 224]) // Resize to model's expected input size
                .toFloat() // Convert to float
                .div(tf.scalar(255)) // Normalize pixel values to [0, 1]
                .expandDims();
            const predictions = await model.predict(tensor) as tf.Tensor;

            const predictedClass = tf.argMax(predictions, 1).dataSync()[0];
            const detectedItem = classNames[predictedClass];
            const confidence = predictions.dataSync()[predictedClass] * 100;

            return confidence > 50 && detectedItem !== "Unknown" ? detectedItem : "Cannot Detect Item";
        } catch (error) {
            console.error("Error detecting item:", error);
            onErrorMessage?.(`Failed to detect item: ${error instanceof Error ? error.message : "Unknown error"}`);
            return null;
        }
    };
    
    useEffect(() => {
       
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
                <div className="flex-1 text-3xl">{detectedItem} -Detected</div>
                <div className="h-6 w-6 bg-[#e0f7e0] rounded-full flex items-center justify-center">✓</div>
              </div>
            )}
        </div>
    );
};



export default ProcessImage;