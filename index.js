import PassportStrategy from 'passport-strategy'
import { verifySignature } from 'nostr-tools'

class NostrStrategy extends PassportStrategy {
  constructor() {
    super()
    this.name = 'nostr'
  }

  failWithJSON() {
    // Send a JSON response on failure
    console.log('401')
    this.fail({ message: '401' }, 401)
  }

  authenticate(req, options) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Nostr ')) {
      // Authentication failed
      this.failWithJSON()
      return
    }

    const pubkey = isValidAuthorizationHeader(authHeader)

    if (pubkey) {
      // Authentication succeeded
      const user = { pubkey } // You might populate this object with additional user details if needed
      this.success(user)
    } else {
      // Authentication failed
      this.failWithJSON()
    }
  }
}

function isValidAuthorizationHeader(authorization) {
  console.log('authorization', authorization)
  const base64String = authorization.replace('Nostr ', '')

  // Decode the base64-encoded string and parse the JSON object
  const decodedString = Buffer.from(base64String, 'base64').toString('utf-8')
  console.log('decodedString', decodedString)
  if (!decodedString) {
    console.log('auth header is empty')
    return false
  }

  let event
  try {
    event = JSON.parse(decodedString)
  } catch (e) {
    console.error('Error parsing JSON:', e)
    return false
  }

  // Print the object
  console.log(event)

  const isVerified = verifySignature(event)
  if (isVerified) {
    return event.pubkey
  } else {
    return false
  }
}

export default NostrStrategy
