const router = require("express").Router();
const http = require("../utils/http");
// const http = httpModule();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");
const config = require("../app.config");

router.post("/login", auth({ block: false }), async (req, res) => {
  const payload = req.body;
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;

  if (!code || !provider) return res.sendStatus(400); // not enough data

  if (!Object.keys(config.auth).includes(provider)) return res.sendStatus(400); // wrong provider was sent

  const response = await http.post(
    config.auth[provider].token_endpoint,
    {
      code: code,
      client_id: config.auth[provider].client_id,
      client_secret: config.auth[provider].client_secret,
      redirect_uri: config.auth[provider].redirect_uri,
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

    const userResponse = await http.get(config.auth[provider].user_endpoint, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    });

    if (!userResponse) return res.sendStatus(500);
    if (userResponse.status !== 200) return res.sendStatus(401);

    const id = config.auth[provider].user_id;
    openId = userResponse.data[id];
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  // User-t elmentjük az openid alapján
  const key = "providers." + provider;

  /* Provider profilok és egyén profil adatok összekötése nélkül:
  const user = await User.findOneAndUpdate(
    { [key]: openId },
    {
      providers: { [provider]: openId },
    },
    { upsert: true, new: true }
  );
  const token = jwt.sign(
    {
      userId: user._id, providers: user.providers
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    )
  */

  let user = await User.findOne({ [key]: openId });
  if (user && res.locals.user?.providers) {
    user.providers = { ...user.providers, ...res.locals.user.providers };

    user = await user.save();
  }

  const token = jwt.sign(
    // { userId: user ? user._id : null, providers: user.providers },
    {
      userId: user?._id,
      providers: user ? user.providers : { [provider]: openId },
    },
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

router.post("/create", auth({ block: true }), async (req, res) => {
  //elérhető: res.locals.user;

  if (!req.body?.username) return res.sendStatus(400);

  // user létrehozása
  const user = await User.create({
    username: req.body.username,
    providers: res.locals.user.providers,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      providers: user.providers,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
});

module.exports = router;
