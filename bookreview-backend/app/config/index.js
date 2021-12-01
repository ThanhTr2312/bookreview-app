const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: "mongodb://localhost:27017/bookreviews"
    },
    jwt: {
        secret: "bookreview-secret-key"
    }
};

module.exports = config;