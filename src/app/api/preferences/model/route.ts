import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch all preferences
    const preferences = await db.collection("preferences").find({}).toArray();

    if (!preferences || preferences.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No preferences data found",
        },
        { status: 404 }
      );
    }

    console.log(
      "Sending preferences to model:",
      JSON.stringify(preferences, null, 2)
    );

    // Call the Python model API
    const modelResponse = await fetch("http://127.0.0.1:5000/rank_customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!modelResponse.ok) {
      const errorText = await modelResponse.text();
      console.error("Model API error:", errorText);
      throw new Error(
        `Model API returned ${modelResponse.status}: ${errorText}`
      );
    }

    const modelData = await modelResponse.json();
    console.log("Model response:", JSON.stringify(modelData, null, 2));

    if (!modelData.success) {
      throw new Error(modelData.error || "Model analysis failed");
    }

    return NextResponse.json(modelData);
  } catch (error: any) {
    console.error("Error in model analysis:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to analyze preferences",
      },
      { status: 500 }
    );
  }
}
