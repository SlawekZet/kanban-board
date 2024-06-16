import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export default async function connectMongo() {
  if (mongoose.connection.readyState >= 1)
    return NextResponse.json({ message: 'Already connected to MongoDB' });

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
    return NextResponse.json({ error: 'MONGODB_URI not defined' });
  }

  let client;

  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log('DB connected');
    return NextResponse.json({ message: 'Connected to MongoDB' });
  } catch (error) {
    console.log('The error has occured:', error);
    return NextResponse.json(
      { error: 'Failed to connect to MongoDB' },
      { status: 500 }
    );
  }
}
