qiita-client-react-native
========================

React Native Sample Qiita Client App

Features

- Sign in Qiita
- Showing posts in ListView
- Showing user profile

## Installation

```
npm install
```

or

```
yarn
```

### Run on iOS

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
- redux-logger
- redux-thunk
- immutable
- moment
- redux-persist
- url-parse
- react-native-navigation
- etc ...
