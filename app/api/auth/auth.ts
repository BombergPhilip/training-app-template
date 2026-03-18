"use server";

import { EmailTemplate } from "@/app/auth/signup/mail_template";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EMAIL_TOKEN = string;
type Email = string;
type OTP = {
  code: string;
  creation_date: Date;
};

// cached tokens bruges til at holde styr på tokens vi allerede har set før,
// så vi kan speede logind processen en anelse op!
// en token overlever kun 30 minutter
const cached_tokens = new Map<EMAIL_TOKEN, Date>([]);
const cached_otp = new Map<Email, OTP>();

/**
 * Logs in a user by verifying their token or password.
 * If a token is provided, it is checked against the cached tokens.
 * If a password is provided, it is hashed and compared against the user's stored password.
 * @param email The user's email.
 * @param token_or_psw The user's token or password.
 * @returns True if the login is successful, false otherwise.
 */
export async function signin(
  email?: string,
  token_or_psw?: string,
): Promise<{ success: boolean; token?: string; error?: string }> {
  if (token_or_psw == undefined || email == undefined) {
    // Token findes ikke, der skal logges ind!
    return { success: false, error: "faulty input" };
  }

  const token_key = email + token_or_psw;
  const cached_token = cached_tokens.get(token_key);

  // allow request
  if (cached_token && is_token_valid(token_key, cached_token))
    return { success: true };
  // token is not previously known

  // check if login info is valid
  const user = await prisma.users.findFirst({
    where: { email },
    include: { token: true, password: true },
  });
  if (!user) return { success: false, error: "no user" };

  // go through each of the users tokens and check if it is valid
  const valid_token = user.token.find((t) =>
    bcrypt.compareSync(token_or_psw, t.hash),
  );
  const valid_password = user.password
    ? bcrypt.compareSync(token_or_psw, user.password.hash)
    : false;

  // der kunne ikke findes en gyldig token!
  if (!valid_token && !valid_password)
    return { success: false, error: "invalid credentials" };

  if (valid_token) {
    // token er gyldig!
    cached_tokens.set(token_key, new Date());
    return { success: true };
  }

  // password blev brugt, så nu laver vi en ny token
  const { tokenStr, tokenHash } = await create_token();
  await prisma.token.create({
    data: {
      user_id: user.id,
      hash: tokenHash,
    },
  });

  // cache
  cached_tokens.set(email + tokenStr, new Date());
  return { success: true, token: tokenStr };
}

/**
 * Sign up a new user.
 * @param fullname - The user's full name.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to an object with a `success` property indicating whether the signup was successful, and optionally a `token` property with the new user's token.
 */
export async function signup(
  fullname?: string,
  email?: string,
  password?: string,
  otp?: string,
): Promise<{ success: boolean; token?: string; otp?: boolean; error?: string }> {
  if (!password) return { success: false, error: "missing password" };
  if (!email) return { success: false, error: "missing email" };
  if (!fullname) return { success: false, error: "missing fullname" };

  if (!otp) {
    // one time password eksisterer ikke
    // vi laver én!
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();

    cached_otp.set(email, {
      code: otp_code,
      creation_date: new Date(),
    });

    const resp = await send_otp_mail(fullname, email, otp_code);
    console.log("mail send response:", resp);

    return { success: true, otp: true };
  }

  const otp_from_cache = cached_otp.get(email);

  if (!is_otp_valid(otp_from_cache, otp)) {
    return { success: false, error: "invalid otp" };
  }

  cached_otp.delete(email);

  const passwordHash = await bcrypt.hash(password, 10);
  const { tokenStr, tokenHash } = await create_token();

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          name: fullname,
          email: email,
        },
      });

      await tx.password.create({
        data: {
          hash: passwordHash,
          user_id: user.id,
        },
      });

      await tx.token.create({
        data: {
          hash: tokenHash,
          user_id: user.id,
        },
      });
    });

    const cookieStore = await cookies();

    cookieStore.set("user", email);
    cookieStore.set("token", tokenStr);

    return { success: true, token: tokenStr };
  } catch (error) {
    if (typeof error == "string") return { success: false, error };
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
}

/**
 * Check if a token is valid.
 * @param token_key - The token key to check.
 * @param date - The date the token was issued.
 * @returns A boolean indicating whether the token is valid.
 */
function is_token_valid(token_key: string, date: Date) {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  if (Date.now() - new Date(date).getTime() < THIRTY_MINUTES) {
    return true;
  }

  cached_tokens.delete(token_key);
  return false;
}

function is_otp_valid(otp: OTP | undefined, code: string): boolean {
  if (!otp) return false;

  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  if (Date.now() - new Date(otp.creation_date).getTime() > FIFTEEN_MINUTES)
    return false;
  if (otp.code != code) return false;
  return true;
}

/**
 * Create a new token.
 * @returns A promise that resolves to an object with the token string and hash.
 */
export async function create_token(): Promise<{
  tokenStr: string;
  tokenHash: string;
}> {
  const tokenStr = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(tokenStr, 5);

  return { tokenStr, tokenHash };
}

async function send_otp_mail(
  firstname: string,
  email: string,
  otp: string,
): Promise<{ success: boolean }> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Rasmus <team@goworkit.tech>",
      to: [email],
      subject: "OTP",
      react: EmailTemplate({ firstname, otp }),
    });

    console.log("send mail with data:", data);
    console.log(error);

    if (error) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
