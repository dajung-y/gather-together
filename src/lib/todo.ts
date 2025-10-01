import { unstable_cache } from "next/cache";
import clientPromise from "./mongodb";

export const getTodoData = unstable_cache(
  async (studyId: string) => {
    const client = await clientPromise;
    const db = client.db();

    const todo = await db.collection("todos").find({ studyId }).toArray();

    return JSON.parse(JSON.stringify(todo));
  },
  ['todo'],
  { revalidate: 3600, tags: ['todo-tag'] }
);