'use client';

import { useRouter } from 'next/navigation';
import { ManageButton, SubscribeButton } from '@mesub/react';

export function RentDesk() {
    const router = useRouter();
    return (
        <SubscribeButton plan="desk" onSubscribed={() => router.push('/desk')}>
            Rent this desk
        </SubscribeButton>
    );
}

export function ManageDesk() {
    return <ManageButton plan="desk">Manage my rental</ManageButton>;
}
