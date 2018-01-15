declare class Cookie {
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
    constructor(options: {
        name: string,
        value: string,
        maxAge?: number,
        expires?: string | number | Date,
        sameSite?: "Strict" | "Lax",
        domain?: string,
        path?: string,
        httpOnly?: boolean,
        secure?: boolean
    });
    constructor(cookieStr: string);
    constructor(name: string, value: string, options?: {
        maxAge?: number,
        expires?: string | number | Date,
        sameSite?: "Strict" | "Lax",
        domain?: string,
        path?: string,
        httpOnly?: boolean,
        secure?: boolean
    });

    /** Gets the serialized cookie string of the current instance. */
    tostring(): string;

    /** Serializes an object or Cookie instance to a valid cookie string. */
    static serialize(data: Cookie | {
        name: string,
        value: string,
        maxAge?: number,
        expires?: string | number | Date,
        sameSite?: "Strict" | "Lax",
        domain?: string,
        path?: string,
        httpOnly?: boolean,
        secure?: boolean
    }): string;

    /** Parses a cookie string to a Cookie instance. */
    static parse(cookieStr: string): Cookie;

    /**
     * Parses a string as multiple cookies, useful for parsing
     * `document.cookie` and `req.headers.cookie`.
     */
    static parseMany(str): Cookie[]
}

export = Cookie;