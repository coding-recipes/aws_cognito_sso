
export class LocalStore {
  // methods to get and set data in local storage
  public static get(key: string): string | null {
    return localStorage.getItem(key);
  }
  public static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}