// app/api/auth/[...nextauth]/route.ts

import NextAuth, { Account, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb';
import { User } from 'next-auth';

const handler = NextAuth({
  adapter: {
    ...MongoDBAdapter(clientPromise),
    // createUser 메서드 오버라이드
    async createUser(user: any) {
      console.log("새 사용자 생성: ",user.email);
      
      const client = await clientPromise;
      const db = client.db();

      const userWithNickname = {
        ...user,
        nickname: createRandomNickname(), // 가입 동시에 닉네임 생성
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await db.collection('users').insertOne(userWithNickname);
      return {
        ...userWithNickname,
        id: result.insertedId.toString()
      }
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  // 커스텀 동작 설정
  callbacks: {
    async signIn({user, account} : {
      user: User
      account: Account | null
    }): Promise<boolean>{
      console.log('로그인 시도: ',user.email);
      return true
    },

    async session({session, user}: {
      session: Session
      user: User
    }): Promise<Session> {
      console.log('세션 생성: ',session.user?.email)
      if(session.user){
        session.user.id = user.id;
        session.user.nickname = user.nickname;
      }
      return session
    }
  }
});


function createRandomNickname(){
  const adjectives = [
    '귀여운', '멋진', '똑똑한', '재미있는', '활발한', 
    '친근한', '밝은', '성실한', '유쾌한', '따뜻한',
    '용감한', '차분한', '열정적인', '창의적인', '긍정적인'
  ]
  const animals = [
    '판다', '고양이', '강아지', '토끼', '다람쥐',
    '펭귄', '코알라', '햄스터', '여우', '사자',
    '곰', '독수리', '돌고래', '기린', '호랑이'
  ]
  const numbers = Math.floor(Math.random()*1000);

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  return `${adj}${animal}${numbers}`
}

export {handler as GET, handler as POST}