import { prisma } from "../config/prisma.js";

async function test() {
  try {
    const projects = await prisma.project.findMany();
    console.log("Connected successfully! Project count:", projects.length);
  } catch (error: any) {
    console.error("Database connection or query failed:", error);
  }
}

test();
