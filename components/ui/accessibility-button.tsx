"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import Magnifier from "./magnifier";

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const pathname = usePathname();

  let fileName = "home.txt";
  if (pathname && pathname !== "/") {
    const slug = pathname.replace(/^\/|\/$/g, "");
    fileName = `${slug}.txt`;
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const { handlePlay, isSpeaking, handleStop } = useTextToSpeech(fileName);

  const toggleFontSize = () => {
    setIsLargeFont(!isLargeFont);
    document.body.classList.toggle("text-larger", !isLargeFont);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow-lg">
          <p className="mb-2">
            <b>Accessibility Options</b>
          </p>

          {isSpeaking && (
            <button
              onClick={handleStop}
              className="block w-full text-left p-2 bg-red-100 hover:bg-red-300 rounded-tl-lg rounded-tr-lg"
            >
              ⏹ Stop
            </button>
          )}

          <button
            onClick={toggleFontSize}
            className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300"
          >
            🔠 {isLargeFont ? "Normal Font" : "Large Font"}
          </button>

          <button
            onClick={handlePlay}
            className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300"
          >
            🔊 Voice Guide
          </button>

          <button
            onClick={toggleDarkMode}
            className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Zoom Toggle Inside Menu */}
          <button
            onClick={() => setIsZoomEnabled(!isZoomEnabled)}
            className="block w-full text-left p-2 bg-purple-100 hover:bg-blue-300 rounded-bl-lg rounded-br-lg"
          >
            🔍 {isZoomEnabled ? "Disable Zoom" : "Enable Zoom"}
          </button>
        </div>
      )}

      {/* Main floating ♿ button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 fixed bottom-4 right-4 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        ♿
      </button>

      {/* Conditionally render magnifier */}
      {isZoomEnabled && <Magnifier />}
    </div>
  );
}
