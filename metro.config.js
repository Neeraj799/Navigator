const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Match Tailwind's browser spacing: px-6 = 1.5rem = 24 native units.
module.exports = withNativeWind(config, { input: './src/global.css', inlineRem: 16 });
