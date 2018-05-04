const { Cookie, parse, parseMany, serialize } = require("./");
const assert = require("assert");

var date = new Date(),
    cookie1 = new Cookie("username=Luna"),
    cookie2 = new Cookie("username=Luna; Max-Age=120; HttpOnly"),
    cookie3 = new Cookie("username", "Luna"),
    cookie4 = new Cookie("username", "Luna", { maxAge: 120, httpOnly: true }),
    cookie5 = new Cookie({
        name: "username",
        value: "Luna",
        maxAge: 120,
        expires: date,
        sameSite: "Strict",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: true
    }),
    cookie6 = new Cookie("username", "Luna", {
        maxAge: 120,
        expires: date,
        sameSite: "Strict",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: true
    }),
    fullCookieStr = `username=Luna; Max-Age=120; Expires=${date.toUTCString()}; SameSite=Strict; Domain=localhost; Path=/; HttpOnly; Secure`;

assert.deepEqual(cookie1, { name: "username", value: "Luna" });
assert.equal(cookie1.toString(), "username=Luna");

assert.deepStrictEqual(Object.assign({}, cookie2), {
    name: "username",
    value: "Luna",
    maxAge: 120,
    httpOnly: true
});
assert.equal(cookie2.toString(), "username=Luna; Max-Age=120; HttpOnly");

assert.deepEqual(cookie3, { name: "username", value: "Luna" });
assert.equal(cookie3.toString(), "username=Luna");

assert.deepStrictEqual(Object.assign({}, cookie4), {
    name: "username",
    value: "Luna",
    maxAge: 120,
    httpOnly: true
});
assert.equal(cookie4.toString(), "username=Luna; Max-Age=120; HttpOnly");

assert.deepStrictEqual(Object.assign({}, cookie5), {
    name: "username",
    value: "Luna",
    maxAge: 120,
    expires: date,
    sameSite: "Strict",
    domain: "localhost",
    path: "/",
    httpOnly: true,
    secure: true
});
assert.equal(cookie5.toString(), fullCookieStr);

assert.deepStrictEqual(Object.assign({}, cookie6), {
    name: "username",
    value: "Luna",
    maxAge: 120,
    expires: date,
    sameSite: "Strict",
    domain: "localhost",
    path: "/",
    httpOnly: true,
    secure: true
});
assert.equal(cookie6.toString(), fullCookieStr);

assert.equal(serialize(cookie6), fullCookieStr);
assert.deepStrictEqual(parse(fullCookieStr), Object.assign(cookie6, {
    expires: date.toUTCString()
}));

assert.deepStrictEqual(parseMany("username=Luna; gender=female"), [
    new Cookie("username", "Luna"),
    new Cookie("gender", "female")
]);

console.log("All tests passed!");