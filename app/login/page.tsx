import { signIn } from './actions';

export default function LoginPage() {
    return (
        <>
            <div className="bar"><span>Desk Rental Ltd.</span><span>Tenant screening</span></div>
            <main className="wrap">
                <div className="sign">Tenant screening<small>very strict. we check nothing.</small></div>
                <h1>Who wants the desk?</h1>
                <form action={signIn} className="login">
                    <input name="name" placeholder="your name" autoComplete="off" required />
                    <button className="btn" type="submit">Apply</button>
                </form>
            </main>
        </>
    );
}
