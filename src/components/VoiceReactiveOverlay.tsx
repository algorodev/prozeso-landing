"use client";

import { useEffect, useRef, useState } from "react";

interface VoiceReactiveOverlayProps {
  isActive: boolean;
  onHangUp: () => void;
}

export const VoiceReactiveOverlay = ({
  isActive,
  onHangUp,
}: VoiceReactiveOverlayProps) => {
  const [voiceIntensity, setVoiceIntensity] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      microphoneRef.current = null;
      setVoiceIntensity(0);
      return;
    }

    let mounted = true;

    const initializeAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        const microphone = audioContext.createMediaStreamSource(stream);
        microphoneRef.current = microphone;
        microphone.connect(analyser);

        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        let lastUpdateTime = 0;
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;

        const analyzeAudio = (currentTime: number) => {
          if (!mounted || !analyserRef.current) return;

          if (currentTime - lastUpdateTime >= frameInterval) {
            analyserRef.current.getByteTimeDomainData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const normalized = (dataArray[i] - 128) / 128;
              sum += normalized * normalized;
            }
            const rms = Math.sqrt(sum / dataArray.length);

            const normalized = Math.min(1, rms * 3);
            const intensity = Math.pow(normalized, 0.6);

            const baseGlow = 0.15;
            const finalIntensity = baseGlow + intensity * 0.85;

            setVoiceIntensity(finalIntensity);
            lastUpdateTime = currentTime;
          }

          animationFrameRef.current = requestAnimationFrame(analyzeAudio);
        };

        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setVoiceIntensity(0.15);
      }
    };

    initializeAudio();

    return () => {
      mounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      microphoneRef.current = null;
    };
  }, [isActive]);

  useEffect(() => {
    if (overlayRef.current) {
      const intensity = reducedMotion ? 0.3 : voiceIntensity;
      overlayRef.current.style.setProperty("--voice-intensity", String(intensity));
    }
  }, [voiceIntensity, reducedMotion]);

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="voice-reactive-overlay"
      style={{
        "--voice-intensity": "0",
      } as React.CSSProperties & { "--voice-intensity": string }}
    />
  );
};
