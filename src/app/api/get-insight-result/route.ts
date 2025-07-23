import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Scenario ID is required" },
      { status: 400 }
    );
  }

  try {
    const cachedResult = await prisma.precalculatedResult.findUnique({
      where: { id },
    });

    if (!cachedResult) {
      return NextResponse.json(
        { success: false, error: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cachedResult.result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
