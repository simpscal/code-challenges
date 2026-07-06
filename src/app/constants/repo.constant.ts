export const GITHUB_REPO_URL = 'https://github.com/simpscal/code-challenges';

export function sourceUrl(path: string): string {
    return `${GITHUB_REPO_URL}/tree/main/${path}`;
}
