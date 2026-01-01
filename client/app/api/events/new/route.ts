// new events

import { NextResponse } from "next/server"

// Simple GET route: /api/posts
export async function GET() {
    return NextResponse.json({ message: "hello" })
}

