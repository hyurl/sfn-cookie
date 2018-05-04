# SFN-Cookie

**Simple Friendly Cookie parser and serializer for Node.js and browsers.**

## Install

```sh
npm install sfn-cookie
```

## Example

```javascript
const { Cookie, parse, serialize, parseMany } = require("sfn-cookie");

var cookie1 = new Cookie("username=Luna"),
    cookie2 = new Cookie("username=Luna; Max-Age=120; HttpOnly"),
    cookie3 = new Cookie("username", "Luna"),
    cookie4 = new Cookie("username", "Luna", { maxAge: 120, httpOnly: true }),
    cookie4 = new Cookie({ name: "username", value: "Luna", maxAge: 120, httpOnly: true });

console.log(cookie1);
console.log(cookie1.toString()); // username=Luna

console.log(cookie2);
console.log(cookie2.toString()); // username=Luna; Max-Age=120; HttpOnly

console.log(cookie3);
console.log(cookie3.toString()); // username=Luna

console.log(cookie4);
console.log(cookie4.toString()); // username=Luna; Max-Age=120; HttpOnly

// parse() is the same as new Cookie(cookieStr)
console.log(parse("username=Luna; Max-Age=120; HttpOnly"));

// serialize() is the same as cookie.toString()
console.log(serialize(cookie2)); // => username=Luna; Max-Age=120; HttpOnly

if(typeof document === "object"){
    // Assign cookie to the browser:
    document.cookie = cookie1.toString();

    // Parse cookies from the browser:
    let cookies = parseMany(document.cookie);
}
```

## In Browsers

```javascript
const { Cookie } = SfnCookie; // SfnCookie is a global variable.
```

## API

- `new Cookie(cookieStr: string)`
- `new Cookie(options: CookieOption)`
- `new Cookie(name: string, value: string, options?: BaseCookieOption)`
    All `options` include:
    - `name: string` NOT in `BaseCookieOption`.
    - `value: string` NOT in `BaseCookieOption`.
    - `maxAge: number` How many seconds that this cookie should last.
    - `expires: number|string|Date`: Keep alive to a specified date or time.
    - `sameSite`: Honor same-site principle, could be either `strict` or `lax`.
    - `domain`: Set cookie for a specified domain name.
    - `path`: Set cookie for a specified pathname.
    - `httpOnly`: Only HTTP, not JavaScript, can access this cookie.
    - `secure`: This cookie won't be sent if not using HTTPS protocol.

- `cookie.toString()` Gets the serialized cookie string of the current 
    instance.
- `parse(cookieStr: string): Cookie` Parses a cookie string to a Cookie 
    instance. If `cookieStr` is invalid, a `null` will be returned.
- `parseMany(str: string): Cookie[]` Parses a string as multiple 
    cookies, useful for parsing `document.cookie` and `req.headers.cookie`.
- `serialize(data: Cookie | CookieOption): string` Serializes an object or 
    Cookie instance to a valid cookie string.

## Notice

Although you can manipulate all cookie options with this module is browsers, 
but not all options are supported by browsers, e.g. `sameSite` and `httpOnly` 
are not supported by `document.cookie`, and `secure` only works with **HTTPS**
protocol.