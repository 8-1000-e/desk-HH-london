'use client';

import { useEffect, useState } from 'react';

// On a phone, wallets live in their own apps: Safari and Chrome see none of them.
// These universal links reopen this page inside the wallet's browser, or lead to
// the app's page when it is not installed.
function walletLinks(url: string) {
    const page = encodeURIComponent(url);
    const ref = encodeURIComponent(new URL(url).origin);
    return [
        { name: 'Phantom', href: `https://phantom.app/ul/browse/${page}?ref=${ref}` },
        { name: 'Solflare', href: `https://solflare.com/ul/v1/browse/${page}?ref=${ref}` },
    ];
}

export function OpenInWallet() {
    const [links, setLinks] = useState<{ name: string; href: string }[] | null>(null);

    useEffect(() => {
        const w = window as unknown as { solana?: unknown; phantom?: { solana?: unknown }; solflare?: unknown };
        const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const injected = Boolean(w.solana || w.phantom?.solana || w.solflare);
        if (mobile && !injected) setLinks(walletLinks(window.location.href));
    }, []);

    if (!links) return null;

    return (
        <div className="open-wallet">
            <p>On your phone? Open this page in your wallet app:</p>
            <div className="open-wallet-row">
                {links.map((link) => (
                    <a key={link.name} className="btn alt" href={link.href}>
                        {link.name}
                    </a>
                ))}
            </div>
            <p className="open-wallet-note">No wallet yet? The button takes you to the app.</p>
        </div>
    );
}
