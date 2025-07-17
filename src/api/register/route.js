import User from "@/models/User";
import { connectToDatabase } from "../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    connectToDatabase();
    const { email, password } = await request.json;
    const userExists = await User.find({ email });
    if (userExists) {
      return NextResponse.json({ error: "User already exisits" });
    }
    const hashPassword = bcrypt.has(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
    });

    await newUser.save();
    return NextResponse.json({ message: "User Registered", status: 201 });
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error });
    } else {
      return NextResponse.json({ error: "Error in Server", status: 500 });
    }
  }
}
