import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create waitlist directory if it doesn't exist
    const waitlistDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(waitlistDir)) {
      fs.mkdirSync(waitlistDir, { recursive: true });
    }

    const waitlistPath = path.join(waitlistDir, 'waitlist.json');
    let waitlist: string[] = [];

    // Read existing waitlist if it exists
    if (fs.existsSync(waitlistPath)) {
      const fileContent = fs.readFileSync(waitlistPath, 'utf-8');
      waitlist = JSON.parse(fileContent);
    }

    // Check if email already exists
    if (waitlist.includes(email)) {
      return NextResponse.json(
        { error: 'Email already exists in waitlist' },
        { status: 400 }
      );
    }

    // Add new email to waitlist
    waitlist.push(email);

    // Write updated waitlist to file
    fs.writeFileSync(waitlistPath, JSON.stringify(waitlist, null, 2));

    return NextResponse.json(
      { message: 'Successfully added to waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 