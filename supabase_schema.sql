-- VirtuaCity Nexus Core Schema Migration
-- Run this in your Supabase SQL Editor to fix the PGRST205 errors

-- 1. Cities Table
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    atmosphere TEXT,
    hex_color TEXT,
    icon TEXT,
    owner_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'online',
    population INTEGER DEFAULT 0,
    x FLOAT DEFAULT 0,
    y FLOAT DEFAULT 0,
    logic JSONB DEFAULT '{"nodes": [], "connections": []}'::jsonb,
    active_modules TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Districts Table
CREATE TABLE IF NOT EXISTS public.districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT,
    occupancy INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Streams Table
CREATE TABLE IF NOT EXISTS public.streams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'living-thread',
    last_activity_at TIMESTAMPTZ DEFAULT now(),
    modules TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    type TEXT DEFAULT 'text',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Studio State Table
CREATE TABLE IF NOT EXISTS public.studio_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    projects JSONB DEFAULT '[]'::jsonb,
    assets JSONB DEFAULT '[]'::jsonb,
    bots JSONB DEFAULT '[]'::jsonb,
    team JSONB DEFAULT '[]'::jsonb,
    custom_roles JSONB DEFAULT '[]'::jsonb,
    ai_messages JSONB DEFAULT '[]'::jsonb,
    is_clocked_in BOOLEAN DEFAULT false,
    clock_time INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. System Logs Table
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level TEXT,
    source TEXT,
    message TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- 7. System Updates Table
CREATE TABLE IF NOT EXISTS public.system_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT,
    title TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS POLICIES (Enable Read/Write for Authenticated Users)
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_state ENABLE ROW LEVEL SECURITY;

-- Simple permissive policies for initial development
-- Note: In production, you would restrict these further
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.cities;
    CREATE POLICY "Allow all for authenticated" ON public.cities FOR ALL TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.districts;
    CREATE POLICY "Allow all for authenticated" ON public.districts FOR ALL TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.streams;
    CREATE POLICY "Allow all for authenticated" ON public.streams FOR ALL TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.messages;
    CREATE POLICY "Allow all for authenticated" ON public.messages FOR ALL TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.studio_state;
    CREATE POLICY "Allow all for authenticated" ON public.studio_state FOR ALL TO authenticated USING (true);
END $$;

-- Realtime Setup
-- Ensure publication exists before adding tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE public.cities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.studio_state;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
