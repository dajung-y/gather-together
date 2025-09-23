import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);

  if (!session)
    return null;

  return session.user?.id
}
