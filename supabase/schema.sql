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

create table public.interests (
  code text primary key,
  label text not null,
  description text
);

create table public.user_interests (
  user_id uuid not null references auth.users(id) on delete cascade,
  interest_code text not null references public.interests(code),
  created_at timestamptz not null default now(),
  primary key (user_id, interest_code)
);

create table public.word_metadata (
  word_id uuid primary key references public.words(id) on delete cascade,
  frequency_rank integer,
  usefulness_score numeric not null default 0,
  difficulty numeric not null default 0,
  concreteness numeric not null default 0,
  polysemy_level numeric not null default 0,
  grammar_type text,
  topic_tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.word_collocations (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.words(id) on delete cascade,
  collocation text not null,
  example text,
  created_at timestamptz not null default now()
);

create table public.word_contexts (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.words(id) on delete cascade,
  context_type text not null check (context_type in ('story', 'microContext', 'listening', 'personal', 'contrast', 'production')),
  level_code text not null references public.levels(code),
  text text not null,
  created_at timestamptz not null default now()
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
  session_size integer not null default 5 check (session_size in (3, 5, 8)),
  status text not null default 'active' check (status in ('active', 'completed', 'abandoned')),
  title text not null,
  reading_text text not null,
  shadowing_text text,
  generation_prompt text,
  generation_model text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.lesson_words (
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id),
  position integer not null,
  status text not null default 'new' check (status in ('new', 'familiar', 'reinforce', 'review')),
  primary key (lesson_id, word_id)
);

create table public.context_sentences (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  position integer not null,
  sentence text not null,
  target_word text not null,
  hint text,
  level_code text not null references public.levels(code)
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
  word_id uuid references public.words(id) on delete set null,
  base_sentence text,
  statement text not null,
  correct_answer boolean not null,
  explanation text,
  feedback_correct text,
  feedback_incorrect text,
  user_answer boolean,
  response_time_ms integer,
  answered_at timestamptz
);

create table public.mini_usage_exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  exercise_type text not null check (exercise_type in ('insert_word', 'correct_usage')),
  prompt text not null,
  options jsonb not null,
  correct_option_id text not null,
  feedback_correct text,
  feedback_incorrect text,
  position integer not null
);

create table public.shadowing_sentences (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  position integer not null,
  sentence text not null,
  target_word text not null
);

create table public.shadowing_sets (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  target_word text not null,
  sentences text[] not null,
  playback_speed_options numeric[] not null default array[0.75, 1, 1.25],
  audio_url text,
  position integer not null
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

create table public.user_word_states (
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  memory_stage text not null default 'seen',
  recognition_score numeric not null default 0,
  meaning_recall_score numeric not null default 0,
  contextual_understanding_score numeric not null default 0,
  listening_recognition_score numeric not null default 0,
  usage_recall_score numeric not null default 0,
  speaking_activation_score numeric not null default 0,
  confidence_score numeric not null default 0,
  difficulty numeric not null default 0.5,
  stability numeric not null default 1,
  last_seen_at timestamptz,
  next_review_at timestamptz,
  exposures integer not null default 0,
  correct_answers integer not null default 0,
  wrong_answers integer not null default 0,
  average_response_time_ms integer,
  last_review_type text,
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

create table public.review_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id uuid not null references public.words(id) on delete cascade,
  review_type text not null,
  correct boolean not null,
  response_time_ms integer,
  confidence text check (confidence in ('low', 'medium', 'high')),
  hint_used boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.memory_hooks (
  id uuid primary key default gen_random_uuid(),
  word_id uuid not null references public.words(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  visual_association text,
  emotional_cue text,
  body_action_cue text,
  mini_story text,
  absurd_image text,
  collocations text[] not null default '{}',
  contrasts text[] not null default '{}',
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
alter table public.user_word_states enable row level security;
alter table public.review_schedule enable row level security;
alter table public.review_attempts enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.user_interests enable row level security;

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own lessons" on public.lessons for select using (auth.uid() = user_id);
create policy "Users insert own lessons" on public.lessons for insert with check (auth.uid() = user_id);
create policy "Users manage own progress" on public.user_word_progress for all using (auth.uid() = user_id);
create policy "Users manage own word states" on public.user_word_states for all using (auth.uid() = user_id);
create policy "Users manage own reviews" on public.review_schedule for all using (auth.uid() = user_id);
create policy "Users manage own review attempts" on public.review_attempts for all using (auth.uid() = user_id);
create policy "Users manage own focus sessions" on public.focus_sessions for all using (auth.uid() = user_id);
create policy "Users manage own interests" on public.user_interests for all using (auth.uid() = user_id);

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
  ('standardContext', 'Standard Context', 'Clear short vocabulary scene.'),
  ('funnyStory', 'Funny Story', 'Light entertaining vocabulary story.'),
  ('dialogue', 'Dialogue', 'Short natural conversation.'),
  ('superMemory', 'Super Memory', 'Absurd vivid memory story.')
on conflict (code) do nothing;

insert into public.interests (code, label, description) values
  ('technology', 'Technology', 'Software, products, tools, and systems.'),
  ('business', 'Business', 'Work, clients, meetings, planning, and delivery.'),
  ('sport', 'Sport', 'Training, teams, results, and competition.'),
  ('relationships', 'Relationships', 'People, emotions, family, and friends.'),
  ('travel', 'Travel', 'Places, movement, hotels, and local situations.'),
  ('psychology', 'Psychology', 'Memory, behavior, motivation, and emotions.'),
  ('health', 'Health', 'Body, habits, food, sleep, and wellbeing.'),
  ('money', 'Money', 'Prices, budgets, investing, and decisions.'),
  ('food', 'Food', 'Cooking, restaurants, taste, and shopping.'),
  ('dailyLife', 'Daily life', 'Home, errands, routines, and small problems.'),
  ('culture', 'Culture', 'Books, films, music, society, and ideas.')
on conflict (code) do nothing;
