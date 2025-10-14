import { unstable_cache } from "next/cache";
import clientPromise from "./mongodb";

export const getNoticeData = unstable_cache(
  async (studyId: string) => {
    const client = await clientPromise;
    const db = client.db();

    const notice = await db.collection("notices").find({ studyId }).toArray();

    return JSON.parse(JSON.stringify(notice));
  },
  ['notice'],
  { revalidate: 3600, tags: ['notice-tag'] }
);

// export async function GET(req: Request) {
//   const studyId = new URL(req.url).searchParams.get("studyId");
//   if (!studyId) return NextResponse.json({ error: "studyId 필요" }, { status: 400 });

//   const db = (await clientPromise).db();
//   const notices = await db
//     .collection("notices")
//     .find({ studyId })
//     .sort({ createdAt: -1 })
//     .toArray();

//   return NextResponse.json({ success: true, data: notices.map(n => ({ ...n, _id: n._id.toString() })) });
// }