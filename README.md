![image](https://github.com/nosdav/passport-nostr/assets/65864/dd7adb6a-ddec-48d0-9d7f-25c7de53a4be)

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
import passport from 'passport'
import NostrStrategy from 'passport-nostr'

passport.use(new NostrStrategy())
```

### 3. Secure Endpoints

Secure your API endpoints effortlessly:

```javascript
app.get(
  '/protected',
  passport.authenticate('nostr', { session: false }),
  (req, res) => {
    res.json({ message: 'This is a protected endpoint.' })
  }
)
```

## 🛡️ Strategy Logic

### Overview

**Passport-Nostr** validates the `Authorization` header of incoming HTTP requests. The header should contain a Nostr authentication event, encoded in Base64, that confirms the request has been authenticated by a specific user. This strategy employs the [Nostr standards](https://github.com/nostr) for a decentralized social network.

### Mechanism

1. **Extract and Decode**: The `Authorization` header, prefixed with 'Nostr ', is extracted and decoded from Base64 to a JSON object.
2. **Event Verification**: The decoded object should represent a Nostr event with:

   - `kind` equal to `27235`.
   - `method` tag matching the HTTP method of the request.
   - `u` tag matching the request’s URL.
   - `created_at` timestamp within a 60-second window of the current time.

3. **Signature Verification**: The event is authenticated by verifying its signature.

### Example Logic

Here’s a simplified overview of the logic implemented in the **Passport-Nostr** strategy:

```javascript
import PassportStrategy from 'passport-strategy'
import { verifySignature } from 'nostr-tools'

class NostrStrategy extends PassportStrategy {
  // ... Constructor & other methods ...

  authenticate(req, options) {
    const authHeader = req.headers.authorization
    const method = req.method
    const url = req.protocol + '://' + req.get('host') + req.originalUrl

    // Validate and authenticate...
    const pubkey = isValidAuthorizationHeader(authHeader, method, url)

    // Handle authentication results...
  }
}

function isValidAuthorizationHeader(authorization, method, url) {
  // Decode and parse the event from the Authorization header...
  // Validate event details and signature...
  // Return the public key if valid, otherwise false...
}

export default NostrStrategy
```

### Detailed Flow

Upon receiving a request, the strategy:

- Extracts and decodes the Nostr event from the `Authorization` header.
- Validates the event’s `kind`, `method`, `u` (URL), and `created_at` (timestamp) against expected values and the request’s context.
- Verifies the event’s signature to confirm authenticity.
- If the event is valid, the request is authenticated. Otherwise, authentication fails.

For detailed implementation and validations, refer to the strategy code snippet provided in your message.

## 🛠️ Usage Example

Here’s a quick example to illustrate how **Passport-Nostr** can be implemented:

```javascript
import express from 'express'
import passport from 'passport'
import NostrStrategy from 'passport-nostr'

const app = express()

passport.use(new NostrStrategy())
app.use(passport.initialize())

app.get(
  '/protected',
  passport.authenticate('nostr', { session: false }),
  (req, res) => {
    res.json({ message: 'Access Granted to Protected Endpoint!' })
  }
)

app.listen(3344, () => {
  console.log('Server is running on port 3344')
})
```

## 💼 Use-Cases

- **API Key Protection**: Use as a simple API key solution for securing your endpoints.
- **Microservices**: Safeguard internal microservices with minimal configuration.
- **Prototyping**: Quickly secure endpoints during the prototyping or development phase.

## 🤝 Contributing

We welcome contributions to **Passport-Nostr**! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

**Passport-Nostr** is [MIT licensed](LICENSE).
