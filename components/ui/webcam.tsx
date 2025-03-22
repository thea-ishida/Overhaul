"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

interface WebcamComponentProps {
  onCapture?: (imageSrc: string | null) => void;
}

const WebcamComponent = ({ onCapture }: WebcamComponentProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const videoConstraints = {
    width: 400,
    height: 500,
    facingMode: "user", 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && webcamRef.current.video) {
        const videoElement = webcamRef.current.video;
        videoElement.disablePictureInPicture = true;
        videoElement.disableRemotePlayback = true;
        videoElement.oncontextmenu = (e) => e.preventDefault();
        videoElement.controls = false;
        videoElement.addEventListener("click", (e) => e.preventDefault());
        videoElement.addEventListener("play", (e) => e.preventDefault());
        videoElement.addEventListener("pause", (e) => e.preventDefault());
        clearInterval(interval); 
      }
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      if (onCapture) {
        onCapture(imageSrc); // Pass the captured image to the parent component
      }
    }
  };

  return (
    <div className="relative h-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        height={500}
        width={400}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="object-cover w-full h-full"
        mirrored={true}
      />
    </div>
  );
};

export default WebcamComponent;