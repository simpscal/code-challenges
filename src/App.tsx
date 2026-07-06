import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AppRoutes } from '@/app.routes';
import { ThemeProvider } from '@/core/contexts/theme.context';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <AppRoutes />
                    <Toaster richColors position='bottom-right' />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
