const config = {
  auth: {
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID, // developer felületen kérjük
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI, // ahova visszaküldjük a felhasználónkat, developer felületen be kell állitani
      token_endpoint: "https://oauth2.googleapis.com/token", // url, ahova küldjük a requestet, hogy az access tokent megkapjuk
      user_endpoint: null,
      user_id: null,
    },
    github: {
      client_id: process.env.GITHUB_CLIENT_ID, // developer felületen kérjük
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT_URI, // ahova visszaküldjük a felhasználónkat, developer felületen be kell állitani
      token_endpoint: "https://github.com/login/oauth/access_token", // url, ahova küldjük a requestet, hogy az access tokent megkapjuk
      user_endpoint: "https://api.github.com/user",
      user_id: "id",
    },
    /*
        facebook: {
          clientId: "", // appid
          clientSecret: "", // app secret
          redirectUri: "", 
          tokenEndpoint: "", 
        },
        */
  },
};

module.exports = config;
