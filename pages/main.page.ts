import { expect, Locator, Page } from '@playwright/test';
import { HelpersUtils } from '../utils/helpers.util';
import { APIUtil } from '../utils/api.util';

export class MainPage {
  page: Page;
  userDropdown: Locator;
  username: Locator;
  cart: Locator;
  cartCount: Locator;
  cartDropdown: Locator;
  goToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('#dropdownUser');
    this.username = page.locator('#dropdownUser .text-uppercase');
    this.cart = page.locator('#dropdownBasket');
    this.cartCount = page.locator('#basketContainer .basket-count-items');
    this.cartDropdown = page.locator('[aria-labelledby="dropdownBasket"]');
    this.goToCartButton = page.locator('[href="/basket"]');
  }

  async checkCartIsEmpty(): Promise<void> {
    const helpers = new HelpersUtils(this.page);
    await helpers.waitForLocatorToBeVisible(this.cartCount);
    expect(await this.cartCount.textContent()).toBe('0');
  }

  async openToCart(): Promise<void> {
    await this.cart.click();
  }

  async goToCart(): Promise<void> {
    await this.openToCart();
    await this.cartDropdown.click();
  }

  async clearCartApi(): Promise<void> {
    const apiUtil = new APIUtil();
    await apiUtil.interceptRequest(this.page, '/basket/clear', 'POST', {
      response: 'true',
    });
  }
}
