import 'server-only';
import { Mesub } from '@mesub/node';

// Reads MESUB_API_KEY and MESUB_BASE_URL. Built once: one cache, one outage fallback.
export const mesub = new Mesub();
