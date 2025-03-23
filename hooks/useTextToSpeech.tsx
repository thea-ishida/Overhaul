import { useState, useEffect } from "react";

export const useTextToSpeech = (fileName: string) => {
  const [text, setText] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`/voice-guides/${fileName}`);
        if (!response.ok) throw new Error("File not found");
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

      // Modified voice selection logic
      const femaleVoices = voices.filter(v => 
        v.lang.startsWith("en") && 
        (v.name.toLowerCase().includes("female") ||
         v.name.toLowerCase().includes("woman") ||
         v.voiceURI.toLowerCase().includes("female") ||
         v.voiceURI.toLowerCase().includes("samantha") || // Common macOS female voice
         v.voiceURI.toLowerCase().includes("zira"))       // Common Windows female voice
      );

      // Fallback priority: female -> any English -> first available
      const voice = femaleVoices[0] || 
                   voices.find(v => v.lang.startsWith("en")) || 
                   voices[0];

      //const voice = voices.find((v) => v.lang === "en-US") || voices[0];

      if (!text || !voice) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.cancel();
      synth.speak(utterance);
      setIsPaused(false);
    };


    // Debug: List available voices
    console.log("Available voices:", synth.getVoices().map(v => ({
        name: v.name,
        lang: v.lang,
        gender: v.voiceURI.toLowerCase().includes("female") ? "female" : "male"
      })));

    if (synth.getVoices().length > 0) {
      speakWithVoices();
    } else {
      synth.onvoiceschanged = speakWithVoices;
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

  return {
    handlePlay,
    handlePause,
    handleStop,
    isSpeaking,
    isPaused,
  };
};