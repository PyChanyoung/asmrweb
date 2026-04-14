// 오디오 재생을 담당하는 커스텀 훅입니다.
// 컴포넌트가 마운트될 때 Audio 객체를 생성하고,
// 언마운트될 때 자동으로 정리합니다.
import { useState, useEffect, useRef } from 'react';

const AUDIO_URL = import.meta.env.VITE_AUDIO_URL;

export function useAudio() {
  // Audio 객체를 ref로 관리 (리렌더링과 무관하게 유지)
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // 0~100

  // 컴포넌트 마운트 시 Audio 객체 생성
  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;           // 무한 반복
    audio.volume = volume / 100; // 초기 볼륨 설정 (Audio API는 0.0~1.0 범위)
    audioRef.current = audio;

    // 컴포넌트 언마운트 시 오디오 정리
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // 볼륨 슬라이더 값이 바뀔 때마다 Audio 객체에 반영
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // 재생/정지 토글
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
