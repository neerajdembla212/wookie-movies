export class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    // @ts-ignore
    public callback: IntersectionObserverCallback, // @ts-ignore
    public options?: IntersectionObserverInit
  ) {
    this.root = null;
    this.rootMargin = "";
    this.thresholds = [];
  }

  observe(_target: Element) {}
  unobserve(_target: Element) {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
