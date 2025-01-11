/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StoryBook from './storybook';

const SHOW_STORYBOOK = false;

AppRegistry.registerComponent(appName, () =>
  SHOW_STORYBOOK ? StoryBook : App,
);
