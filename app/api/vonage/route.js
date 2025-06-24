import { NextResponse } from "next/server";
import OpenTok from "opentok";

// Initialize OpenTok with your API credentials
const opentok = new OpenTok(
  process.env.VONAGE_API_KEY,
  process.env.VONAGE_API_SECRET
);

// Helper function to create session (Promise-based)
const createSession = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession({ mediaMode: "routed" }, (error, session) => {
      if (error) {
        reject(error);
      } else {
        resolve(session);
      }
    });
  });
};

export async function POST(req) {
  try {
    // Create a new session
    const session = await createSession();
    
    // Generate a token (valid for 24 hours)
    const token = opentok.generateToken(session.sessionId, {
      role: "publisher",
      expireTime: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
    });

    // Return session ID and token
    return NextResponse.json({
      sessionId: session.sessionId,
      token: token,
    });
  } catch (error) {
    console.error("Error creating Vonage session:", error);
    return NextResponse.json(
      { error: "Failed to create video session" },
      { status: 500 }
    );
  }
} 