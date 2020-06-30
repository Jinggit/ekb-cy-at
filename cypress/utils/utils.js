export function dataGet(name) {
  return cy.get(`[data-cy=${name}]`)
}

export function initLangData(data) {
  let keys = Object.keys(data)
  let oo = {}
  let i = -1
  while (++i < keys.length) {
    let key = keys[i]
    let val = data[key]
    oo[key] = !val ? key : val
  }
  return oo
}

export function getNavigatorLanguages() {
  if (!navigator.languages.length) {
    return [navigator.language || navigator.userLanguage];
  }
  console.log(navigator.languages);
  return navigator.languages;
}