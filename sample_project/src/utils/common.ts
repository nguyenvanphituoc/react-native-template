//check data null
export const isNull = (data: any) => {
  if (data === undefined || data == null || data.length === 0) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  }
  return false;
};

// URL
export const validURL = (str: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};
//validate
export const isValidateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const isValidatePasswordLength = (text: string) => {
  const re =
    /^([a-zA-Z0-9!@#$%^&*₹•.₫€£¥₩○●□■♤♡◇♧☆▪︎¤±≡№‽₱·†‡‚‹›♪♦Ωμ←↑↓→′″∞℅≤⟨≥⟩〔「『〕」』♠♥◆♣★《》–—₽§”“„»«…’‘‰≠≈¡¿√π÷×¶∆¢°©®™✓,`~<>/\\()_|+\-=?;:'"]){8,32}$/;
  return re.test(text);
};
export const isValidatePasswordCharacter = (text: string) => {
  const containUpper = /[A-Z]/;
  const containLower = /[a-z]/;
  const containNumber = /[0-9]/;
  return (
    containUpper.test(text) &&
    containLower.test(text) &&
    containNumber.test(text)
  );
};
// enhancement
export const removeSpace = (text: string) => {
  return text.replace(/\s/g, '');
};
