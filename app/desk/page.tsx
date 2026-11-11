import Link from 'next/link';
import { redirect } from 'next/navigation';
import { mesub } from '@/lib/mesub';
import { getSession } from '@/lib/session';
import { ManageDesk, RentDesk } from '@/components/desk-buttons';

// Reads the session cookie and asks Mesub on every request: never prerendered.
export const instant = false;

// The renter's desk, gated on the server. A wrong slug or key throws on purpose.
export default async function DeskPage() {
    const session = await getSession();
    if (!session) redirect('/login');

    const renting = await mesub.hasAccess({ external_id: session.userId }, 'desk');
    const name = session.userId.replace(/^user_/, '');

    if (!renting) {
        return (
            <main className="wrap">
                <p className="kicker">Desk</p>
                <h1>No desk yet, {name}.<br /><span>Grab one for 5 USDC an hour.</span></h1>
                <div className="actions"><RentDesk /></div>
                <p className="note">Just paid? Reload in a few seconds.</p>
                <Link className="back" href="/">Back</Link>
            </main>
        );
    }

    return (
        <main className="wrap">
            <p className="kicker">Your desk</p>
            <h1>It&apos;s yours, {name}.<br /><span>Sit down and ship.</span></h1>
            <p className="lead">5 USDC every hour, straight from your wallet, until you cancel or the rental ends on Nov 12 at 23:59.</p>
            <div className="actions"><ManageDesk /></div>
            <Link className="back" href="/">Back</Link>
        </main>
    );
}
