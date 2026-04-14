# ☔ Rain Study

빗소리를 배경으로 틀어놓고, 다른 사람들과 실시간 채팅으로 함께 공부하는 분위기를 공유하는 사이트입니다.

🔗 **배포 주소**: https://asmrweb.vercel.app

---

## 파일 구조

```
src/
├── lib/
│   └── supabase.js          Supabase 클라이언트 초기화
├── hooks/
│   ├── useAudio.js          오디오 재생/정지/볼륨 제어
│   └── useChat.js           실시간 채팅 (메시지 로드 + 구독 + 전송)
├── components/
│   ├── AudioPlayer.jsx      재생 버튼 + 볼륨 슬라이더 UI
│   ├── ChatPanel.jsx        채팅 패널 (메시지 목록 + 입력창)
│   └── NicknameModal.jsx    닉네임 입력 모달
└── App.jsx                  전체 레이아웃 및 상태 관리
```

---

## 환경변수 설정

`.env.local` 파일을 프로젝트 루트에 만들고 아래 값을 채워넣으세요.

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_KEY=sb_publishable_xxxx
VITE_AUDIO_URL=https://your-cdn.r2.dev/rain.mp3
```

| 변수 | 설명 | 어디서 구하나 |
|------|------|--------------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | Supabase → Settings → Data API |
| `VITE_SUPABASE_KEY` | Supabase 공개 키 | Supabase → Settings → Data API |
| `VITE_AUDIO_URL` | 오디오 파일 CDN 주소 | Cloudflare R2 → 버킷 → 파일 공개 URL |

> `.env.local`은 `.gitignore`에 포함되어 있어 GitHub에 올라가지 않습니다.

---

## Supabase 초기 설정

Supabase SQL Editor에서 아래 두 쿼리를 순서대로 실행하세요.

**1. 테이블 생성 + 보안 정책**
```sql
create table messages (
  id uuid default gen_random_uuid() primary key,
  nickname text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table messages enable row level security;

create policy "anyone can read messages"
  on messages for select using (true);

create policy "anyone can insert messages"
  on messages for insert with check (true);
```

**2. 실시간 기능 활성화**
```sql
alter publication supabase_realtime add table messages;
```

---

## 오디오 파일 교체 / 추가

`VITE_AUDIO_URL` 환경변수만 바꾸면 됩니다.

Cloudflare R2 사용 시:
1. [dash.cloudflare.com](https://dash.cloudflare.com) → R2 → 버킷 선택
2. 오디오 파일 업로드 (MP3 권장)
3. Settings → Public Access 허용
4. 파일 클릭 → 공개 URL 복사 → `.env.local`에 붙여넣기

---

## 개발 & 배포

```bash
# 로컬 개발 서버
npm run dev

# Vercel 배포 (push하면 자동 배포)
git push
```

Vercel 환경변수 설정: 프로젝트 → Settings → Environment Variables에 `.env.local`과 동일한 값 입력.
