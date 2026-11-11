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
            <header className="top glass">
                <span><b>Desk 01</b> · London hacker house</span>
                <span className="live"><i />Available now</span>
            </header>
            <main className="wrap">
                <section className="hero">
                    <div>
                        <p className="eyebrow">Hot desk, by the hour</p>
                        <h1>Too many builders.<br />Not enough <em>desks.</em></h1>
                        <p className="lead">There is one desk with a view, a working socket and nobody&apos;s laptop on it. It can be yours, one hour at a time.</p>
                    </div>
                    <aside className="card glass">
                        <div className="num">Desk 01 · until Nov 12</div>
                        <div className="price">5 USDC <small>/ hour</small></div>
                        <dl>
                            <dt>Paid from</dt><dd>your Solana wallet</dd>
                            <dt>Signatures</dt><dd>one, ever</dd>
                            <dt>Cancel</dt><dd>any time, here or on <a className="mesub" href="https://mesub.io">Mesub</a></dd>
                        </dl>
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
                            <div className="actions"><Link className="btn" href="/login">Rent the desk</Link></div>
                        )}
                    </aside>
                </section>

                <div className="grid">
                    <div className="cell glass"><div className="k">01</div><h3>Sign once</h3><p>Approve the rental in your wallet. That is the only signature, ever.</p></div>
                    <div className="cell glass"><div className="k">02</div><h3>Pay as you sit</h3><p>Every hour, 5 USDC goes from your wallet to mine. Never more: the price is locked on chain.</p></div>
                    <div className="cell glass"><div className="k">03</div><h3>Leave whenever</h3><p>Cancel right here, or from <a href="https://mesub.io/subscriptions">My subscriptions on <span className="mesub">Mesub</span></a>. Nobody has to approve it.</p></div>
                </div>

                <details className="demo glass" id="mesub">
                    <summary>
                        <span>This desk is a live demo of <span className="mesub">Mesub</span>, the subscription layer for your app.</span>
                        <span className="more">Learn more</span>
                    </summary>
                    <div className="demo-body">
                        <p><strong>Mesub is subscription billing for apps on Solana.</strong> A user approves a plan once from their own wallet. Every renewal is then pulled on schedule, retried when the wallet runs short, and paid straight into the merchant&apos;s wallet. Mesub never holds the money.</p>
                        <p>It is built on the Solana Foundation&apos;s audited subscriptions program, and ships with an API, SDKs for Node and React, webhooks, a dashboard, and an MCP server so an AI agent can set up billing for you.</p>
                        <p>Nothing here is simulated: renting this desk runs on Solana mainnet, with real USDC, through the same widget and API any app can use today.</p>
                        <ul className="links">
                            <li><a className="mesub" href="https://mesub.io">mesub.io</a></li>
                            <li><a href="https://docs.mesub.io">Documentation</a></li>
                            <li><a href="https://medium.com/@emiledubdart/real-subscriptions-on-solana-a-builders-guide-bbb077f4c274">Read: Real subscriptions on Solana, a builder&apos;s guide</a></li>
                            <li><a href="https://x.com/mesub_io">Follow @mesub_io on X</a></li>
                        </ul>
                        <p className="ask">Wanna learn more about Mesub? DM me on <a href="https://t.me/emil_dbs">Telegram @emil_dbs</a> or <a href="https://x.com/ft_gring0">X @ft_gring0</a>.</p>
                    </div>
                </details>

                <section className="pitch glass">
                    <div>
                        <h2>Want subscriptions in your app?</h2>
                        <p>Message us and get free perks to get started.</p>
                    </div>
                    <div className="row">
                        <a href="https://t.me/emil_dbs">Telegram @emil_dbs</a>
                        <a className="alt" href="https://x.com/ft_gring0">X @ft_gring0</a>
                    </div>
                </section>

                <footer className="foot">
                    <span>Powered by <a className="mesub" href="https://mesub.io">Mesub</a></span>
                    <span>Solana mainnet · USDC · non-custodial</span>
                </footer>
            </main>
        </>
    );
}
