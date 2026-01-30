# 🏙️ City Creation - Troubleshooting Guide

## ✅ What Was Fixed

### 1. **Enhanced Error Logging**
- Added detailed console logging for every step of city creation
- Better error messages showing exactly what went wrong
- Logs will help diagnose RLS permission issues

### 2. **Updated RLS Policies**
- Refined `supabase_schema.sql` with proper INSERT/UPDATE/DELETE/SELECT policies
- Each table now has individual policies for authenticated users
- Cities: Users can insert cities they own (`owner_id = auth.uid()`)
- Proper role-based checks for messages and studio state

### 3. **Better Error Handling**
- Added try-catch blocks to catch unexpected errors
- More informative error messages
- Check browser console for debugging info

## 🔧 How to Debug City Creation Issues

### Step 1: Open Browser Console
1. Press `F12` in your browser
2. Go to the **Console** tab
3. Try creating a city and watch for error messages

### Step 2: Look for These Messages

**Success (you should see):**
```
[DataService] Creating city: {...}
[DataService] City created successfully: {...}
[DataService] Creating default districts for city: ...
[DataService] Districts created successfully: [...]
[NexusApp] City created successfully, updating UI: ...
```

**Problems (if you see these):**
```
[DataService] Permission denied - check RLS policies on cities table
```
→ **Solution:** Re-run the updated `supabase_schema.sql`

```
[DataService] Error creating city: {code: "PGRST201", message: "..."}
```
→ **Solution:** RLS policy missing. Run schema migration.

```
[NexusApp] No user available for city creation
```
→ **Solution:** Not authenticated. Login first.

## 📋 Setup Checklist

### Before Creating Cities:
- [ ] 1. Run the updated `supabase_schema.sql` in Supabase SQL Editor
- [ ] 2. Verify tables exist:
  - [ ] `cities`
  - [ ] `districts`
  - [ ] `streams`
  - [ ] `messages`
  - [ ] `studio_state`
  - [ ] `profiles`

### Verify RLS Policies:
Go to Supabase Dashboard → Authentication → Policies

Check that `cities` table has:
- [ ] SELECT policy for authenticated
- [ ] INSERT policy for authenticated
- [ ] UPDATE policy for authenticated  
- [ ] DELETE policy for authenticated

Same for: `districts`, `streams`, `messages`, `studio_state`, `profiles`

## 🚀 How to Create a City

1. Go to Nexus (`/nexus`)
2. Look for **"Initialize Civilization"** button
3. Fill out:
   - **Civilization Identity** - Name (e.g., "Neo Tokyo")
   - **Grid Category** - Social, Creative, Tactical, Neural, Industrial
   - **Aesthetic Protocol** - Holographic, Cyberpunk, Solarpunk, etc.
   - **Neural Frequency** - Pick a color
4. Click **"Initialize Node Grid"**
5. Check console for success message

## 🆘 Common Issues & Fixes

### "Failed to stabilize new civilization core"
1. Open browser console (F12)
2. Look for error message
3. If it says `PGRST201`, re-run the schema
4. If empty error, check network in DevTools

### City appears but disappears on refresh
- Schema wasn't applied yet
- Re-run `supabase_schema.sql`

### "Identity verification required"
- You're not logged in
- Go to `/login` first

### Nothing happens when clicking button
- Check console for errors
- Make sure authentication is working
- Try refreshing the page

## 📝 What's New in the Code

**dataService.ts:**
- Better error logging with detailed info
- Shows permission errors clearly
- Try-catch for unexpected errors

**NexusApp.tsx:**
- Added debug logging
- Better error messages to user
- Points to console for more info

**supabase_schema.sql:**
- Granular RLS policies
- Specific role checks
- Better INSERT validation

## ✨ Next Steps

1. Apply the schema (if not done yet)
2. Login to Nexus
3. Try creating a city
4. Watch the console
5. If anything fails, the error message will tell you what

**You've got this!** 🎉
