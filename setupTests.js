// setupTests.js

import '@testing-library/jest-dom';

// ✅ Mock ResizeObserver for Recharts
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// ✅ Mock fetch for tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)), // fake Excel buffer
  })
);
