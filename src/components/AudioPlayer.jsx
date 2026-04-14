import { useAudio } from '../hooks/useAudio';

export default function AudioPlayer() {
  const { playing, volume, setVolume, toggle } = useAudio();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 재생/정지 버튼 */}
      <button
        onClick={toggle}
        className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
          bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 hover:scale-105"
      >
        {playing ? (
          // 정지 아이콘
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          // 재생 아이콘
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* 상태 텍스트 */}
      <p className="text-white/50 text-sm tracking-widest uppercase">
        {playing ? '빗소리 재생 중' : '재생을 시작하세요'}
      </p>

      {/* 볼륨 슬라이더 */}
      <div className="flex items-center gap-3 w-64">
        <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-1 appearance-none rounded-full cursor-pointer
            bg-white/20 accent-white"
        />
        <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      </div>
    </div>
  );
}
