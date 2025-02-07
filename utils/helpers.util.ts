import { Locator, Page } from '@playwright/test';

export class HelpersUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForAttributeState(
    selector: string,
    attribute: string,
    state: boolean
  ) {
    await this.page.waitForFunction((selector) => {
      const element = document.querySelector(selector);
      return element && element.getAttribute(attribute) === `${state}`;
    }, selector);
  }

  async waitForLocatorToBeVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async fillWithDelay(locator: Locator, text: string, delay: number = 100) {
    await locator.clear();
    for (const char of text) {
      await locator.type(char, { delay });
    }
  }
}
