import { FolderGit2 } from 'lucide-react';

import { sourceUrl } from '@/app/constants/repo.constant';

type SourceLinkProps = {
    path: string;
};

export function SourceLink({ path }: SourceLinkProps) {
    return (
        <a
            href={sourceUrl(path)}
            target='_blank'
            rel='noreferrer'
            className='inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground'
        >
            <FolderGit2 className='size-3.5' />
            <code className='font-mono'>{path}</code>
        </a>
    );
}
