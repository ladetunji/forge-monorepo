import { dubAnalytics } from "@dub/better-auth";
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP, phoneNumber } from "better-auth/plugins";
import { Dub } from "dub";
import { database } from "@repo/database";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email: _email, otp: _otp, type: _type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
        // remove the object labels and underscores before use
      },
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber: _phoneNumber, code: _code }, _request) => {
        // Implement sending OTP code via SMS
        // remove the object labels and underscores before use
      },
    }),
    dubAnalytics({
      dubClient: new Dub()
    }),
    admin(),
    nextCookies()
    // organization() // if you want to use organization plugin
  ],
  //...add more options here
});