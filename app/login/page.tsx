import { signIn } from './actions';

export default function LoginPage() {
    return (
        <>
            <header className="top glass"><span><b>Desk 01</b> · London hacker house</span><span>Sign in</span></header>
            <main className="wrap solo">
                <p className="eyebrow">Before the desk</p>
                <h1>What&apos;s your <em>name?</em></h1>
                <form action={signIn} className="login">
                    <input name="name" placeholder="your name" autoComplete="off" required />
                    <button className="btn" type="submit">Continue</button>
                </form>
            </main>
        </>
    );
}
