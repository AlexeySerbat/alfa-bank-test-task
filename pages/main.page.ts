import { expect, Locator, Page } from '@playwright/test';
import { HelpersUtils } from '../utils/helpers.util';
import { APIUtil } from '../utils/api.util';

export class MainPage {
  page: Page;
  userDropdown: string;
  username: string;
  cart: string;
  cartCount: string;
  cartDropdown: string;
  goToCartButton: string;
  elementWithoutDiscount: string;
  elementWithDiscount: string;
  buyButton: string;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = '#dropdownUser';
    this.username = '#dropdownUser .text-uppercase';
    this.cart = '#dropdownBasket';
    this.cartCount = '#basketContainer .basket-count-items';
    this.cartDropdown = '[aria-labelledby="dropdownBasket"]';
    this.goToCartButton = '[href="/basket"]';
    this.elementWithoutDiscount = '//span[@class="product_price ml-1" and not(s)]';
    this.elementWithDiscount = '//span[@class="product_price ml-1" and s]';
    this.buyButton = 'button[text()="Купить"]';
  }

  async checkCartCount(count: string): Promise<void> {
    const helpers = new HelpersUtils(this.page);
    await helpers.waitForLocatorToBeVisible(this.page.locator(this.cartCount));
    expect(await this.page.locator(this.cartCount).textContent()).toBe(count);
  }

  async openToCart(): Promise<void> {
    await this.page.locator(this.cart).click();
  }

  async goToCart(): Promise<void> {
    await this.openToCart();
    await this.page.locator(this.cartDropdown).click();
  }

  async clearCartApi(): Promise<void> {
    const apiUtil = new APIUtil();
    await apiUtil.sendPostRequest('https://enotes.pointschool.ru/basket/clear', {});
  }

  async addProductToCart(productName: string, discount: boolean): Promise<void> {
    if (discount) {
      await this.page
        .locator(`//div[text()="${productName}"]/following-sibling::div${this.elementWithDiscount}/parent::div/following-sibling::${this.buyButton}`)
        .click();
    } else {
      await this.page
        .locator(
          `//div[text()="${productName}"]/following-sibling::div${this.elementWithoutDiscount}/parent::div/following-sibling::${this.buyButton}`
        )
        .click();
    }
  }
}

// //div[text()="Творческий беспорядок"]/following-sibling::div//span[@class="product_price ml-1" and s]/parent::div/following-sibling::button[text()="Купить"]
