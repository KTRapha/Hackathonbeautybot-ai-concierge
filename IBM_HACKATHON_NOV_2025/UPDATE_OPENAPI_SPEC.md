# 🔧 Update OpenAPI Spec in watsonx Orchestrate

## Problem
The agent is asking for lat/lng coordinates because the OpenAPI spec marks them as required.

## Solution
Update the OpenAPI spec in watsonx Orchestrate to make lat/lng optional.

## Steps

1. **Go to your agent in watsonx Orchestrate**
2. **Click "Toolset" tab**
3. **Find the tool** (probably named something like "BeautyOnTheMove Firebase Cloud Functions")
4. **Click "Edit" or the three-dot menu** → "Edit"
5. **Upload the updated spec file:** `IBM_HACKATHON_NOV_2025/firebase-functions-openapi-demo.yaml`
   - I've updated it to make `lat` and `lng` optional
   - Added note that they auto-geocode from address

**OR** if you can't edit the tool:
1. **Remove the old tool**
2. **Add new tool** → OpenAPI
3. **Upload:** `IBM_HACKATHON_NOV_2025/firebase-functions-openapi-demo.yaml`

## What Changed

- ✅ `lat` and `lng` are now **optional** (not required)
- ✅ Added description: "will auto-geocode from address if not provided"
- ✅ Agent will know it can call the function with just an address

## After Update

The agent should:
- ✅ Accept addresses without asking for coordinates
- ✅ Automatically geocode addresses
- ✅ Create bookings successfully

