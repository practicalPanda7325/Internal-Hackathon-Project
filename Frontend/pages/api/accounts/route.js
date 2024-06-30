import connectMongoDB, {ConnectMongoDB} from "../../../lib/mongodb"
import {Account} from "../../../models/account"
import { NextResponse } from "next/server";

export async function POST(request) {
  const { accountAddress, accountName,isCompany,assets } = await request.json();
  await connectMongoDB();
  await Account.create({ accountAddress, accountName,isCompany,assets });
  return NextResponse.json({ message: "Account Created" }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  const condition = request.nextUrl.searchParams.get("condition");
  const accounts = await Account.find(condition);
  return NextResponse.json({ accounts });
}

export async function DELETE(request) {
  const condition = request.nextUrl.searchParams.get("condition");
  await connectMongoDB();
  await Topic.findByIdAndDelete(condition);
  return NextResponse.json({ message: "Account deleted" }, { status: 200 });
}   
res.status(200).json({name:"John"})
