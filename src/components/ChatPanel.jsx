import { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPanel({ nickname, onClose }) {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(nickname, input.trim());
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-sm font-medium">빗소리 방</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {loading ? (
          <p className="text-white/30 text-sm text-center mt-4">불러오는 중...</p>
        ) : messages.length === 0 ? (
          <p className="text-white/30 text-sm text-center mt-4">첫 메시지를 남겨보세요 ☔</p>
        ) : (
          messages.map((msg) => {
            const isMine = msg.nickname === nickname;
            return (
              <div key={msg.id} className={`flex flex-col gap-1 ${isMine ? 'items-end' : 'items-start'}`}>
                {!isMine && (
                  <span className="text-white/40 text-xs px-1">{msg.nickname}</span>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed break-words
                  ${isMine
                    ? 'bg-blue-500/70 text-white rounded-br-sm'
                    : 'bg-white/10 text-white/90 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-white/25 text-xs px-1">{formatTime(msg.created_at)}</span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지 입력..."
            maxLength={200}
            className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm
              rounded-xl px-3 py-2 outline-none border border-white/10
              focus:border-white/30 transition-colors resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-blue-500/70 hover:bg-blue-500 disabled:opacity-30
              disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
