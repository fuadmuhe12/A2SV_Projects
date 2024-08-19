import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Corrected import
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";
import { signIn } from "next-auth/react";

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
      console.log(data, "from login options");

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
    console.log(credentials, "from verify options");
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
    console.log(credentials);

    const { name, email, password, confirmPassword, role } = credentials;
    const userData = { email, password, name, confirmPassword, role };
    const result = await fetch(`https://akil-backend.onrender.com/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log(result);
    if (result.status === 200) {
      const data = await result.json();
      console.log(data);
      if (data.message === "Successfully sent OTP") {
        return { email: email, id: 1, name: null, role: "unverified" };
      } else {
        const { email, id, name, role } = data.data;
        return { email: email, id: id, name: name, role: role };
      }
    } else {
      return null;
    }
  },
});

export const options = {
  providers: [AkilLogin, AkilSignup, AkilVerify],
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
  },
};
