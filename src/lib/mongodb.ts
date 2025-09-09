import {MongoClient} from 'mongodb'

const uri = process.env.MONGODB_URI || "";
const options = {}

// 유효성 검사
if(!uri) {
  throw new Error("MongoDB URI 찾을 수 없음");
}

// 클라이언트 및 클라이언트 프로미스 변수 선언
let client;
let clientPromise: Promise<MongoClient>;

if(process.env.NODE_ENV === 'development'){
  // 연결중이 아닐때 생성하고 연결
  if(!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();

    global._mongoClientPromise.then(client => {
      console.log('연결된 데이터베이스: ',client.db().databaseName);
    }).catch (err => {
      console.error('MongoDB 연결 실패: ',err);
    })
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;