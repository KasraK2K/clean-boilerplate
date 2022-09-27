import crypto from "crypto"

export const unique = (length: number) => crypto.randomBytes(length / 2).toString("hex")
