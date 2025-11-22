const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY not set.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateArchitectureDiagram() {
  console.log('🏗️ Generating architecture diagram description with Gemini...\n');
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2000,
    }
  });

  const prompt = `Create a detailed, professional architecture diagram description for BeautyBot AI Concierge system.

SYSTEM ARCHITECTURE:
1. User Input (Natural Language) → IBM watsonx Orchestrate
2. watsonx Orchestrate → Intent Recognition & Workflow Orchestration
3. watsonx Orchestrate → Firebase Cloud Functions (4 demo endpoints)
4. Firebase Cloud Functions → Firebase Firestore (database)
5. Firebase Cloud Functions → Google Maps Geocoding API
6. Response → User

COMPONENTS:
- IBM watsonx Orchestrate (Agentic AI Engine)
- Firebase Cloud Functions (createServiceRequestDemo, validateAddressWithAIDemo, analyzeBudgetWithAIDemo, analyzeTimeAvailabilityDemo)
- Firebase Firestore (technicians, service_requests collections)
- Google Maps Geocoding API
- User Interface (watsonx console chat)

Create a detailed description for a professional architecture diagram that includes:
1. Visual layout (how components should be arranged)
2. Flow arrows (showing data flow)
3. Component labels and descriptions
4. Color scheme (soft blue/gray theme)
5. Professional presentation style

Format as a detailed description that can be used to create the diagram in draw.io, Figma, or PowerPoint.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const description = response.text();
    
    // Save description
    const outputPath = path.join(__dirname, 'screenshots', 'architecture-diagram-description.md');
    fs.writeFileSync(outputPath, description, 'utf-8');
    
    console.log('✅ Architecture diagram description saved!\n');
    console.log('📄 File: screenshots/architecture-diagram-description.md\n');
    console.log('💡 Use this description to create the diagram in:');
    console.log('   - draw.io (https://app.diagrams.net/)');
    console.log('   - Figma (https://www.figma.com/)');
    console.log('   - PowerPoint\n');
    
    return description;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

generateArchitectureDiagram();

