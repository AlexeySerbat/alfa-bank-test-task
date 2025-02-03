import { expect, Locator, Page } from "@playwright/test";

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
        this.username = page.locator(`${this.userDropdown} .text-uppercase`);
        this.cart = page.locator('#dropdownBasket');
        this.cartCount = page.locator(`${this.cart} .basket-count-items`);
        this.cartDropdown = page.locator('[aria-labelledby="dropdownBasket"]');
        this.goToCartButton = page.locator('[href="/basket"]');
    }

    async checkCartIsEmpty(): Promise<void> {
        expect(await this.cartCount.textContent()).toBe('0');
    }

    async openToCart(): Promise<void> {
        await this.cart.click();
    }

    async goToCart(): Promise<void> {
        await this.openToCart();
        await this.cartDropdown.click();
    }
}
