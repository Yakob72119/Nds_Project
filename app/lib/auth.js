import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect"; // Ensure this is your correct DB connection file
import User from "../models/User";



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          
          const user = await User.findOne({ phoneNumber: credentials.phoneNumber });

          if (!user || !await bcrypt.compare(credentials.password, user.password)) {
            throw new Error("Invalid phone number or password");
          }

          return {
            id: user._id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            role: user.role || "user", // Default role if not set
            phoneNumber: user.phoneNumber,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          firstName: token.firstName,
          phoneNumber: token.phoneNumber,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
