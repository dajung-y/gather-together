import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { unstable_cache } from "next/cache";

export const getStudyData = unstable_cache(
  async (studyId: string) => {
    const client = await clientPromise;
    const db = client.db();

    const [study, mainNotice] = await Promise.all([
      db.collection("studies").findOne({ _id: new ObjectId(studyId) }),
      db.collection("mainNotice").findOne({ studyId })
    ]);

    return {
      ...JSON.parse(JSON.stringify(study)),
      mainNotice: mainNotice?.content ?? ""
    };

  },

  ['study'],
  { revalidate: 3600, tags: ['study-tag'] }
);
