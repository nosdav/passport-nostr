#!/usr/bin/env node

import express from 'express'
import passport from 'passport'
import NostrStrategy from '../index.js'

const port = 3344

// Use the NostrStrategy within Passport.
passport.use(new NostrStrategy())

// Initialize Express app
const app = express()

// Initialize Passport
app.use(passport.initialize())

// Add CORS headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // or specify allowed domains instead of '*'
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// Handling OPTIONS requests
app.options('*', (req, res) => {
    res.sendStatus(200)
})

app.all(
    '/protected',
    passport.authenticate('nostr', { session: false }),
    (req, res) => {
        res.json({ message: 'This is a protected endpoint.' })
    }
)

app.get('/public', (req, res) => {
    res.json({ message: 'This is a public endpoint.' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
