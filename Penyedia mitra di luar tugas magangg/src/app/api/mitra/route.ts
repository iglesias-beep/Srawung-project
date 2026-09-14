import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const phoneRegex = /^(\+62|62|0)8[0-9]{6,11}$/;

const applicationSchema = z.object({
  name: z.string().trim().min(3).max(60),
  businessName: z.string().trim().min(3).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex),
  category: z.string().trim().min(1),
  location: z.string().trim().min(3).max(80),
  description: z.string().trim().min(20).max(500),
  agreement: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data yang dikirim tidak valid", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    await prisma.mitraApplication.create({
      data: {
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        category: data.category,
        location: data.location,
        description: data.description,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
