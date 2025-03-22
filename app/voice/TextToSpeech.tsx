"use client";

import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
  fileName: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ fileName }) => {
  const [text, setText] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`voice-guides/${fileName}`);
        console.log("Got voice file at /voice-guides/" + fileName);
        const content = await response.text();
        setText(content);
      } catch (error) {
        console.error("Failed to load voice guide file:", error);
      }
    };
    fetchText();
  }, [fileName]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    const speakWithVoices = () => {
      const voices = synth.getVoices();
      const voice = voices.find(v => v.lang === "en-US") || voices[0];

      if (!text || !voice) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.cancel(); // clear anything else
      synth.speak(utterance);
      setIsPaused(false);
    };

    const voices = synth.getVoices();

    if (voices.length > 0) {
      speakWithVoices();
    } else {
      synth.onvoiceschanged = () => {
        speakWithVoices();
      };
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
    setIsSpeaking(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 cursor-pointer">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {isSpeaking && (
          <>
            <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-50 animate-ping"></span>
            <span className="absolute w-4/5 h-4/5 rounded-full bg-blue-500 opacity-40 animate-ping delay-200"></span>
            <span className="absolute w-3/5 h-3/5 rounded-full bg-blue-500 opacity-30 animate-ping delay-400"></span>
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
