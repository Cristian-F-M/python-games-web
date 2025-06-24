export {};

declare global {
  interface Window {
    setTabIndicator: (el: HTMLElement) => void
  }
}