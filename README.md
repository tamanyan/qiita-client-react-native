qiita-client-react-native
========================

React Native Sample Qiita Client App

This project is built by React Native 0.44.0

Features

- Sign in Qiita
- Show posts in ListView
- Show user profile

## Screens

![simulator screen shot](https://cloud.githubusercontent.com/assets/2387508/26641903/ea50ad40-4666-11e7-9f00-01e51e3b607b.png)
![simulator screen shot](https://cloud.githubusercontent.com/assets/2387508/26641688/5a214e50-4666-11e7-8dae-67aca646cac6.png)

## Installation

```
npm install
```

or

```
yarn
```

## Create own qiita app

Visit https://qiita.com/settings/applications and create own qiita app

## Setup .env file

```
cp .env.example .env
```

Fill in Qiita CLIENT_ID and CLIENT_SECRET

## Run on iOS Simulator

```
react-native run-ios
```

## Run on iOS Device

Build bundlejs

```
react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle
```

Build app on xcode and install it into your device.

## Dependencies

- react-redux
- immutable
- moment
- url-parse
- redux-thunk
- redux-persist
- react-native-navigation
- react-native-config
- etc ...

## Qiita API

- https://qiita.com/api/v2/docs
