# CryptoWall

A encryption / decryption service for Webtask.io using AES-256 cipher

### Deploying

```bash
git clone https://github.com/alanhoff/webtask-cryptowall && cd webtask-cryptowall
wt create cryptowall.js --no-parse --no-merge
```

### Encrypting data

```
http POST https://your_app.webtask.io/cryptowall/encrypt text="Hello world" password=here_be_dragons
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8

{
    "result": "a7b7ec0d49855d7ff743494090c53e82"
}
```

### Decrypting data

```
http POST https://your_arr.run.webtask.io/cryptowall/decrypt input=a7b7ec0d49855d7ff743494090c53e82 password=here_be_dragons
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8

{
    "result": "Hello world"
}
```

### Tests

Until this point in time (`2017-05-08T20:43:48.530Z`) Auth0 do not support any
official unit testing integration as [described here](https://auth0.com/forum/t/anyone-run-automated-testing-with-webtask-io/3229).

### ISC License

ISC License

Copyright (c) 2017, Alan Hoffmeister <alanhoffmeister@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

