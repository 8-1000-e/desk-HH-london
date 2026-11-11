'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, sessionCookie } from '@/lib/session';

export async function signIn(form: FormData) {
    const name = String(form.get('name') ?? '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!name) redirect('/login');
    (await cookies()).set(SESSION_COOKIE, sessionCookie(`user_${name}`), { httpOnly: true, sameSite: 'lax', path: '/' });
    redirect('/');
}

export async function signOut() {
    (await cookies()).delete(SESSION_COOKIE);
    redirect('/login');
}
