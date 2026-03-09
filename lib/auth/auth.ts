// hash function
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// compare function
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createToken() {
  const tokenStr = crypto.randomBytes(32).toString("hex");
  const tokenHash = await hashPassword(tokenStr);

  return { tokenStr, tokenHash };
}
