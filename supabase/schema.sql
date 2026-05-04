create extension if not exists "pgcrypto";

create table public.languages (
  code text primary key,
  english_name text not null,
  native_name text not null,
  enabled_as_target boolean not null default true,
  enabled_as_interface boolean not null default false
);

create table public.levels (
  code text primary key,
  sort_order integer not null,
  label text not null,
  description text
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  interface_language text not null references public.languages(code),
  native_language text not null references public.languages(code),
  target_language text not null references public.languages(code),
  current_level text not null references public.levels(code),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.words (
  id uuid primary key default gen_random_uuid(),
  language_code text not null references public.languages(code),
  level_code text not null references public.levels(code),
  text text not null,
  normalized_text text not null,
  part_of_speech text,
  created_at timestamptz not null default now(),
  unique(language_code, normalized_text)
);

create table public.word_translations (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.words(id) on delete cascade,
  language_code text not null references public.languages(code),
  translation text not null,
  simple_definition text,
  example text,
  unique(word_id, language_code)
);

create table public.lesson_modes (
  code text primary key,
  label text not null,
  description text
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_language text not null references public.languages(code),
  native_language text not null references public.languages(code),
  level_code text not null references public.levels(code),
  mode_code text not null references public.lesson_modes(code),
  title text not null,
  reading_text text not null,
  shadowing_text text,
  generation_prompt text,
  generation_model text,
  created_at timestamptz not null default now()
);

create table public.lesson_words (
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id),
  position integer not null,
  primary key (lesson_id, word_id)
);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  quiz_type text not null check (quiz_type in ('context', 'definition')),
  created_at timestamptz not null default now()
);

create table public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  statement text not null,
  correct_answer boolean not null,
  explanation text,
  user_answer boolean,
  answered_at timestamptz
);

create table public.user_word_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  exposure_count integer not null default 0,
  correct_count integer not null default 0,
  last_practiced_at timestamptz,
  strength numeric not null default 0,
  primary key (user_id, word_id)
);

create table public.review_schedule (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  due_at timestamptz not null,
  interval_days integer not null default 1,
  ease_factor numeric not null default 2.5,
  status text not null default 'due' check (status in ('due', 'completed', 'skipped')),
  created_at timestamptz not null default now()
);

create table public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  lesson_id uuid references public.lessons(id) on delete set null
);

create table public.generated_audio_references (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  storage_path text not null,
  voice text,
  speed numeric not null default 1,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.user_word_progress enable row level security;
alter table public.review_schedule enable row level security;
alter table public.focus_sessions enable row level security;

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own lessons" on public.lessons for select using (auth.uid() = user_id);
create policy "Users insert own lessons" on public.lessons for insert with check (auth.uid() = user_id);
create policy "Users manage own progress" on public.user_word_progress for all using (auth.uid() = user_id);
create policy "Users manage own reviews" on public.review_schedule for all using (auth.uid() = user_id);
create policy "Users manage own focus sessions" on public.focus_sessions for all using (auth.uid() = user_id);

insert into public.languages (code, english_name, native_name, enabled_as_target, enabled_as_interface) values
  ('en', 'English', 'English', true, true),
  ('es', 'Spanish', 'Español', true, false),
  ('fr', 'French', 'Français', true, false),
  ('de', 'German', 'Deutsch', true, false),
  ('it', 'Italian', 'Italiano', true, false),
  ('pt', 'Portuguese', 'Português', true, false),
  ('pl', 'Polish', 'Polski', true, true),
  ('ja', 'Japanese', '日本語', true, false),
  ('ko', 'Korean', '한국어', true, false),
  ('zh', 'Chinese', '中文', true, false)
on conflict (code) do nothing;

insert into public.levels (code, sort_order, label, description) values
  ('A1', 1, 'A1 Beginner', 'Simple daily words and short phrases.'),
  ('A2', 2, 'A2 Elementary', 'Common situations, routines, and basic opinions.'),
  ('B1', 3, 'B1 Intermediate', 'Everyday topics, stories, and practical vocabulary.'),
  ('B2', 4, 'B2 Upper intermediate', 'More precise vocabulary and longer context.'),
  ('C1', 5, 'C1 Advanced', 'Nuance, idioms, and complex topics.'),
  ('C2', 6, 'C2 Mastery', 'Native-like expression and subtle meaning.')
on conflict (code) do nothing;

insert into public.lesson_modes (code, label, description) values
  ('news', 'News', 'Article-style learning context.'),
  ('sport', 'Sport', 'Sports-focused learning context.'),
  ('lifestyle', 'Lifestyle', 'General daily-life learning context.'),
  ('superMemory', 'Super Memory', 'Absurd vivid memory story.')
on conflict (code) do nothing;
