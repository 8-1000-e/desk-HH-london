import type { ReactNode } from 'react';
import { MesubProvider } from '@mesub/react';
import '@mesub/react/styles.css';

// The plan lives on mainnet: the wallet signs for solana:mainnet.
export function MesubRoot({ children }: { children: ReactNode }) {
    return (
        <MesubProvider endpoint="/api/mesub" chain="solana:mainnet">
            {children}
        </MesubProvider>
    );
}
