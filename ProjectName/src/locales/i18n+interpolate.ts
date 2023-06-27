import {cloneElement} from 'react';

import {I18n} from 'i18n-js';
import {isSet} from 'i18n-js/src/helpers/isSet';

type InterPolateType = I18n['interpolate'];
type InterPolateParamType = Parameters<InterPolateType>;

const separator = '_%SEPARATOR%_';

export function interpolate(
  i18n: InterPolateParamType['0'],
  message: InterPolateParamType['1'],
  options: InterPolateParamType['2'],
): any {
  options = Object.keys(options).reduce((buffer, key) => {
    buffer[i18n.transformKey(key)] = options[key];
    return buffer;
  }, {} as InterPolateParamType['2']);
  const matches = message.match(i18n.placeholder); // i18n.placeholder = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm

  if (!matches) {
    return message;
  }

  let hasElement = false;
  const values: string[] = [];

  while (matches.length) {
    let value;
    const placeholder = matches.shift() as string; // %{what}
    const name: string = placeholder.replace(i18n.placeholder, '$1'); // name = what

    if (isSet(options[name])) {
      // ORIGINAL: value = options[name].toString().replace(/\$/gm, '_#$#_')
      value =
        typeof options[name] === 'string'
          ? options[name].toString().replace(/\$/gm, '_#$#_')
          : options[name]; // keep components as it is
    } else if (name in options) {
      value = i18n.nullPlaceholder(i18n, placeholder, message, options);
    } else {
      value = i18n.missingPlaceholder(i18n, placeholder, message, options);
    }

    const regex = new RegExp(
      placeholder.replace(/\{/gm, '\\{').replace(/\}/gm, '\\}'),
    );

    // ORIGINAL: message = message.replace(regex, value)
    message = message.replace(regex, separator);
    values.push(value);
  }

  // ORIGINAL
  // return message.replace(/_#\$#_/g, '$')

  // EVERYTHING BELOW IS CUSTOM TO SUPPORT REACT ELEMENTS
  const messageParts = message
    .split(separator)
    .reduce((msgParts, part, index) => {
      msgParts.push(part);
      const val: any = values[index];

      if (typeof val === 'string' || typeof val === 'number') {
        msgParts.push(
          typeof val === 'string' ? val.replace(/_#\$#_/g, '$') : val,
        );
      } else if (typeof val === 'function') {
        hasElement = true;
        msgParts.push(cloneElement(val(), {key: index}));
      } else if (typeof val === 'object') {
        hasElement = true;
        msgParts.push(cloneElement(val, {key: index}));
      }

      return msgParts;
    }, [] as any[]);

  if (hasElement) {
    return messageParts;
  }

  return messageParts.join('');
}
