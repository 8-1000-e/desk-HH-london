import Link from 'next/link';
import { getSession } from '@/lib/session';
import { signOut } from './login/actions';
import { RentDesk } from '@/components/desk-buttons';

// Reads the session cookie on every request: never prerendered.
export const instant = false;

export default async function Home() {
    const session = await getSession();
    return (
        <>
            <div className="bar"><span>Desk Rental Ltd.</span><span>London hacker house · est. this morning</span></div>
            <main className="wrap">
                <div className="sign">Desk for rent<small>One desk. Zero competition. Some sunlight.</small></div>

                <h1>More builders than desks.<br /><em>I own one of the desks.</em></h1>
                <p className="lead">You could fight over the couch again. Or you could rent my desk, by the hour, like a civilised person.</p>

                <div className="price"><s>£2,000 / month</s><b>5 USDC</b><span>per hour. Paid from your Solana wallet.</span></div>

                {session ? (
                    <>
                        <div className="actions">
                            <RentDesk />
                            <Link className="btn alt" href="/desk">My desk</Link>
                        </div>
                        <form action={signOut} className="who">
                            <span>Signed in as {session.userId.replace(/^user_/, '')}</span>
                            <button className="link" type="submit">Sign out</button>
                        </form>
                    </>
                ) : (
                    <div className="actions"><Link className="btn" href="/login">I want the desk</Link></div>
                )}

                <section className="box">
                    <h2>What you get</h2>
                    <ul className="list perks">
                        <li data-n="">A desk. Flat. Mostly.</li>
                        <li data-n="">A chair, if nobody took it.</li>
                        <li data-n="">Wi-Fi, shared with 14 people running local LLMs.</li>
                        <li data-n="">Bragging rights: you are now a paying tenant.</li>
                        <li className="no" data-n="">The power strip. That one is mine.</li>
                    </ul>
                </section>

                <section className="box">
                    <h2>How paying works</h2>
                    <ul className="list">
                        <li data-n="1">You sign once in your wallet (Phantom, Solflare...). That is the only signature, ever.</li>
                        <li data-n="2">Every hour, <a href="https://mesub.io">Mesub</a> pulls 5 USDC from your wallet straight to mine. Never more: the price is locked on chain when you sign.</li>
                        <li data-n="3">Wallet empty? You lose the desk. Top it up, it comes back.</li>
                        <li data-n="4">Done? Cancel from your own wallet, any time. Nobody has to approve it, not even me.</li>
                    </ul>
                    <p className="fine">Mesub never holds the money: it goes from your wallet to mine, nothing in between. Subscriptions on Solana, built on the Solana Foundation&apos;s audited subscriptions program. The lease ends Nov 12 at 23:59, then I want my desk back. <a href="https://mesub.io">mesub.io</a></p>
                </section>

                <section className="box">
                    <h2>Reviews</h2>
                    <div className="reviews">
                        <div className="review"><b>★★★★★</b>&quot;Best desk I own.&quot;<i>the landlord</i></div>
                        <div className="review"><b>★★★★★</b>&quot;I signed once and now I pay every hour. I have never felt so alive.&quot;<i>a tenant, probably</i></div>
                        <div className="review"><b>★☆☆☆☆</b>&quot;Wanted the couch.&quot;<i>the guy on the couch</i></div>
                    </div>
                    <p className="fine">Reviews written by the landlord. Obviously.</p>
                </section>

                <section className="box pitch">
                    <h2>Want this in your own app?</h2>
                    <p className="lead">Same thing for your product: users sign once, you get paid every month (or every hour, we don&apos;t judge). Ping us and you get free perks to start.</p>
                    <div className="actions">
                        <a className="btn" href="https://t.me/emil_dbs">Telegram @emil_dbs</a>
                        <a className="btn alt" href="https://x.com/ft_gring0">X @ft_gring0</a>
                    </div>
                </section>

                <p className="foot">Payments by <a href="https://mesub.io">Mesub</a>. Real USDC on Solana mainnet. No refunds, the money is already in my wallet (that is the point).</p>
            </main>
        </>
    );
}
