const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);


const baseConfig = mergeConfig(defaultConfig, {
 
});

const configWithNativeWind = withNativeWind(baseConfig, {
  input: './global.css', 
});


const finalConfig = wrapWithReanimatedMetroConfig(configWithNativeWind);

module.exports = finalConfig;

