export const ROUTES = {
    landing: '/',
    problem1: '/problem-1',
    problem2: '/problem-2',
    problem3: '/problem-3',
} as const;

export const PROBLEM_NAV_ORDER = [ROUTES.landing, ROUTES.problem1, ROUTES.problem2, ROUTES.problem3] as const;
