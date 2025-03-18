import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch all preferences data
    const preferences = await db.collection("preferences").find({}).toArray();


    // Create prompt for Gemini
    const prompt = `As a lead generation expert, analyze this user preference data. Please do not miss any data:
    ${JSON.stringify(preferences, null)}

    Please provide data in tabular format:
    1. Most likely to become customers within a month (user email and percentage chance) for all users
    2. Most likely to become customers after 3 months
    3. Most Liked cities

    Format the response in tabular format. No extra text or comments.`;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate analysis
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing preferences:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
