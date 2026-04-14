import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const FETCH_LIMIT = 50;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef(null);

  useEffect(() => {
    // 기존 메시지 로드
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

    // 실시간 구독
    channelRef.current = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelRef.current);
    };
  }, []);

  async function sendMessage(nickname, content) {
    if (!content.trim()) return;
    await supabase.from('messages').insert({ nickname, content });
  }

  return { messages, loading, sendMessage };
}
