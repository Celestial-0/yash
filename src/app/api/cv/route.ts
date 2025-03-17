// app/api/yash/route.ts
import cv from '@/constants/cv.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request): Promise<NextResponse> {
  return new NextResponse(JSON.stringify(cv, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
