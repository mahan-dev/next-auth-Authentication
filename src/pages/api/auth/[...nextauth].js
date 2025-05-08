import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  sessions: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDb();
        } catch (error) {
          throw new Error("can not connect to db");
        }

        if (!email || !password) throw new Error("invalid data");
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("user doesn't exist");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("user or pass is incorrect");

        return {
          email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
