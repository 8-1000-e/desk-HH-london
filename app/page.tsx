import Link from 'next/link';
import { getSession } from '@/lib/session';
import { signOut } from './login/actions';
import { RentDesk } from '@/components/desk-buttons';

// Reads the session cookie on every request: never prerendered.
export const instant = false;

export default async function Home() {
    const session = await getSession();
    return (
        <main className="wrap">
            <p className="kicker">London hacker house</p>
            <h1>Not enough desks.<br /><span>Rent mine by the hour.</span></h1>
            <p className="lead">5 USDC an hour, paid from your Solana wallet. Sign once, it renews every hour, cancel whenever you want. Ends Nov 12, 23:59.</p>
            {session ? (
                <>
                    <div className="actions">
                        <RentDesk />
                        <Link className="ghost" href="/desk">My desk</Link>
                    </div>
                    <form action={signOut} className="who">
                        <span>Signed in as {session.userId.replace(/^user_/, '')}</span>
                        <button type="submit">Sign out</button>
                    </form>
                </>
            ) : (
                <div className="actions"><Link className="primary" href="/login">Sign in to rent</Link></div>
            )}
            <p className="foot">Payments by Mesub, on Solana mainnet. Non-custodial: the USDC goes straight to the desk owner.</p>
        </main>
    );
}
