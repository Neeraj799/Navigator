# Navigator — Trip Planning App

A React Native application built with Expo for the Codenzic Innovations technical assignment. The interface follows the supplied Figma references, using Nunito Sans typography, reusable components, and a shared trip draft.

The application includes the four required screens: Login, Set Locations, Trip Ready, and Route View, plus a registration screen. Authentication and routing are mocked; locations are entered manually or selected from saved suggestions.

## Design reference

[React Native Assignment on Figma](https://www.figma.com/design/fVtFLgOH147WiRTpSGxVqz/React-Native-Assignment?node-id=0-1)

The supplied screenshots are the visual reference for typography, colors, and components. Set Locations handles input; Trip Ready provides a separate read-only trip review to satisfy the written assignment requirement.

## Technology

| Technology | Purpose |
| --- | --- |
| React Native 0.86 / React 19 | Mobile interface and component state |
| Expo SDK 57 | Development environment and native modules |
| TypeScript | Static type checking |
| Expo Router | Screen navigation |
| NativeWind 4 / Tailwind CSS 3 | Utility-based styling and shared theme |
| Zod 4 | Login and registration validation |
| React Context | Shared pickup and destination draft |
| Expo Image | Bundled map image and transparent PNG route overlay |
| Expo Symbols | Platform icons and travel-mode markers |
| Expo Font / Expo Google Fonts | Bundled Nunito Sans font weights |
| EAS Build | Android APK generation |

Exact dependency versions are recorded in `package.json` and `package-lock.json`.

## Features

### Login and registration

- Email and password inputs with inline Zod validation.
- Password visibility toggle and keyboard Next/Done actions.
- Mock login: any valid email and password meeting the shared validation rules can continue.
- Registration with full name, valid email, and matching password confirmation. Login and registration require at least eight password characters, one uppercase letter, one number, and one special character; whitespace does not count as a special character.
- Forgot password remains visible without an action or message.
- No backend, account persistence, or credential storage.

### Set Locations

- Pickup and destination inputs with searchable local Doha suggestions.
- Case-insensitive search that normalizes repeated whitespace.
- Manual custom-address entry, clear controls, and pickup/destination swap.
- Next remains disabled for blank or identical locations.

### Trip Ready

- A distinct read-only review of the selected starting point and destination.
- Saved-place names and full addresses; custom locations show their entered text.
- Edit locations returns to the form with the shared draft preserved.
- View route opens Route View.
- Missing or identical locations redirect to Set Locations.
- Uses the same Nunito Sans typography, orange actions, and rounded cards as the rest of the app.

### Route View

- Bundled marina map illustration with route line and destination marker.
- Travel-mode marker: car for Drive, bicycle for Ride, and walking person for Walk.
- User-supplied map background (`assets/maps/map.jpg`) with a transparent route overlay (`assets/maps/route.png`) and markers.
- Map layers icon is clickable without displaying a message; no alternate map is loaded.
- Sample distance, duration, traffic message, and two instructions per mode.
- Arrival estimate based on the device time and sample duration.
- Manual navigation simulation with next-step, arrival, restart, and end actions.

## Screen flow

```text
Login / Registration -> Set Locations -> Trip Ready -> Route View
```

The location draft survives navigation between screens and resets when the application restarts. Route View redirects to Set Locations if the draft is incomplete or contains identical locations.

## Prerequisites

- Node.js LTS and npm. Development has used Node.js 24.
- An Android phone or an Android emulator.
- A Navigator development APK installed on the test device.
- An Expo account when creating builds with EAS.

Android Studio is optional for physical-phone testing. No map API key, backend URL, or application environment variables are required for the current implementation.

## Install and run

Clone this repository and open its root directory, then install the locked dependencies:

```sh
npm ci
```

Start Metro for the development APK:

```sh
npx expo start --dev-client --clear
```

On a physical phone, connect the phone and computer to the same Wi-Fi, then open Navigator using the terminal QR code or development-server URL. Keep Metro running while using the development build.

For a running Android emulator, install the development APK and press `a` in the Metro terminal to open the app.

If a native library or native configuration changes, rebuild and reinstall the development APK. Ordinary screen and styling changes do not require a new APK.

## Android development APK

The `development` profile in `eas.json` creates an internally distributed APK with the Expo development client. Sign in to an Expo account with access to the linked project:

```sh
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile development
```

Download the APK from the resulting EAS build page and install it on the phone. Android may ask you to allow installation from the browser or file manager.

The repository is currently linked to the original developer's EAS project. To build under a different account, link the checkout to a project owned by that account instead of reusing inaccessible project credentials.

**A development APK requires Metro and is not the final standalone submission APK.**

## Standalone APK status

A standalone submission APK has not yet been generated. The current `eas.json` contains only the development profile.

To prepare a standalone build, add a separate profile under `build` in `eas.json`, retaining the existing development profile:

```json
"preview": {
  "developmentClient": false,
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

After adding that profile, generate the standalone APK:

```sh
npx eas-cli@latest build --platform android --profile preview
```

Install the resulting APK and test the complete flow with Metro stopped. The final submission download link should be added here after that verification.

## Project structure

```text
assets/
├── images/                   App icons and splash images
├── expo.icon/                iOS icon resources
└── maps/                     Map background and route overlay assets
src/
├── app/
│   ├── _layout.tsx           Font loading, trip provider, navigation
│   ├── index.tsx             Redirect to Login
│   ├── login.tsx
│   ├── register.tsx
│   ├── set-locations.tsx
│   ├── trip-ready.tsx
│   └── route-view.tsx
├── components/
│   ├── app-text.tsx          Shared Nunito Sans text and weights
│   ├── form-field.tsx        Labeled input, focus styling, errors
│   ├── password-field.tsx    Reusable visibility control for registration
│   ├── location-selection.tsx
│   ├── route-logo.tsx
│   └── route-map.tsx
├── constants/                Colors, saved places, demo route fixtures
├── context/                  Shared trip draft
├── validation/               Zod form schemas
└── global.css                Tailwind directives
```

## Technical decisions

- **Local form state:** input values and visibility controls stay in their screens.
- **Shared trip state:** React Context carries pickup and destination through the trip flow without an external state library.
- **Location form:** Set Locations renders the location-selection component, which manages editing, suggestions, and proceeding to the separate Trip Ready review.
- **Central typography:** fonts load once, `AppText` supplies the default font, and input components use the same family.
- **Manual location entry:** pickup and destination use saved suggestions or typed addresses. Use current is clickable with press feedback only; the app does not request device location permission.
- **Explicit mocks:** static locations and route fixtures keep the assignment independent of a backend or paid mapping service.

## Mock behavior and limitations

- Login and registration validate input but do not authenticate or create accounts. Do not use real credentials for the demo.
- Pick on map is clickable with press feedback only; map-based location selection is not implemented.
- Suggested/recent places are predefined fixtures, not actual search history or live address search.
- Custom typed addresses are accepted but are not geocoded or verified.
- The map is a static bundled image with a demo route overlay, not a live geographic map. It has no pan/zoom or live tracking.
- Route geometry, distance, duration, traffic, and instructions are fixed samples and do not change according to the entered addresses. Ride means cycling.
- The mode marker remains at the route's starting point. The two navigation steps are illustrative, not a complete itinerary.
- Start navigation is a manual simulation, not GPS guidance or an external navigation integration.
- Drafts reset on application restart.
- Android is the primary test platform. iOS and web behavior have not been fully verified.

## Code checks

```sh
npx tsc --noEmit
npm run lint
```

Both checks passed during the latest local verification. These checks do not replace device testing. No automated device-test suite is configured.

## Manual testing

1. Submit empty or malformed Login inputs and confirm inline errors.
2. Check password visibility and registration password confirmation.
3. Select, type, clear, and swap locations. Confirm Next is disabled for empty or identical locations.
4. Clear Drop-off and search/select a replacement. Confirm Next opens Trip Ready with the new selection, Edit locations preserves the draft, and View route opens Route View.
5. Confirm Use current and Pick on map show press feedback without messages, navigation, or device location permission requests.
6. Navigate forward and back, confirming the draft is preserved.
7. Verify the detailed map display and Drive/Ride/Walk marker changes.
8. Start, advance, end, and restart the navigation simulation.
9. Check keyboard behavior, scrolling, Android Back, and layout on the test phone.
10. Before submission, install the standalone APK and repeat the flow without Metro running.

## Remaining submission work

- Use current and Pick on map intentionally provide press feedback only.
- Finish device testing and visual comparison with the Figma screenshots.
- Generate and verify the standalone APK, then add its download link.
- Add current app screenshots to this README.
- Commit and push the complete source to GitHub and verify reviewer access.
