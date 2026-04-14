// 앱의 최상위 컴포넌트입니다.
// 닉네임, 채팅 패널 열림/닫힘 상태를 관리하고
// AudioPlayer, ChatPanel, NicknameModal을 조합합니다.
import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import ChatPanel from './components/ChatPanel';
import NicknameModal from './components/NicknameModal';

export default function App() {
  const [nickname, setNickname] = useState(null);          // 입력된 닉네임 (null = 미입장)
  const [chatOpen, setChatOpen] = useState(false);          // 채팅 패널 열림 여부
  const [showNicknameModal, setShowNicknameModal] = useState(false); // 닉네임 모달 표시 여부

  // 채팅 버튼 클릭 시:
  // - 닉네임이 있으면 바로 채팅 패널 열기
  // - 닉네임이 없으면 닉네임 입력 모달 먼저 표시
  function handleChatButtonClick() {
    if (nickname) {
      setChatOpen(true);
    } else {
      setShowNicknameModal(true);
    }
  }

  // 닉네임 모달에서 입장하기 누르면 호출됨
  function handleEnter(name) {
    setNickname(name);
    setShowNicknameModal(false);
    setChatOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center relative overflow-hidden">
      {/* 배경 그라디언트 레이어 (pointer-events-none으로 클릭 이벤트 통과) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#0f1a2e] to-[#0d1117] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-white/90 text-3xl font-light tracking-[0.3em] uppercase mb-2">
            ☔ Rain Study
          </h1>
          <p className="text-white/30 text-sm tracking-widest">빗소리와 함께하는 공부</p>
        </div>

        {/* 오디오 플레이어 */}
        <AudioPlayer />

        {/* 채팅 참여 버튼 */}
        <button
          onClick={handleChatButtonClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
            text-white/60 hover:text-white/90 text-sm transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* 닉네임 입장 여부에 따라 버튼 텍스트 변경 */}
          {nickname ? '채팅방' : '채팅 참여하기'}
        </button>

        {/* 현재 닉네임 표시 (입장 후에만 보임) */}
        {nickname && (
          <p className="text-white/20 text-xs -mt-6">
            {nickname} 으로 참여 중
          </p>
        )}
      </div>

      {/* 닉네임 입력 모달 */}
      {showNicknameModal && (
        <NicknameModal onEnter={handleEnter} />
      )}

      {/* 채팅 패널 — 오른쪽에서 슬라이드인/아웃 애니메이션 */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#0f1420]/95 backdrop-blur-md
        border-l border-white/10 shadow-2xl z-40
        transition-transform duration-300 ease-in-out
        ${chatOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* nickname과 chatOpen이 모두 true일 때만 ChatPanel 렌더링 */}
        {nickname && chatOpen && (
          <ChatPanel nickname={nickname} onClose={() => setChatOpen(false)} />
        )}
      </div>

      {/* 채팅 패널이 열렸을 때 배경 클릭 시 닫히는 투명 오버레이 */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}
