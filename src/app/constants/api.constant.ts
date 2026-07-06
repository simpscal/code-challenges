/**
 * GitHub Pages serves this app from a /code-challenges/ subpath, so any
 * same-origin request or asset URL must be prefixed with the Vite base —
 * an absolute path like `/api/swap` would fall outside both the deployed
 * subpath and the MSW service worker's registration scope.
 */
export const SWAP_ENDPOINT = `${import.meta.env.BASE_URL}api/swap`;
export const MOCK_SERVICE_WORKER_URL = `${import.meta.env.BASE_URL}mockServiceWorker.js`;
