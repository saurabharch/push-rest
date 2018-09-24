const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.metaTags = {
        title: 'web-push-api',
        description: 'Web Push Notification Full Stack Application With Node Js Restful API',
        keywords: 'Web Push Notification Full Stack Application With Node Js Restful API',
        generator: '0.0.0.1',
        author: 'Saurabh Kashyap'
    };
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});

module.exports = router;