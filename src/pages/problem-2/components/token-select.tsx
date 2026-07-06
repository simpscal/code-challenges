import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { Token } from '@/pages/problem-2/apis/prices.model';
import { TokenIcon } from '@/pages/problem-2/components/token-icon';

type TokenSelectProps = {
    tokens: Token[];
    value: string;
    onChange: (currency: string) => void;
    placeholder?: string;
};

export function TokenSelect({ tokens, value, onChange, placeholder = 'Select token' }: TokenSelectProps) {
    const [open, setOpen] = useState(false);
    const selected = tokens.find(token => token.currency === value);

    const handleOpenChange = (nextOpen: boolean) => setOpen(nextOpen);

    const handleSelect = (currency: string) => {
        onChange(currency);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between font-normal'
                >
                    {selected ? (
                        <span className='flex items-center gap-2'>
                            <TokenIcon src={selected.iconUrl} alt={selected.currency} />
                            {selected.currency}
                        </span>
                    ) : (
                        <span className='text-muted-foreground'>{placeholder}</span>
                    )}
                    <ChevronsUpDown className='size-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-72 p-0'>
                <Command>
                    <CommandInput placeholder='Search token...' />
                    <CommandList>
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup>
                            {tokens.map(token => (
                                <CommandItem key={token.currency} value={token.currency} onSelect={handleSelect}>
                                    <TokenIcon src={token.iconUrl} alt={token.currency} />
                                    <span className='flex-1'>{token.currency}</span>
                                    <span className='text-xs text-muted-foreground'>${token.price.toFixed(2)}</span>
                                    <Check
                                        className={cn('size-4', value === token.currency ? 'opacity-100' : 'opacity-0')}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
