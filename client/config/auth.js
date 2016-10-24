// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1748642962076458', // your App ID
        'clientSecret'    : '0223329ac99a4d59fdab3bebeeac8ad7', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'Q8PcIX03xFtbLk8CBQy2rqEN8',
        'consumerSecret'     : 'JoZyKqS4MTvKaegVKy4xWJH063P9pX3C1cysY8XvRGmAIXcm2U',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '39572467463-cagf4nvikvti0rp9jgdvmrtncg9v3718.apps.googleusercontent.com',
        'clientSecret'     : 'S_SB_rCTn_edtDhGx8CsMgZB',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
