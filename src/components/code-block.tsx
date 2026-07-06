import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { getHighlighter } from '@/lib/highlighter';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
    code: string;
    lang?: 'ts' | 'tsx';
    className?: string;
    highlightLines?: number[];
};

export function CodeBlock({ code, lang = 'tsx', className, highlightLines }: CodeBlockProps) {
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        let cancelled = false;

        getHighlighter().then(highlighter => {
            if (cancelled) return;

            const result = highlighter.codeToHtml(code, {
                lang: lang === 'ts' ? 'typescript' : 'tsx',
                themes: { light: 'github-light', dark: 'github-dark' },
                defaultColor: false,
                transformers: highlightLines?.length
                    ? [
                          {
                              line(node, line) {
                                  if (highlightLines.includes(line)) {
                                      this.addClassToHast(node, 'highlighted');
                                  }
                              },
                          },
                      ]
                    : [],
            });

            setHtml(result);
        });

        return () => {
            cancelled = true;
        };
    }, [code, lang, highlightLines]);

    if (!html) {
        return <Skeleton className={cn('h-64 w-full', className)} />;
    }

    return (
        <div
            className={cn('overflow-x-auto rounded-lg border text-sm [&_pre]:p-4', className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
