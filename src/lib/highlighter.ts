import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

/**
 * Fine-grained bundle: the top-level `shiki` package ships every language and
 * theme it knows about (100+ dynamic-import chunks). This app only ever
 * highlights ts/tsx against two themes, so pulling in just those keeps the
 * production bundle to what's actually used.
 */
let highlighterPromise: Promise<HighlighterCore> | undefined;

export function getHighlighter(): Promise<HighlighterCore> {
    highlighterPromise ??= createHighlighterCore({
        themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
        langs: [import('shiki/langs/typescript.mjs'), import('shiki/langs/tsx.mjs')],
        engine: createJavaScriptRegexEngine(),
    });

    return highlighterPromise;
}
