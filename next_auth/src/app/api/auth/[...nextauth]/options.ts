import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Corrected import
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import { log } from "console";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const Google = GoogleProvider({
  clientId: GOOGLE_CLIENT_ID as string,
  clientSecret: GOOGLE_CLIENT_SECRET as string,
});

/* 
const Google = GoogleProvider({
  profile(profile) {
    let userRole = "user";
    try {
      return {
        ...profile,
        id: profile.sub,
        role: userRole,
      };
    } catch (error) {
      return {
        id: "",
        role: userRole,
        aud: "",
        azp: "",
        email: "",
        email_verified: false,
        exp: 0,
        family_name: "",
        given_name: "",
        hd: "",
        iat: 0,
        iss: "",
        jti: "",
        name: "",
        nbf: 0,
        picture: "",
        sub: "",
      } as User;
    }
  },
  clientId: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
});
 */
const AkilLogin = CredentialsProvider({
  id: "akil-login",
  name: "Akil Login",
  credentials: {
    email: { label: "email", type: "text" },
    password: { label: "password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials) {
      throw new Error("Credentials are undefined");
    }

    const { email, password } = credentials;
    const userData = { email, password };
    const result = await fetch(`https://akil-backend.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (result.status === 200) {
      const data = await result.json();

      const { email, id, name, role, accessToken, profileStatus } = data.data;
      return {
        email: email,
        id: id,
        name: name,
        role: role,
        accessToken: accessToken,
        profileStatus: profileStatus,
      };
    } else {
      const data = await result.json();
      if (data.message) {
        const errorMessage = data.message;
        if (
          errorMessage.startsWith(
            "Email has not been verified yet. OTP sent to"
          )
        ) {
          return { email: email, name: null, role: "unverified", id: 1 };
        }
      }
      throw new Error(data.message);
      return null;
    }
  },
});
const AkilVerify = CredentialsProvider({
  id: "verify",
  name: "Akil_Verify",
  credentials: {
    email: { label: "email", type: "text" },
    otp: { label: "OTP", type: "text" },
  },
  async authorize(credentials) {
    if (!credentials) {
      throw new Error("Credentials are undefined");
    }

    const { email, otp } = credentials;
    const userData = { email, otp };

    const result = await fetch(
      `https://akil-backend.onrender.com/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (result.status === 200) {
      const data = await result.json();
      const { email, id, name, role, accessToken, profileStatus } = data.data;
      return {
        email: email,
        id: id,
        name: name,
        role: role,
        accessToken: accessToken,
        profileStatus: profileStatus,
      };
    }
    return null;
  },
});

const AkilSignup = CredentialsProvider({
  id: "akil-signup",
  name: "Akil Signup",
  credentials: {
    name: { label: "name", type: "text" },
    email: { label: "email", type: "text" },
    password: { label: "password", type: "password" },
    confirmPassword: { label: "confirmPassword", type: "password" },
    role: { label: "role", type: "text" },
  },
  async authorize(credentials) {
    if (!credentials) {
      throw new Error("Credentials are undefined");
    }

    const { name, email, password, confirmPassword, role } = credentials;
    const userData = { email, password, name, confirmPassword, role };
    const result = await fetch(`https://akil-backend.onrender.com/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (result.status === 200) {
      const data = await result.json();
      if (data.message === "Successfully sent OTP") {
        return { email: email, id: 1, name: null, role: "unverified" };
      } else {
        const { email, id, name, role } = data.data;
        return { email: email, id: id, name: name, role: role };
      }
    } else {
      const data = await result.json();
      throw new Error(data.message);
    }
  },
});

export const options = {
  providers: [Google, AkilLogin, AkilSignup, AkilVerify],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      return { ...token, ...user };
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    error: "/auth",
    signIn: "/auth/login",
  },
};
