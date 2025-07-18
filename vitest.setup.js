import { vi } from "vitest";
import "@testing-library/jest-dom";

// ✅ Explicitly tell Vitest to use the manual mock
vi.mock("recharts", async () => {
  return await import("./__mocks__/recharts.js");
});
