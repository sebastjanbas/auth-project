/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type: {string[]}
 */

export const publicRoutes = [
    "/"
];


/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type: {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];


/**
 * The prefix for all API routes that require authentication
 * Routes that start with this prefix are used for API authentication purposes
 * @type: {string}
 */

export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect path for authenticated users
 * When a user logs in, they will be redirected to this path
 * @type: {string}
 */

export const DEFAULT_REDIRECT = "/settings";