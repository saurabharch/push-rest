module.exports = {
    mongoURI: 'mongodb://web-push:webpush123@ds213053.mlab.com:13053/web-push', //
    privateKey: process.env.VAPID_PRIVATE_KEY,
    publicKey: process.env.VAPID_PUBLIC_KEY
}