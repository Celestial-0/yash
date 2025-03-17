// app/api/yash/route.ts
import cv from '@/constants/cv.json';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request): Promise<Response> {
  return new NextResponse(JSON.stringify(cv, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
