# SFN-Cookie

**Simple Friendly Cookie parser and serializer for Node.js and browsers.**

## Install

```sh
npm install sfn-cookie
```

## Example

```javascript
const Cookie = require("sfn-cookie");

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

if(typeof document === "object"){
    // Assign cookie to the browser:
    document.cookie = cookie1.toString();

    // Parse cookies from the browser:
    var cookies = Cookie.parseMany(document.cookie);
}
```

## API

- `new Cookie(name: string, value: string, options:? object)`
    All `options` include:
    - `maxAge: number` How many seconds that this cookie should last.
    - `expires: number|string|Date`: Keep alive to a specified date.
    - `sameSite`: Honor same-site principle, could be either `strict` or `lax`.
    - `domain`: Set cookie for a specified domain name.
    - `path`: Set cookie for a specified pathname.
    - `httpOnly`: Only HTTP, not JavaScript, can access this cookie.
    - `Secure`: This cookie won't be sent if not using HTTPS protocol.
- `new Cookie(cookieStr: string)`
- `new Cookie(options: object)`
- `cookie.toString()` Gets the serialized cookie string of the current 
    instance.
- `Cookie.parse(str: string): Cookie` Parses a cookie string to a Cookie 
    instance. If `str` is invalid, a `null` will be returned.
- `Cookie.parseMany(str: string): Cookie[]` Parses a string as multiple 
    cookies, useful for parsing `document.cookie` and `req.headers.cookie`.
- `Cookie.serialize(data: Cookie|object): string` Serializes an object or 
    Cookie instance to a valid cookie string.

## Notice

Although you can manipulate all cookie options with this module is browsers, 
but not all options are supported by browsers, only `maxAge` and `expires` are
supported by `document.cookie`.