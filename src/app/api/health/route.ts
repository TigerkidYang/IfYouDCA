import { NextResponse } from "next/server";
import { APIResponse } from "@/types";
import { checkDatabaseHealth } from "@/lib/database";

export async function GET() {
  try {
    // Check database connectivity
    const dbHealthy = await checkDatabaseHealth();

    // Check environment variables
    const envChecks = {
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      hasAlphaVantageKey: !!process.env.ALPHA_VANTAGE_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    };

    const isHealthy = dbHealthy && envChecks.hasPostgresUrl;

    return NextResponse.json(
      {
        success: isHealthy,
        data: {
          status: isHealthy ? "healthy" : "unhealthy",
          timestamp: new Date().toISOString(),
          database: dbHealthy ? "connected" : "disconnected",
          environment: envChecks,
          version: process.env.npm_package_version || "1.0.0",
        },
        message: isHealthy ? "System is healthy" : "System has issues",
      } as APIResponse,
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Health check failed",
        data: {
          status: "error",
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        },
      } as APIResponse,
      { status: 500 }
    );
  }
}
