#!/usr/bin/env node

/**
 * VirtuaCity Nexus - Supabase Schema Migration Helper
 * Provides options to apply the schema to your Supabase database
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkSupabaseCLI() {
  try {
    await execAsync('supabase --version');
    return true;
  } catch (e) {
    return false;
  }
}

async function applySchema() {
  try {
    console.log('🚀 VirtuaCity Nexus - Schema Migration');
    console.log('=====================================\n');

    // Check if schema file exists
    const schemaPath = path.join(process.cwd(), 'supabase_schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ supabase_schema.sql not found in current directory');
      process.exit(1);
    }

    const hasCLI = await checkSupabaseCLI();

    if (hasCLI) {
      console.log('✅ Supabase CLI detected!\n');
      console.log('Running schema migration using Supabase CLI...\n');
      
      try {
        // Use Supabase CLI to push migrations
        const { stdout, stderr } = await execAsync('supabase db push', {
          cwd: process.cwd()
        });
        
        console.log(stdout);
        if (stderr) console.error(stderr);
        console.log('\n✅ Schema applied successfully!');
      } catch (e) {
        console.log('⚠️  CLI method failed. Using manual approach...\n');
        showManualInstructions();
      }
    } else {
      console.log('ℹ️  Supabase CLI not found.\n');
      showManualInstructions();
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

function showManualInstructions() {
  const schemaPath = path.join(process.cwd(), 'supabase_schema.sql');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const schemaSize = (schemaContent.length / 1024).toFixed(2);

  console.log('📋 MANUAL SETUP INSTRUCTIONS');
  console.log('============================\n');
  
  console.log('Option 1: Using Supabase Dashboard (Easiest - 2 minutes)');
  console.log('─────────────────────────────────────────────────────');
  console.log('1. Go to: https://app.supabase.com');
  console.log('2. Select your project');
  console.log('3. Click: SQL Editor (left sidebar)');
  console.log('4. Click: New Query');
  console.log('5. Copy the schema file (supabase_schema.sql)');
  console.log('6. Paste into the editor');
  console.log('7. Click: Run');
  console.log('8. Wait for completion (should show success)\n');

  console.log('Option 2: Using Supabase CLI');
  console.log('─────────────────────────────');
  console.log('1. Install: npm install -g supabase');
  console.log('2. Login: supabase login');
  console.log('3. Link: supabase link --project-ref <your-project-id>');
  console.log('4. Push: supabase db push');
  console.log('5. Verify in dashboard\n');

  console.log(`Schema file size: ${schemaSize} KB`);
  console.log(`Contains: ~230 lines of SQL\n`);

  console.log('ℹ️  After applying the schema:');
  console.log('   - All 9 database tables will be created');
  console.log('   - RLS policies will be enabled');
  console.log('   - You can then use the app fully\n');
}

applySchema();
