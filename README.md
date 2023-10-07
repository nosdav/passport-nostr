<div align="center">  
  <h1>passport-nostr</h1>
</div>

<div align="center">  
<i>passport-nostr</i>
</div>

---

<div align="center">
<h4>Documentation</h4>
</div>

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nosdav/passport-nostr/blob/gh-pages/LICENSE)
[![npm](https://img.shields.io/npm/v/passport-nostr)](https://npmjs.com/package/passport-nostr)
[![npm](https://img.shields.io/npm/dw/passport-nostr.svg)](https://npmjs.com/package/passport-nostr)
[![Github Stars](https://img.shields.io/github/stars/nosdav/passport-nostr.svg)](https://github.com/nosdav/passport-nostr/)

# Passport-Nostr

Elegantly secure your Express.js APIs with the **Passport-Nostr** strategy, an easy-to-integrate solution for simple authentication using the Passport.js middleware.

![Banner Image](banner.png)

## 🚀 Getting Started

### 1. Install

Integrate **Passport-Nostr** into your project using npm or Yarn:

```bash
npm install passport-nostr
# OR
yarn add passport-nostr
```

### 2. Implement Strategy

Implement the **NostrStrategy** in your Express.js application:

```javascript
import passport from 'passport';
import NostrStrategy from 'passport-nostr';

passport.use(new NostrStrategy());
```

### 3. Secure Endpoints

Secure your API endpoints effortlessly:

```javascript
app.get(
    '/protected',
    passport.authenticate('nostr', { session: false }),
    (req, res) => {
        res.json({ message: 'This is a protected endpoint.' });
    }
);
```

## 🛡️ Strategy Logic

**Passport-Nostr** operates on a simple logic - authenticate requests containing the word `'nostr'` in the `Authorization` header:

```javascript
import PassportStrategy from 'passport-strategy'

class NostrStrategy extends PassportStrategy {
    constructor() {
        super()
        this.name = 'nostr'
    }

    authenticate(req, options) {
        // Extract the Authorization header from the request
        const authHeader = req.headers.authorization

        // Check if the Authorization header contains the word "nostr"
        if (authHeader && authHeader.includes('nostr')) {
            // Authentication succeeded
            const user = {} // Populate with user details if needed
            this.success(user)
        } else {
            // Authentication failed
            this.fail()
        }
    }
}

export default NostrStrategy
```

## 🛠️ Usage Example

Here’s a quick example to illustrate how **Passport-Nostr** can be implemented:

```javascript
import express from 'express';
import passport from 'passport';
import NostrStrategy from 'passport-nostr';

const app = express();

passport.use(new NostrStrategy());
app.use(passport.initialize());

app.get(
    '/protected',
    passport.authenticate('nostr', { session: false }),
    (req, res) => {
        res.json({ message: 'Access Granted to Protected Endpoint!' });
    }
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## 💼 Use-Cases

- **API Key Protection**: Use as a simple API key solution for securing your endpoints.
- **Microservices**: Safeguard internal microservices with minimal configuration.
- **Prototyping**: Quickly secure endpoints during the prototyping or development phase.

## 🤝 Contributing

We welcome contributions to **Passport-Nostr**! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

**Passport-Nostr** is [MIT licensed](LICENSE).
