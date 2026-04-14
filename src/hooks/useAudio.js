import { useState, useEffect, useRef } from 'react';

const AUDIO_URL = import.meta.env.VITE_AUDIO_URL;

export function useAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = volume / 100;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  return { playing, volume, setVolume, toggle };
}
