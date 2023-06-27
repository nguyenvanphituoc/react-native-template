export enum SupportLanguage {
  en = 'en',
}

// choose US or GB to use their english language
export type AssociatedCountryWithLanguage = 'us' | 'vi';
export const countryWithLanguageKeys = ['us', 'gb'];

// display language name in another language
export const MAPPING_COUNTRY_LANGUAGE: {
  [key in AssociatedCountryWithLanguage]: LanguageType;
} = {
  us: {
    languageName: 'language.enName',
    languageCode: SupportLanguage.en,
    order: 1,
    isRTL: false,
  },
  vi: {
    languageName: 'language.viName',
    languageCode: SupportLanguage.en,
    order: 2,
    isRTL: false,
  },
};
//
export type LanguageType = {
  languageName: string;
  languageCode: SupportLanguage;
  order: number;
  isRTL: boolean;
};

// export type DATA_TYPE = CountryItem & LanguageType;
export type DATA_TYPE = LanguageType;

// us/ gb, vn, jp, cn
const countryCodes = [
  {
    code: 'us' as AssociatedCountryWithLanguage,
    name: 'United States',
    native: 'United States',
    phone: '1',
    continent: 'NA',
    capital: 'Washington D.C.',
    currency: 'USD',
    languages: ['en'],
    // LanguageType
    languageCode: SupportLanguage.en,
  },
];

export const DATA: DATA_TYPE[] = (
  countryCodes.filter(
    c =>
      countryWithLanguageKeys.includes(c.code) &&
      Object.assign(c, MAPPING_COUNTRY_LANGUAGE[c.code]),
  ) as unknown as DATA_TYPE[]
)
  .filter(d => d.languageName)
  .sort((a, b) => a.order - b.order);

export const DEFAULT_LANGUAGE = DATA.find(
  d => d.languageCode === SupportLanguage.en,
) as DATA_TYPE;

export const getLanguageSafe = (languageCode?: string) => {
  const language = DATA.find(d => d.languageCode === languageCode);
  return language || DEFAULT_LANGUAGE;
};
