#!/bin/bash

# VirtuaCity Nexus - Apply Supabase Schema
# Run this script to apply the schema to your Supabase database

SUPABASE_URL="https://bsiugkagwajkcabsdzbb.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_9G1QwsFLPkqtnf_ZSaJAWQ_hjdqbXm6"

echo "VirtuaCity Nexus - Schema Migration"
echo "===================================="
echo ""
echo "Opening Supabase SQL Editor..."
echo "Copy the contents of supabase_schema.sql and paste into:"
echo "$SUPABASE_URL/project/default/sql/new"
echo ""
echo "Instructions:"
echo "1. Go to your Supabase dashboard"
echo "2. Select your project"
echo "3. Click on 'SQL Editor' in the left sidebar"
echo "4. Click 'New Query'"
echo "5. Copy the entire contents of supabase_schema.sql"
echo "6. Paste it into the editor"
echo "7. Click 'Run' to execute"
