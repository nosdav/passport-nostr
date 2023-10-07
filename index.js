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

  // Check for kind, method, and timestamp
  // if (
  //   event.kind !== 27235 ||
  //   !event.tags.find(tag => tag[0] === 'method' && tag[1] === method) ||
  //   !event.tags.find(tag => tag[0] === 'u' && tag[1] === url) ||
  //   Math.abs(event.created_at - Math.floor(Date.now() / 1000)) > 60 // time window of 60 seconds
  // ) {
  if (
    event.kind !== 27235 ||
    Math.abs(event.created_at - Math.floor(Date.now() / 1000)) > 60 // time window of 60 seconds
  ) {
    if (event.kind !== 27235) {
      console.log('Failure: event.kind is not 27235. Found:', event.kind)
    }

    // if (!event.tags.find(tag => tag[0] === 'method' && tag[1] === method)) {
    //   console.log('Failure: No matching method tag found. Expected method:', method)
    // }

    // if (!event.tags.find(tag => tag[0] === 'u' && tag[1] === url)) {
    //   console.log('Failure: No matching url tag found. Expected url:', url)
    // }

    const timestampDifference = Math.abs(event.created_at - Math.floor(Date.now() / 1000))
    if (timestampDifference > 60) {
      console.log('Failure: Timestamp is not within the 60 second window. Difference in seconds:', timestampDifference)
    }

    console.log('Auth header does not meet requirements')
    return false
  }

  const isVerified = verifySignature(event)
  if (isVerified) {
    return event.pubkey
  } else {
    return false
  }
}

export default NostrStrategy
