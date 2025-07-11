import prisma from '../../../src/index'; // adjust relative path

export async function POST(req) {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: `john${Date.now()}@example.com`,
      },
    });

    return Response.json({ message: 'User created', user });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
