# Overhaul

This repo stores the website source code for Western Developer Society's 2025 Overhaul hackathon.

## Building

`npm` is required to install the necessary modules.

Run the following commands in a clone of this repo to install everything:

```sh
npm install --force
npm audit fix --force
```

```sh
npm install firebase --legacy-peer-deps
npm install dotenv --legacy-peer-deps
npm install react-firebase-hooks --legacy-peer-deps
npm install @tensorflow/tfjs  
```

You can then run the website locally with:

```sh
npm run dev
```

