import { StudyData } from "@/types/study";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { unstable_cache } from "next/cache";

// export const getStudyData = unstable_cache(
//   async (studyId: string) => {
//     const client = await clientPromise;
//     const db = client.db();

//     const study = await db.collection("studies").findOne({
//       _id: new ObjectId(studyId)
//     });

//     const studyData: StudyData = JSON.parse(JSON.stringify(study));
//     return studyData;
//   },
//   ['study'],
//   {
//     revalidate: 3600, tags: ['study-tag'] // 1시간 캐시
//   }
// );

export const getStudyData = unstable_cache(
  async (studyId: string) => {
    const client = await clientPromise;
    const db = client.db();

    const [study, mainNotice] = await Promise.all([
      db.collection("studies").findOne({ _id: new ObjectId(studyId) }),
      db.collection("mainNotice").findOne({ studyId })
    ]);

    if (mainNotice)
      console.log("불러옴: " + mainNotice.content);
    return {
      ...JSON.parse(JSON.stringify(study)),
      mainNotice: mainNotice?.content ?? ""
    };

  },

  ['study'],
  { revalidate: 3600, tags: ['study-tag'] }
);
