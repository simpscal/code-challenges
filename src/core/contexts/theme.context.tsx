import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

function applyThemeClass(theme: Theme) {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        return;
    }

    root.classList.add(theme);
}

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'code-challenges-theme',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme
    );

    useEffect(() => {
        applyThemeClass(theme);
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
    };

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
