// hash function
import crypto from "crypto";
import bcrypt from "bcrypt";



export async function create_token() {
    const tokenStr = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(tokenStr, 5);

    return { tokenStr, tokenHash };
}
