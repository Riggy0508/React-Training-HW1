import { registerRootComponent } from 'expo';

import 'intl-pluralrules'
import {setupI18n} from './i18n/setup'

import App from './App';

setupI18n()

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
