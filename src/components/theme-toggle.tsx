import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/core/contexts/theme.context';

function isDarkTheme(theme: string) {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const dark = isDarkTheme(theme);

    const handleToggle = () => setTheme(dark ? 'light' : 'dark');

    return (
        <Button variant='ghost' size='icon' aria-label='Toggle theme' onClick={handleToggle}>
            {dark ? <Sun className='size-4' /> : <Moon className='size-4' />}
        </Button>
    );
}
