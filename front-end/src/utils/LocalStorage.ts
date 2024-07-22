export class LocalStorage {
  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem(key: string) {
    return localStorage.getItem(key);
  }
}
