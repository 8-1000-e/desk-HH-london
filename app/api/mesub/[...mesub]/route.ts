import { mesubRouteHandlers } from '@mesub/node/next';
import { mesub } from '@/lib/mesub';
import { getSession } from '@/lib/session';

// The routes the widget calls. Who is asking comes from the verified session cookie only.
export const { GET, POST } = mesubRouteHandlers({
    client: mesub,
    customer: async () => {
        const session = await getSession();
        return session ? { external_id: session.userId } : null;
    },
});
