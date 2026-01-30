# 🚀 How to Apply the VirtuaCity Nexus Schema

## Quick Setup (2 minutes)

### Step 1: Open Supabase Dashboard
Go to: https://app.supabase.com

### Step 2: Select Your Project
- Click on your project name

### Step 3: Open SQL Editor
- In the left sidebar, click **"SQL Editor"**
- Click the **"New Query"** button

### Step 4: Copy & Paste the Schema
1. Open `supabase_schema.sql` in your editor
2. Select all the code (Ctrl+A)
3. Copy it (Ctrl+C)
4. Paste it into the Supabase SQL Editor (Ctrl+V)

### Step 5: Execute
- Click the **"Run"** button (or press Ctrl+Enter)
- Wait for it to complete

### Step 6: Verify Success
You should see:
- ✅ Query executed successfully
- Tables created: `profiles`, `cities`, `districts`, `streams`, `messages`, `studio_state`, `system_logs`, `system_updates`
- RLS policies applied

## What This Does

The schema creates:
- **profiles** table - User profile data (username, avatar, etc.)
- **cities** table - Main city nodes for the Nexus
- **districts** table - City subdivisions
- **streams** table - Chat/message streams
- **messages** table - Message history
- **studio_state** table - User workspace state
- **system_logs** and **system_updates** tables - System data

All tables have Row Level Security (RLS) enabled for authenticated users.

## Troubleshooting

### "Permission denied" error?
- You need the Service Role Key, not the Anon Key
- Go to Settings > API > Service Role Key
- You might need Owner/Admin permissions on the project

### Tables already exist?
- That's fine! The script uses `CREATE TABLE IF NOT EXISTS`
- It won't overwrite existing tables

### RLS policies fail?
- Make sure you're using the SQL Editor in Supabase
- Sometimes policies need to be created manually via the UI instead

## Next Steps

After applying the schema:
1. Test the signup page → `/signup`
2. Create an account
3. Login → `/login`
4. Access the Nexus → `/nexus`

Everything should work now! 🎉
