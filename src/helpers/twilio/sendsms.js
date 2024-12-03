const config = require('../../config/config');

const client = require('twilio')(config.twilio.accountSID,config.twilio.authToken);

const sendSMS = async(to, body) => { 
    return client.messages.create({
        body,
        to,
        from: config.twilio.phoneNumber
    });
}

module.exports = sendSMS;
