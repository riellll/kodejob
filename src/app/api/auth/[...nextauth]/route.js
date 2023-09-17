import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import connect from "@/utils/db";

// import bcrypt from "bcryptjs";

import { NextAuthOptions } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();
        // console.log(credentials);
        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          const { _id, email, password } = user;
          // console.log(user);
          if (user) {
            const isPasswordCorrect = "test123456" === credentials.password;
            // console.log('test123456' === credentials.password);
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // store the user id from MongoDB to session
      // console.log(user);
      // console.log(token);
      try {
        const [sessionUser] = await User.find({ email: session.user.email });
        //   console.log(sessionUser);
        session.user.id = sessionUser._id.toString();
        // console.log(session);
        //
        return session;
      } catch (error) {
        // console.log("Error checking if user existsa: ", error.message);
        return false;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connect();
        // console.log(credentials);
        // check if user already exists
        const userExists = await User.findOne({
          email: profile ? profile.email : credentials.email,
        });
        // console.log({ account, profile, user, credentials });
        // if not, create a new document and save user in MongoDB
        // console.log(userExists);
        if (!userExists) {
          await User.create({
            name: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        // console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  pages: {
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
/* callbacks: {
  async signIn({ account, profile, user, credentials }) {
    try {
      await connect();
      // console.log(credentials);
      // check if user already exists
      const userExists = await User.findOne({
        email: profile ? profile.email : credentials.email,
      });
      // console.log({ account, profile, user, credentials });
      // if not, create a new document and save user in MongoDB
      // console.log(userExists);
      if (!userExists) {
        await User.create({
          name: profile.name.replace(" ", "").toLowerCase(),
          email: profile.email,
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log("Error checking if user exists: ", error.message);
      return false;
    }
  },
  async session({ session, user, token }) {
    // store the user id from MongoDB to session
    // console.log(user);
    // console.log(token);
    try {
      const [sessionUser] = await User.find({ email: session.user.email });
      //   console.log(sessionUser);
      session.user.id = sessionUser._id.toString();
      // console.log(session);

      return session;
    } catch (error) {
      console.log("Error checking if user existsa: ", error.message);
      return false;
    }
  },
}, */
