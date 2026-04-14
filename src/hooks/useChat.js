// 실시간 채팅을 담당하는 커스텀 훅입니다.
// 마운트 시 기존 메시지를 불러오고, Supabase Realtime으로 새 메시지를 실시간 수신합니다.
// 메시지는 Supabase DB에 영구 저장되므로 새로고침해도 내역이 유지됩니다.
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

// 한 번에 불러올 최근 메시지 수
const FETCH_LIMIT = 50;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  // Supabase 실시간 채널을 ref로 관리 (cleanup 시 사용)
  const channelRef = useRef(null);

  useEffect(() => {
    // 1) 기존 메시지 로드 (최근 50개, 오래된 순)
    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(FETCH_LIMIT);
      setMessages(data ?? []);
      setLoading(false);
    }
    fetchMessages();

    // 2) 실시간 구독: messages 테이블에 INSERT가 발생하면 state에 추가
    // Supabase SQL Editor에서 아래 명령을 실행해야 동작합니다:
    // alter publication supabase_realtime add table messages;
    channelRef.current = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channelRef.current);
    };
  }, []);

  // 메시지 전송: DB에 insert하면 실시간 구독이 받아서 화면에 표시됨
  async function sendMessage(nickname, content) {
    if (!content.trim()) return;
    await supabase.from('messages').insert({ nickname, content });
  }

  return { messages, loading, sendMessage };
}
