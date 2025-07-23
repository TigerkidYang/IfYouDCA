import { NextRequest, NextResponse } from "next/server";
import { DCAInput, APIResponse, DCAResult } from "@/types";
import { calculateDCA } from "@/lib/dca-calculator";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const input: DCAInput = await request.json();

    // Validate required fields
    if (!input.asset || !input.startDate || !input.endDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: asset, startDate, endDate",
        } as APIResponse,
        { status: 400 }
      );
    }

    // Perform DCA calculation
    const result: DCAResult = await calculateDCA(input);

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "DCA calculation completed successfully",
      } as APIResponse<DCAResult>,
      { status: 200 }
    );
  } catch (error) {
    console.error("DCA calculation error:", error);

    // Return appropriate error response
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    const statusCode = errorMessage.includes("No price data") ? 404 : 500;

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      } as APIResponse,
      { status: statusCode }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed. Use POST to calculate DCA.",
    } as APIResponse,
    { status: 405 }
  );
}
