class I18n {
  constructor(lang) {
    this.lang = lang
  }

  get(key) {
    const value = this.lang[key]
    return value || key
  }
}

export default I18n
