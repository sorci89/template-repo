const router = require("express").Router();
const httpModule = require("../utils/http");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const http = httpModule();

const config = {
  google: {
    client_id:
      "790336458482-c0jg2sfogf7erd3f2dllh1rl95977tv3.apps.googleusercontent.com", // developer felületen kérjük
    client_secret: "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",
    redirect_uri: "http://localhost:3000/callback", // ahova visszaküldjük a felhasználónkat, developer felületen be kell állitani
    token_endpoint: "https://oauth2.googleapis.com/token", // url, ahova küldjük a requestet, hogy az access tokent megkapjuk
    user_endpoint: null,
    user_id: null,
  },
  github: {
    client_id: "057db2b85478eba0911a", // developer felületen kérjük
    client_secret: "e84d3ac199b45076a8be87ca7267cbacc5dd3244",
    redirect_uri: "http://localhost:3000/callback/github", // ahova visszaküldjük a felhasználónkat, developer felületen be kell állitani
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
};

router.post("/login", async (req, res) => {
  const payload = req.body;
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;

  if (!code || !provider) return res.sendStatus(400); // not enough data

  if (!Object.keys(config).includes(provider)) return res.sendStatus(400); // wrong provider was sent

  const response = await http.post(
    config[provider].token_endpoint,
    {
      code: code,
      client_id: config[provider].client_id,
      client_secret: config[provider].client_secret,
      redirect_uri: config[provider].redirect_uri,
      grant_type: "authorization_code",
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  let openId;

  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    // let accessToken = response.data.split("=")[1].split("&")[0];
    let accessToken = response.data.access_token;

    const userResponse = await http.get(config[provider].user_endpoint, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    });

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const id = config[provider].user_id;
    openId = userResponse.data[id];
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  const key = "providers." + provider;
  const user = await User.findOneAndUpdate(
    { [key]: openId },
    {
      providers: { [provider]: openId },
    },
    { upsert: true, new: true }
  );

  const token = jwt.sign(
    { userId: user._id, providers: user.providers },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });

  // if (!user) {
  //   User.create({
  //     providers: { [provider]: decoded.sub },
  //   });
  // }

  /*
    Recieve Google code -> get google token -> get userID -> 
    userID exists? send jwt token: create user and send jwt token
    */
});

module.exports = router;
