import Link from 'next/link';
import { redirect } from 'next/navigation';
import { mesub } from '@/lib/mesub';
import { getSession } from '@/lib/session';
import { ManageDesk, RentDesk } from '@/components/desk-buttons';

// Reads the session cookie and asks Mesub on every request: never prerendered.
export const instant = false;

// The tenant's desk, gated on the server. A wrong slug or key throws on purpose.
export default async function DeskPage() {
    const session = await getSession();
    if (!session) redirect('/login');

    const renting = await mesub.hasAccess({ external_id: session.userId }, 'desk');
    const name = session.userId.replace(/^user_/, '');

    return (
        <>
            <div className="bar"><span>Desk Rental Ltd.</span><Link href="/">Back to the listing</Link></div>
            <main className="wrap">
                {renting ? (
                    <>
                        <div className="sign">Occupied<small>by {name}, a paying tenant</small></div>
                        <h1>Congrats, {name}.<br /><em>You are now a tenant.</em></h1>
                        <p className="lead">5 USDC leaves your wallet every hour until you cancel or the lease ends (Nov 12, 23:59). Sit down. Ship something. Make it worth it.</p>
                        <div className="actions"><ManageDesk /></div>
                    </>
                ) : (
                    <>
                        <div className="sign">Nice try<small>this desk is for paying tenants</small></div>
                        <h1>No lease, no desk,<br /><em>{name}.</em></h1>
                        <p className="lead">5 USDC an hour and it is yours. Just paid? Give it a few seconds and reload.</p>
                        <div className="actions"><RentDesk /></div>
                    </>
                )}
            </main>
        </>
    );
}
