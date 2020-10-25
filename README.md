<p align="left">
  <img width="100" src="https://pbtechhackathon2020.vercel.app/toast.png">
</p>

# 🌴 Palm Beach Tech Hackathon 2020 🏝 

## 🤔 Why

[52 million tons of food end up thrown away.  30-40% of food produced in the US, $218b worth,
end up in the garbage.](https://www.nycfoodpolicy.org/food-and-tech-solutions-to-recover-redistribute-food-waste/)  It's an odd, paradoxial world, when businesses are paying to get rid
of food while others are paying to acquire it so they can give it away.  We think tech can
help with the logistical problems.

## 🔍 What

We chose to build a broker system between the suppliers (e.g. grocery stores, restaurants, etc.)
and those that want to acquire the food (NGO's, food banks, etc).

## 👾 How

This project uses the following stack to deliver on the proposed entry:

- [Vercel](http://vercel.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextJS](https://nextjs.org/)
- [roomservice.dev](https://www.roomservice.dev/)
- [Firebase](https://firebase.google.com/)
- [MapBox](mapbox.com)
- [daily.co](https://www.daily.co/)

<p align="center">
  <img src="https://pbtechhackathon2020.vercel.app/demo.gif">
</p>

## 👟 Run this yourself

Here are a few things you need to do to get this project up and running locally, once you pull this down
from GitHub and run `npm install`:

### Setup Firebase

1. Setup a new Firebase project: https://firebase.google.com/docs/guides
2. Go to Settings -> Add a new app (for the web).  You're going to need the values of the config they
generate in the `ENV file` section below
3. Go to Authentication -> Sign-in method and enable Google sign-in
4. Enable a Firestore database
5. If you're just looking to play around really quick, go to the rules of your firestore db and change it to:

```text
    match /{document=**} {
      allow read, write;
    }
```

**NOTE** - You don't want to leave it this way in production, this is just to get you up and running fast.
[Read more about this feature](https://firebase.google.com/docs/firestore/security/get-started)


### ENV file

Create an `.env` file in the root of the repo, you'll need to populate these with your own keys:

```bash
# Firebase config you can get from a Firebase project's settings
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_DATABASE_URL=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGE_SENDER_ID=...
FIRSEBASE_APP_ID=...
# roomservice.dev key
ROOMSERVICE=...
# mapbox key
MAPS_KEY=...
# daily.co key
VIDEO_URL=...
```

Likewise, if you're going to run this on something like Vercel, you'll need to make sure these vars
are filled out in the Vercel project's settings.

### Run it

`npm run dev` and go to `http://localhost:3000/`!
