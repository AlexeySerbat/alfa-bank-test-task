import { Locator, Page, expect } from '@playwright/test';
import { MainPage } from './main.page';
import { HelpersUtils } from '../utils/helpers.util';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private rememberMeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#loginform-username');
    this.passwordInput = page.locator('#loginform-password');
    this.loginButton = page.locator('[name="login-button"]');
    this.rememberMeCheckbox = page.locator('#id="loginform-rememberme"');
  }

  async enterEmail(email: string): Promise<void> {
    const helpers = new HelpersUtils(this.page);
    await helpers.fillWithDelay(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    const helpers = new HelpersUtils(this.page);
    await helpers.fillWithDelay(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async verifyUserIsLoggedIn(username: string): Promise<void> {
    const mainPage = new MainPage(this.page);
    const helpers = new HelpersUtils(this.page);
    await helpers.waitForLocatorToBeVisible(this.page.locator(mainPage.username));
    await expect(this.page.locator(mainPage.userDropdown)).toBeVisible();
    await expect(this.page.locator(mainPage.username)).toHaveText(username);
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
