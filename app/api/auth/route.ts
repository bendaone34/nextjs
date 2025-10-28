import { NextResponse } from "next/server";

const fakeUsers = [
  { id: "1", name: "Admin User", email: "admin@nourishcare.com", password: "admin123", role: "admin" },
  { id: "2", name: "Carer User", email: "carer@nourishcare.com", password: "carer123", role: "carer" },
];

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    const body = raw ? JSON.parse(raw) : {};
    const { email, password } = body;

    const user = fakeUsers.find(
      (u) => u.email.toLowerCase() === email?.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Auth route error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
