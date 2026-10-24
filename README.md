# Navigator

Navigator is a React Native application for selecting trip locations, reviewing trip details, and exploring a simulated route.

## Features

- **Login and Registration:** input validation and password visibility controls.
- **Set Locations:** pickup and destination entry, saved suggestions, and location swapping.
- **Trip Ready:** review selected locations before viewing the route.
- **Route View:** static route map, Drive/Ride/Walk modes, and simulated navigation.

## Tech Stack

Expo, React Native, TypeScript, Expo Router, NativeWind, Zod, and React Context.

## Getting Started

### Prerequisites

- Node.js LTS and npm.
- An Android device or emulator.
- An Expo account with access to the linked EAS project to create builds. Alternatively, link the repository to your own EAS project.

### Installation

```sh
npm ci
```

### Development Build

Create and install the development APK:

```sh
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile development
```

Start the development server:

```sh
npx expo start --dev-client --clear
```

For physical-device testing, connect the device and computer to the same Wi-Fi network, then open the development build using the terminal QR code. Keep the server running during development.

## Android APK

[Download Navigator 1.0.0](https://expo.dev/artifacts/eas/gRREZX41wgP-vONVvANYelpWezTxvLs9cf3bRRyW31U.apk)

The standalone APK runs without a development server and was tested offline on Android 14.

Generate an Android APK with bundled JavaScript and assets:

```sh
npx eas-cli@latest build --platform android --profile preview
```

## Code Quality

Run lint and TypeScript checks:

```sh
npm run lint
npx tsc --noEmit
```

## Implementation Notes

- Authentication is mocked; no backend authentication or account persistence is implemented.
- Location suggestions and route details use sample data. The map is static, and navigation is simulated without GPS tracking.
- **Use current** and **Pick on map** provide press feedback only.
- Trip selections are preserved between screens and reset when the application restarts.

## Design Reference

[View the Figma design](https://www.figma.com/design/fVtFLgOH147WiRTpSGxVqz/React-Native-Assignment?node-id=0-1).
