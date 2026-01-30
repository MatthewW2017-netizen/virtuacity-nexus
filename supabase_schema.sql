-- VirtuaCity Nexus Core Schema Migration
-- Run this in your Supabase SQL Editor to fix the PGRST205 errors

-- 0. Profiles Table (for user profile data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

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
    workspace_layout JSONB DEFAULT '[]'::jsonb,
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
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Simple permissive policies for initial development
-- Note: In production, you would restrict these further
DO $$ 
BEGIN
    -- Cities table - allow authenticated users to select and create
    DROP POLICY IF EXISTS "Allow authenticated to select cities" ON public.cities;
    CREATE POLICY "Allow authenticated to select cities" ON public.cities FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert cities" ON public.cities;
    CREATE POLICY "Allow authenticated to insert cities" ON public.cities FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);
    
    DROP POLICY IF EXISTS "Allow authenticated to update cities" ON public.cities;
    CREATE POLICY "Allow authenticated to update cities" ON public.cities FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete cities" ON public.cities;
    CREATE POLICY "Allow authenticated to delete cities" ON public.cities FOR DELETE TO authenticated USING (true);
    
    -- Districts - allow authenticated access
    DROP POLICY IF EXISTS "Allow authenticated to select districts" ON public.districts;
    CREATE POLICY "Allow authenticated to select districts" ON public.districts FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert districts" ON public.districts;
    CREATE POLICY "Allow authenticated to insert districts" ON public.districts FOR INSERT TO authenticated WITH CHECK (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to update districts" ON public.districts;
    CREATE POLICY "Allow authenticated to update districts" ON public.districts FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete districts" ON public.districts;
    CREATE POLICY "Allow authenticated to delete districts" ON public.districts FOR DELETE TO authenticated USING (true);
    
    -- Streams - allow authenticated access
    DROP POLICY IF EXISTS "Allow authenticated to select streams" ON public.streams;
    CREATE POLICY "Allow authenticated to select streams" ON public.streams FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert streams" ON public.streams;
    CREATE POLICY "Allow authenticated to insert streams" ON public.streams FOR INSERT TO authenticated WITH CHECK (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to update streams" ON public.streams;
    CREATE POLICY "Allow authenticated to update streams" ON public.streams FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete streams" ON public.streams;
    CREATE POLICY "Allow authenticated to delete streams" ON public.streams FOR DELETE TO authenticated USING (true);
    
    -- Messages - allow authenticated access
    DROP POLICY IF EXISTS "Allow authenticated to select messages" ON public.messages;
    CREATE POLICY "Allow authenticated to select messages" ON public.messages FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert messages" ON public.messages;
    CREATE POLICY "Allow authenticated to insert messages" ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id OR sender_id IS NULL);
    
    DROP POLICY IF EXISTS "Allow authenticated to update messages" ON public.messages;
    CREATE POLICY "Allow authenticated to update messages" ON public.messages FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete messages" ON public.messages;
    CREATE POLICY "Allow authenticated to delete messages" ON public.messages FOR DELETE TO authenticated USING (true);
    
    -- Studio State - allow authenticated access
    DROP POLICY IF EXISTS "Allow authenticated to select studio_state" ON public.studio_state;
    CREATE POLICY "Allow authenticated to select studio_state" ON public.studio_state FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert studio_state" ON public.studio_state;
    CREATE POLICY "Allow authenticated to insert studio_state" ON public.studio_state FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
    
    DROP POLICY IF EXISTS "Allow authenticated to update studio_state" ON public.studio_state;
    CREATE POLICY "Allow authenticated to update studio_state" ON public.studio_state FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete studio_state" ON public.studio_state;
    CREATE POLICY "Allow authenticated to delete studio_state" ON public.studio_state FOR DELETE TO authenticated USING (true);
    
    -- Profiles - allow authenticated access
    DROP POLICY IF EXISTS "Allow authenticated to select profiles" ON public.profiles;
    CREATE POLICY "Allow authenticated to select profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to insert profiles" ON public.profiles;
    CREATE POLICY "Allow authenticated to insert profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id OR id IS NULL);
    
    DROP POLICY IF EXISTS "Allow authenticated to update profiles" ON public.profiles;
    CREATE POLICY "Allow authenticated to update profiles" ON public.profiles FOR UPDATE TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to delete profiles" ON public.profiles;
    CREATE POLICY "Allow authenticated to delete profiles" ON public.profiles FOR DELETE TO authenticated USING (true);
END $$;

-- 7. Early Access Signups Table
CREATE TABLE IF NOT EXISTS public.early_access_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for early_access_signups (allows anyone to insert their own signup)
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow anyone to insert signups" ON public.early_access_signups;
    CREATE POLICY "Allow anyone to insert signups" ON public.early_access_signups FOR INSERT WITH CHECK (true);
    
    DROP POLICY IF EXISTS "Allow authenticated to read signups" ON public.early_access_signups;
    CREATE POLICY "Allow authenticated to read signups" ON public.early_access_signups FOR SELECT TO authenticated USING (true);
END $$;

-- Realtime Setup
-- Ensure publication exists before adding tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;

    -- Add tables to publication if they are not already there
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'cities'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.cities;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'studio_state'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.studio_state;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'messages'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
    END IF;
END $$;
