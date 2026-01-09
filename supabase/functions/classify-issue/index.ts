import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!content || typeof content !== 'string') {
      console.error("Invalid content provided:", content);
      throw new Error("Content is required and must be a string");
    }

    console.log("Classifying issue:", content.substring(0, 100) + "...");

    const systemPrompt = `You are CampusPulse AI, an intelligent campus issue classification system. Analyze student complaints and extract structured information.

You must respond with ONLY valid JSON, no other text. The JSON must follow this exact schema:

{
  "category": "infrastructure|hygiene|safety|internet|classroom|food|transport|other",
  "priority": "low|medium|high|critical",
  "location_text": "extracted location or 'Not specified'",
  "location_area": "building/block name or 'Campus-wide'",
  "summary": "one-line summary under 100 characters",
  "tags": ["tag1", "tag2", "tag3"],
  "suggested_authority": "maintenance|housekeeping|security|it|admin|transport|mess"
}

Priority rules:
- critical: Safety hazards, emergencies, health risks
- high: Affects many students, urgent, no alternatives available
- medium: Inconvenient but not urgent, workarounds exist
- low: Minor issues, can wait

Category rules:
- infrastructure: Buildings, lights, electricity, furniture, AC, fans
- hygiene: Washrooms, cleanliness, water, sanitation
- safety: Security, unsafe areas, broken fixtures that could cause injury
- internet: WiFi, network, connectivity issues
- classroom: Projectors, boards, seating, classroom equipment
- food: Mess, canteen, food quality, cafeteria
- transport: Buses, parking, transportation
- other: Anything that doesn't fit above`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this campus complaint:\n\n"${content}"` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    console.log("AI response:", aiResponse);

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse JSON from AI response (handle markdown code blocks if present)
    let classification;
    try {
      let jsonStr = aiResponse.trim();
      // Remove markdown code blocks if present
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith("```")) {
        jsonStr = jsonStr.slice(0, -3);
      }
      classification = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", aiResponse);
      // Return a default classification if parsing fails
      classification = {
        category: "other",
        priority: "medium",
        location_text: "Not specified",
        location_area: "Campus-wide",
        summary: content.substring(0, 100),
        tags: ["unclassified"],
        suggested_authority: "admin"
      };
    }

    // Validate and sanitize the classification
    const validCategories = ["infrastructure", "hygiene", "safety", "internet", "classroom", "food", "transport", "other"];
    const validPriorities = ["low", "medium", "high", "critical"];
    const validAuthorities = ["maintenance", "housekeeping", "security", "it", "admin", "transport", "mess"];

    classification.category = validCategories.includes(classification.category) ? classification.category : "other";
    classification.priority = validPriorities.includes(classification.priority) ? classification.priority : "medium";
    classification.suggested_authority = validAuthorities.includes(classification.suggested_authority) ? classification.suggested_authority : "admin";
    classification.location_text = classification.location_text || "Not specified";
    classification.location_area = classification.location_area || "Campus-wide";
    classification.summary = classification.summary || content.substring(0, 100);
    classification.tags = Array.isArray(classification.tags) ? classification.tags.slice(0, 5) : [];

    console.log("Final classification:", classification);

    return new Response(JSON.stringify(classification), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in classify-issue function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
