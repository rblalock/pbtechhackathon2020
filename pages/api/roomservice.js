const API_KEY = process.env.ROOMSERVICE;

/**
 * In production this would be a check against the user store to ensure it's valid
 * ref. https://github.com/vercel/next.js/tree/canary/examples/with-firebase-authentication
 */
const isLoggedIn = (req) => {
  return true;
}

export default async (req, res) => {
  if (!isLoggedIn(req) || !req.query.user) {
    return res.send(401);
  }

  const body = req.body;
  // We wouldn't do this in prod, since anyone could impersonate a user, ref. the comment in isLoggedIn above, for what should be done
  const user = 'user-' + req.query.user;

  const r = await fetch('https://super.roomservice.dev/provision', {
    method: 'post',
    headers: {
      Authorization: `Bearer: ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
      resources: body.resources,
    }),
  });

  const json = await r.json();
  res.json(json);
};
