var webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BLlyFpXem7KCzB2x-eOKP_rKqqKkbEXmlUfZxm-LUaeE9FlbcMnQcoTT_4pmliphaGSOJoBr7o07u9-Jpe1A4LU",
  "privateKey": "ixXmSfvTzq28W1DLFlf-9Gdx_MwcDclSxToR_XbQaHg"
};

webPush.setVapidDetails(
  'mailto:aprizalhusna@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/eR8ViYNgcWw:APA91bH8HCH2MwdwHFaF9aX7S3XS3ScvZC0TRuIhhqHdvBSodNS5jrcTIQ-BxEt1dk6nmuBMnOuTIh5gK4guKdFgrfaGFiZJu2vT2sgjUChTq6TRi5Wf_3gu0wFu6Bs1adE1K7bwiid0",
  "keys": {
    "p256dh": "BCsl3EGjzZqG48JoQLAqHFLNGJirOTReWtlxStgzaX23JJLMvm6KK44M0xQGIrlqqi6ihPmXmluQujYFJXNcFDE=",
    "auth": "JzlmOUMyImlKVSsfpcUCuw=="
  }
};

var payload = 'We have just updated our Premier League standings';

var options = {
  gcmAPIKey: '388414894733',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
).then(success => {
  console.log(success)
}).catch(error => {
  console.log(error)
})