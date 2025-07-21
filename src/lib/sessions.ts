import { JWTPayload, SignJWT, jwtVerify } from "jose";
import 'server-only';
import { cookies } from 'next/headers';
import { ObjectId } from "mongodb";

const secrectKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secrectKey);

//  creates Jason Web Token for us
//  https://nextjs.org/docs/app/guides/authentication#1-generating-a-secret-key
export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt (session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session');
    }
}
 
export async function createSession(userId: ObjectId) {
    // expires at 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}