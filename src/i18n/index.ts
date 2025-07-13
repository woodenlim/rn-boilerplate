import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';

import enCommon from './en/common.json';
import enAuth from './en/auth.json';
// import enChat from './en/chat.json';

import zhCommon from './zh/common.json';
import zhAuth from './zh/auth.json';
// import zhChat from './zh/chat.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    // chat: enChat,
  },
  zh: {
    common: zhCommon,
    auth: zhAuth,
    // chat: zhChat,
  },
};

// const fallback = { languageTag: 'en', isRTL: false };
// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

i18n.use(initReactI18next).init({
  //   compatibilityJSON: 'v3',
  //   lng: languageTag,
  fallbackLng: 'en',
  debug: true,
  resources,
  //   ns: ['common', 'auth', 'chat'],
  // defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
