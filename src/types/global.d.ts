import { MongoClient } from "mongodb";

// 전역 객체 타입
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// 파일을 모듈로 만들어서 충돌 방지
export {}