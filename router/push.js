const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subscription = mongoose.model('subscribers');
const q = require('q');
const webPush = require('web-push');
const keys = require('./../config/keys');
router.post('/', (req, res) => {
    const payload = {
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        ttl: req.body.ttl,
        icon: req.body.icon,
        image: req.body.image,
        badge: req.body.badge,
        tag: req.body.tag
    };

    Subscription.find({}, (err, subscriptions) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            let parallelSubscriptionCalls = subscriptions.map((subscription) => {
                return new Promise((resolve, reject) => {
                    const pushSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }
                    };

                    const pushPayload = JSON.stringify(payload);
                    const pushOptions = {
                        vapidDetails: {
                            subject: 'http://example.com',
                            privateKey: keys.privateKey,
                            publicKey: keys.publicKey
                        },
                        TTL: payload.ttl,
                        headers: {}
                    };
                    webPush.sendNotification(
                        pushSubscription,
                        pushPayload,
                        pushOptions
                    ).then((value) => {
                        resolve({
                            status: true,
                            endpoint: subscription.endpoint,
                            data: value
                        });
                    }).catch((err) => {
                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err
                        });
                    });
                });
            });
            q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
                console.info(pushResults);
            });
            res.json({
                data: 'Push triggered'
            });
        }
    });
});

router.get('/', (req, res) => {
    res.json({
        data: 'Invalid Request Bad'
    });
});
module.exports = router;