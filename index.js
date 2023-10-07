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
            const user = {} // You might populate this object with user details if needed
            this.success(user)
        } else {
            // Authentication failed
            this.fail()
        }
    }
}

export default NostrStrategy
