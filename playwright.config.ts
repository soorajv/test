import type { PlaywrightTestConfig } from "@playwright/test";
import { expect } from "@playwright/test";
import playwrightApiMatchers from "odottaa";

// 2. extend expect with custom API matchers
expect.extend(playwrightApiMatchers);
const config: PlaywrightTestConfig = {
  use: {
    extraHTTPHeaders: {
      // We set this header
      Accept: "application/json",
    },
  },
};
export default config;
