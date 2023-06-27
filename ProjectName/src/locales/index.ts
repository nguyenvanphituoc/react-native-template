import React, {cloneElement} from 'react';

import {I18n} from 'i18n-js';

import {DEFAULT_LANGUAGE} from './constant';
import {interpolate} from './i18n+interpolate';
import localization from './localization/index';

export interface LocalInterface {
  t: (scope: string, options?: any) => string;
  setLocale: (locale: string) => void;
  getLocale: () => string;
}

export class LocalProvider implements LocalInterface {
  private _i18n = new I18n(
    {
      ...localization,
    },
    {
      defaultLocale: DEFAULT_LANGUAGE.languageCode,
      enableFallback: true,
    },
  );

  constructor() {
    this._i18n.transformKey = (key: string): string => key;
    this._i18n.interpolate = interpolate;
  }

  t(scope: string, options?: any) {
    return this._i18n.t(scope, options);
  }

  setLocale(locale: string) {
    this._i18n.locale = locale;
  }

  getLocale() {
    return this._i18n.locale;
  }
}

const LocaleProvider = new LocalProvider();

export default LocaleProvider;
