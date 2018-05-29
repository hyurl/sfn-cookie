export interface BaseCookieOptions {
    /** How many seconds that this cookie should last. */
    maxAge?: number;
    /** Keep alive to a specified date or time. */
    expires?: string | number | Date;
    /** Honor same-site principle. */
    sameSite?: "Strict" | "Lax";
    /** Set cookie for a specified domain name. */
    domain?: string;
    /** Set cookie for a specified pathname. */
    path?: string;
    /** Only HTTP(s), not JavaScript, can access this cookie. */
    httpOnly?: boolean;
    /** The cookie won't be sent if not using HTTPS protocol. */
    secure?: boolean;
}
export interface CookieOptions extends BaseCookieOptions {
    name?: string;
    value?: string;
}
export declare class Cookie implements CookieOptions {
    name: string;
    value: string;
    maxAge: number;
    expires: string | number | Date;
    sameSite: "Strict" | "Lax";
    domain: string;
    path: string;
    httpOnly: boolean;
    secure: boolean;
    /**
     * @example new Cookie("username=Luna")
     * @example new Cookie("username=Luna; Max-Age=120; HttpOnly")
     * @example new Cookie("username", "Luna")
     * @example new Cookie("username", "Luna", { maxAge: 120, httpOnly: true })
     * @example new Cookie({ name: "username", value: "Luna", maxAge: 120, httpOnly: true })
     */
    constructor(options: CookieOptions);
    constructor(cookieStr: string);
    constructor(name: string, value: string, options?: BaseCookieOptions);
    /** Gets the serialized cookie string of the current instance. */
    toString(): string;
}
/** Serializes an object or Cookie instance to a valid cookie string. */
export declare function serialize(data: Cookie | CookieOptions): string;
/** Parses a cookie string to a Cookie instance. */
export declare function parse(cookieStr: string): Cookie;
/**
 * Parses a string as multiple cookies, useful for parsing
 * `document.cookie` and `req.headers.cookie`.
 */
export declare function parseMany(str: string): Cookie[];
export default Cookie;
