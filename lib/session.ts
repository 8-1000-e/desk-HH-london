import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

// Demo login: an HMAC-signed cookie holding the user id. Swap for the app's real auth.
const COOKIE = 'session';

function sign(userId: string): string {
    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error('Missing SESSION_SECRET');
    return createHmac('sha256', secret).update(userId).digest('base64url');
}

export function sessionCookie(userId: string): string {
    return `${userId}.${sign(userId)}`;
}

function verify(value: string | undefined): { userId: string } | null {
    if (!value) return null;
    const dot = value.lastIndexOf('.');
    if (dot <= 0) return null;
    const userId = value.slice(0, dot);
    const given = Buffer.from(value.slice(dot + 1));
    const expected = Buffer.from(sign(userId));
    return given.length === expected.length && timingSafeEqual(given, expected) ? { userId } : null;
}

export async function getSession(): Promise<{ userId: string } | null> {
    return verify((await cookies()).get(COOKIE)?.value);
}

export const SESSION_COOKIE = COOKIE;
