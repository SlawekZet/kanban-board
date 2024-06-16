import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  const connect = await connectMongo();
  const response = await connect.json();
  console.log(response);

  try {
    const db = mongoose.connection.useDb('KanbanDatabase');
    const Demo = db.collection('demo');
    const data = await Demo.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log('An error occured:', err);
    return NextResponse.json(
      { error: 'Error fetching demo document' },
      { status: 500 }
    );
  }
}
