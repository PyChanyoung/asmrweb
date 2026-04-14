// 채팅방 입장 전 닉네임을 입력받는 모달 컴포넌트입니다.
// onEnter(nickname) 콜백으로 입력된 닉네임을 부모(App)에 전달합니다.
import { useState } from 'react';

export default function NicknameModal({ onEnter }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onEnter(value.trim()); // 앞뒤 공백 제거 후 전달
  }

  return (
    // 전체 화면 오버레이 (배경 클릭으로는 닫히지 않음 — 닉네임 입력 필수)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1d2e] border border-white/10 rounded-2xl p-8 w-80 shadow-2xl">
        <h2 className="text-white text-lg font-medium mb-1 text-center">채팅방 입장</h2>
        <p className="text-white/40 text-sm text-center mb-6">사용할 닉네임을 입력하세요</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="닉네임"
            maxLength={20}
            autoFocus
            className="bg-white/10 text-white placeholder-white/30 text-sm
              rounded-xl px-4 py-3 outline-none border border-white/10
              focus:border-white/30 transition-colors"
          />
          {/* 닉네임이 비어있으면 버튼 비활성화 */}
          <button
            type="submit"
            disabled={!value.trim()}
            className="bg-blue-500/80 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed
              text-white text-sm font-medium rounded-xl py-3 transition-colors cursor-pointer"
          >
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
}
