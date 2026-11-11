import Link from 'next/link';
import { redirect } from 'next/navigation';
import { mesub } from '@/lib/mesub';
import { getSession } from '@/lib/session';
import { ManageDesk, RentDesk } from '@/components/desk-buttons';
import { OpenInWallet } from '@/components/open-in-wallet';

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
            <header className="top glass">
                <span><b>Desk 01</b> · London hacker house</span>
                <Link href="/">Back</Link>
            </header>
            <main className="wrap solo">
                {renting ? (
                    <>
                        <p className="eyebrow">Your desk</p>
                        <h1>It&apos;s yours, <em>{name}.</em></h1>
                        <p className="lead">5 USDC an hour from your wallet, until you cancel or Nov 12 at 23:59. Sit down and ship something.</p>
                        <div className="actions"><ManageDesk /></div>
                        <OpenInWallet />
                    </>
                ) : (
                    <>
                        <p className="eyebrow">Not rented yet</p>
                        <h1>No desk yet, <em>{name}.</em></h1>
                        <p className="lead">5 USDC an hour and it is yours. Just paid? Give it a few seconds and reload.</p>
                        <div className="actions"><RentDesk /></div>
                        <OpenInWallet />
                    </>
                )}
            </main>
        </>
    );
}
