import "@testing-library/jest-dom";
import { MockIntersectionObserver } from "../__mocks__/intersectionObserver";

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
