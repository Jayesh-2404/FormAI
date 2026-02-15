"use server"

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const PROMPT = `, On the basis of the description, create a JSON form with formTitle, formHeading, and an array of fields. Each field should have: fieldName, FieldTitle, FieldType, Placeholder, label, and required (boolean). For checkbox and select field types, include an "options" array. Return ONLY valid JSON, no extra text.`;

export const generateForm = async (userInput, userEmail) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "GEMINI_API_KEY is not configured on the server.",
    };
  }

  if (!userInput || !userInput.trim()) {
    return {
      success: false,
      error: "Please provide a description for your form.",
    };
  }

  // Call Gemini REST API
  const generateContent = async (retryCount = 0) => {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Description: ${userInput}${PROMPT}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    });

    // Handle rate limiting with retry
    if (res.status === 429) {
      if (retryCount < 3) {
        console.warn(`Gemini rate limit hit. Retrying in ${2 * (retryCount + 1)}s... (attempt ${retryCount + 1}/3)`);
        await new Promise((r) => setTimeout(r, 2000 * (retryCount + 1)));
        return generateContent(retryCount + 1);
      }
      throw new Error("Gemini API rate limit exceeded. Please try again later.");
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Gemini API error:", res.status, errorData);
      throw new Error(`Gemini API error: ${errorData?.error?.message || res.statusText}`);
    }

    const data = await res.json();

    if (data.error) {
      console.error("Gemini API error:", data.error.message);
      throw new Error(`Gemini API error: ${data.error.message}`);
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("AI returned an empty response. Please try again.");
    }

    return responseText;
  };

  try {
    const responseText = await generateContent();

    // Validate that the response is valid JSON
    try {
      JSON.parse(responseText);
    } catch (e) {
      console.error("AI generated invalid JSON:", responseText);
      throw new Error("AI generated invalid JSON. Please try again with a clearer description.");
    }

    // Insert into database
    const now = new Date();
    const createdAt = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    const resp = await db
      .insert(JsonForms)
      .values({
        jsonform: responseText,
        createdBy: userEmail || "anonymous",
        createdAt: createdAt,
      })
      .returning({ id: JsonForms.id });

    if (!resp || !resp[0]?.id) {
      throw new Error("Failed to save the form to the database.");
    }

    return {
      success: true,
      data: {
        id: resp[0].id,
      },
    };
  } catch (error) {
    console.error("AI Form Generation Error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate form. Please try again.",
    };
  }
};
