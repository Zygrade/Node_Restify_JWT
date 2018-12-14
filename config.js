module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3001,
    BURL : process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI : process.env.MONGODB_URI || 'mongodb://yadnesh:yadnesh123@ds139585.mlab.com:39585/restify_jwt'
}