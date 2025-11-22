# 🔧 Fix: Agent Asking for Coordinates

## Root Cause
The agent sees `lat` and `lng` in the OpenAPI spec and thinks they might be needed, even though they're not in the `required` array.

## Solution Applied

### 1. Updated OpenAPI Spec
- Added `nullable: true` to lat/lng
- Changed descriptions to explicitly say "DO NOT PROVIDE"
- Set examples to `null` instead of coordinate values
- Updated date/time descriptions to show they accept natural language

### 2. Next Steps in watsonx Orchestrate

**Option A: Update Existing Tool**
1. Go to Toolset → Find Firebase Functions tool
2. Click Edit
3. Upload updated: `IBM_HACKATHON_NOV_2025/firebase-functions-openapi-demo.yaml`
4. Save

**Option B: Remove and Re-add (Recommended)**
1. Remove the old tool
2. Add new tool → OpenAPI
3. Upload: `IBM_HACKATHON_NOV_2025/firebase-functions-openapi-demo.yaml`
4. No authentication needed
5. Save

### 3. Update Agent Instructions (Add This)

```
CRITICAL FOR createServiceRequestDemo:
- When calling createServiceRequestDemo, ONLY provide: description, address, date, time, budget, category, serviceType
- DO NOT include lat or lng in the parameters - omit them completely
- The function automatically geocodes the address - you don't need coordinates
- Date can be "Monday", "tomorrow", or "YYYY-MM-DD" - function converts it
- Time can be "morning", "afternoon", or "HH:mm" - function converts it
```

## Test After Fix

Try: "Create a booking for face treatment Monday morning at 8 Cameron Street, Rustdale, Cape Town, budget 500"

Should work without asking for coordinates!

