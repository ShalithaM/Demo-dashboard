var express = require('express');
var router = express.Router();
var request = require('request');

/* 
 * Import constant files
 */
var statusCode = require('../constant/status_codes');
var respones = require('../constant/responses');
var message = require('../constant/messages');
var config = require('../constant/config');

/* 
 * Get dashboard data using max and last
 */
router.post('/', function (req, res, next) {

    var baseURL = `${config.baseURL}${config.apiKey}&max=${req.body.max}&last=${req.body.last}`

    request({
        url: baseURL,
        method: "GET",
        json: true,
    }, function (error, response, body) {
        if (error) {
            res.json(respones.failed(statusCode.INTERNAL_SERVER_ERROR.code, statusCode.INTERNAL_SERVER_ERROR.status, message.SERVER_ERROR.en, '#DB001'));
        }
        else {
            res.json(respones.success(statusCode.OK.code, statusCode.OK.status, message.SUCCESS.en, response.body));

        }
    });

})

module.exports = router;