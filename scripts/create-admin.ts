import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

async function main() {
  const rl = createInterface({ input, output });
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  const name = (await rl.question("Admin display name: ")).trim();
  const password = await rl.question("Password (minimum 12 characters): ");
  rl.close();
  if (!/^\S+@\S+\.\S+$/.test(email) || !name || password.length < 12) throw new Error("Enter a valid email, name, and password of at least 12 characters.");
  const prisma = new PrismaClient();
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.adminUser.upsert({ where: { email }, update: { name, passwordHash }, create: { email, name, passwordHash } });
    console.log(`Admin account ready: ${user.email}`);
  } finally { await prisma.$disconnect(); }
}
main().catch(error => { console.error(error.message); process.exit(1); });
