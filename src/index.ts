import assign = require("object-assign");

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

export class Cookie implements CookieOptions {
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

    constructor(input, value = null, options = null) {
        if (typeof input === "string") {
            if (value === null) {
                assign(this, parse(input));
            } else {
                assign(this, { name: input, value }, options);
            }
        } else {
            assign(this, input);
        }
    }

    /** Gets the serialized cookie string of the current instance. */
    toString(): string {
        return serialize(this);
    }
}

/** Serializes an object or Cookie instance to a valid cookie string. */
export function serialize(data: Cookie | CookieOptions): string {
    let {
        name,
        value,
        maxAge,
        expires,
        sameSite,
        domain,
        path,
        httpOnly,
        secure
    } = data;

    if (!name) return "";

    let str = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    if (maxAge)
        str += "; Max-Age=" + maxAge;

    if (expires) {
        let err = "Expires must be a valid date string or timestamp, or a Date instance.";

        if (expires instanceof Date) {
            expires = expires.toUTCString();
        } else if (typeof expires == "number" || typeof expires == "string") {
            try {
                expires = new Date(<any>expires).toUTCString();
            } catch (e) {
                throw new TypeError(err);
            }
        } else {
            throw new TypeError(err);
        }

        str += "; Expires=" + expires;
    }

    if (sameSite)
        str += "; SameSite=" + sameSite;

    if (domain)
        str += "; Domain=" + domain;

    if (path)
        str += "; Path=" + path;

    if (httpOnly)
        str += "; HttpOnly";

    if (secure)
        str += "; Secure";

    return str;
}

/** Parses a cookie string to a Cookie instance. */
export function parse(cookieStr: string): Cookie {
    if (!cookieStr || typeof cookieStr !== "string") return null;

    let pairs = cookieStr.split(/\s*;\s*/),
        data: CookieOptions = { name: undefined, value: undefined };

    for (let i in pairs) {
        let pair = pairs[i].split("=");

        if (i == "0") {
            data.name = decodeURIComponent(pair[0]);
            data.value = decodeURIComponent(pair[1]);
        } else {
            let key = pair[0] == "Max-Age"
                ? "maxAge"
                : pair[0][0].toLowerCase() + pair[0].slice(1);

            if (!isNaN(<any>pair[1])) {
                data[key] = parseInt(pair[1]);
            } else if (pair[1] === undefined) {
                data[key] = true;
            } else {
                data[key] = pair[1];
            }
        }
    }

    return new Cookie(data);
}

/**
 * Parses a string as multiple cookies, useful for parsing
 * `document.cookie` and `req.headers.cookie`.
 */
export function parseMany(str: string): Cookie[] {
    if (!str || typeof str !== "string") return [];

    let pairs = str.split(/\s*;\s*/),
        cookies = [];

    for (let pair of pairs) {
        cookies.push(new Cookie(pair));
    }

    return cookies;
}

export default Cookie;