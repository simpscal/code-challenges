import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { MOCK_SERVICE_WORKER_URL } from '@/app/constants/api.constant';

import '@/index.css';

async function enableMocking() {
    const { worker } = await import('../mocks/browser');
    return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: MOCK_SERVICE_WORKER_URL },
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
});
