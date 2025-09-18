import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);

  if (!session)
    throw new Error("로그인 필요");

  return session.user?.id
}
