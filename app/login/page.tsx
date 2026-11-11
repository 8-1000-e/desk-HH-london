import { signIn } from './actions';

export default function LoginPage() {
    return (
        <main className="wrap">
            <p className="kicker">Sign in</p>
            <h1>Who&apos;s renting?<br /><span>Your name is enough.</span></h1>
            <form action={signIn} className="login">
                <input name="name" placeholder="your name" autoComplete="off" required />
                <button className="primary" type="submit">Continue</button>
            </form>
        </main>
    );
}
