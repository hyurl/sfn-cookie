const Cookie = require("./");

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