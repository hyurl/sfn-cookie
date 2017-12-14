/**
 * Simple Friendly Cookie parser and serializer for Node.js and browsers.
 */
class Cookie {
    /**
     * @example new Cookie("username=Luna")
     * @example new Cookie("username=Luna; Max-Age=120; HttpOnly")
     * @example new Cookie("username", "Luna")
     * @example new Cookie("username", "Luna", { maxAge: 120, httpOnly: true })
     * @example new Cookie({ name: "username", value: "Luna", maxAge: 120, httpOnly: true })
     * @param {String|{[x:string]:string|number|Date}} input A cookie name, 
     *  cookie string or an object carries `name`, `value` and other `options`.
     * @param {String} value
     * @param {{[x:string]:string|number|Date}} options Include:
     *  - `maxAge: number` How many seconds that this cookie should last.
     *  - `expires: number|string|Date`: Keep alive to a specified date.
     *  - `sameSite`: Honor same-site principle, could be either `strict` or `lax`.
     *  - `domain`: Set cookie for a specified domain name.
     *  - `path`: Set cookie for a specified pathname.
     *  - `httpOnly`: Only HTTP, not JavaScript, can access this cookie.
     *  - `secure`: This cookie won't be sent if not using HTTPS protocol.
     */
    constructor(input, value = null, options = null) {
        if (typeof input === "string") {
            if (value === null) {
                Object.assign(this, this.constructor.parse(input));
            } else {
                Object.assign(this, { name: input, value }, options);
            }
        } else {
            Object.assign(this, input);
        }
    }

    /**
     * Gets the serialized cookie string of the current instance.
     * @return {String}
     */
    toString() {
        return this.constructor.serialize(this);
    }

    /** 
     * Serializes an object or Cookie instance to a valid cookie string.
     * @param {Cookie|{[prop:string]:string}} data An object of configuration or
     *  a Cookie instance.
     */
    static serialize(data) {
        var { name, value, maxAge, expires, sameSite, domain, path, httpOnly, secure } = data;
        if (!name) return "";

        value = encodeURIComponent(value);
        var str = name + "=" + value;

        if (maxAge) {
            maxAge = typeof maxAge === "number" ? maxAge : parseInt(maxAge);
            if (isNaN(maxAge))
                throw new TypeError("Max-Age must be a valid number of seconds.");
            str += "; Max-Age=" + maxAge;
        }

        if (expires) {
            let err = "Expires must be a valid date string or timestamp, or a Date instance.";
            if (expires instanceof Date) {
                expires = expires.toUTCString();
            } else if (typeof expires === "number" || typeof expires === "string") {
                try {
                    expires = new Date(expires).toUTCString();
                } catch (e) {
                    throw new TypeError(err);
                }
            } else {
                throw new TypeError(err);
            }
            str += "; Expires=" + expires;
        }

        if (sameSite) {
            sameSite = typeof sameSite === "string" ? capitalize(sameSite) : "Strict";
            if (sameSite !== "Strict" && sameSite !== "Lax")
                throw new TypeError("SameSite must be either 'Strict' or 'Lax'.");
            str += "; SameSite=" + sameSite;
        }

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

    /**
     * Parses a cookie string to a Cookie instance.
     * @param {String} str 
     * @returns {Cookie|void} If `str` is invalid, null will be returned.
     */
    static parse(str) {
        if (!str || typeof str !== "string") return null;
        var pairs = str.split(/\s*;\s*/),
            data = {};
        for (let i in pairs) {
            let pair = pairs[i].split("=");
            if (i == 0) {
                data.name = pair[0];
                data.value = decodeURIComponent(pair[1]);
            } else {
                if (!isNaN(pair[1])) pair[1] = parseInt(pair[1]);
                data[hyphen2camel(pair[0])] = pair[1] || true;
            }
        }
        return new this(data);
    }

    /**
     * Parses a string as multiple cookies, useful for parsing 
     * `document.cookie` and `req.headers.cookie`.
     * @param {String} str
     * @returns {Cookie[]}
     */
    static parseMany(str) {
        if (!str || typeof str !== "string") return [];
        var pairs = str.split(/\s*;\s*/),
            cookies = [];
        for (let pair of pairs) {
            cookies.push(new this(pair));
        }
        return cookies;
    }
}

function capitalize(text) {
    return text.replace(/\b[a-z]/g, char => char.toUpperCase());
};

function hyphen2camel(str) {
    str = str.replace(/-([a-z])/ig, match => match[1].toUpperCase());
    return str[0].toLowerCase() + str.substring(1);
}

if (typeof module === 'object' && module.exports) {
    module.exports = Cookie; // CommonJS
} else if (typeof define === 'function') {
    define((require, exports, module) => {
        module.exports = Cookie; // AMD
    });
}