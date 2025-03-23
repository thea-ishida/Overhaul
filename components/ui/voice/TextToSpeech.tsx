"use client";

import React from "react";
import { useTextToSpeech } from "../../../hooks/useTextToSpeech";

interface TextToSpeechProps {
  fileName: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ fileName }) => {
  const { handlePlay, isSpeaking, handlePause, handleStop } = useTextToSpeech(fileName);

  return (
    <div className="fixed bottom-6 right-6 z-50 cursor-pointer">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {isSpeaking && (
          <>
            <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-50 animate-ping" />
            <span className="absolute w-4/5 h-4/5 rounded-full bg-blue-500 opacity-40 animate-ping delay-200" />
            <span className="absolute w-3/5 h-3/5 rounded-full bg-blue-500 opacity-30 animate-ping delay-400" />
          </>
        )}
        <div
          className="relative z-10 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700"
          onClick={handlePlay}
          title="Voice Guide"
        >
          🎙️
        </div>
      </div>

      {isSpeaking && (
        <div className="flex gap-2 mt-2 justify-end">
          <button
            onClick={handlePause}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Pause
          </button>
          <button
            onClick={handleStop}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Stop
          </button>
        </div>
      )}
      
    </div>
  );
};

export default TextToSpeech;