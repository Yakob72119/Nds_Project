import dbConnect from "../../../../app/lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { phoneNumber, firstName, lastName, sponsor, position, password } = await req.json();

  const existingUser = await User.findOne({ phoneNumber });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "Phone number already in use" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ phoneNumber, firstName, lastName, sponsor, position, password: hashedPassword });
  await newUser.save();

  return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
}
