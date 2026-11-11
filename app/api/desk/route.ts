import { withMesub } from '@mesub/node/next';
import { mesub } from '@/lib/mesub';
import { getSession } from '@/lib/session';

// The desk itself: 401 signed out, 402 without a rental, 503 if Mesub never saw them.
export const GET = withMesub(
    async (_request, access) => Response.json({ desk: 'yours', customer: access.customer }),
    {
        plan: 'desk',
        client: mesub,
        customer: async () => {
            const session = await getSession();
            return session ? { external_id: session.userId } : null;
        },
    },
);
