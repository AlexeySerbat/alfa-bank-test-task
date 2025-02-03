import { Locator, Page, expect } from "@playwright/test";
import { MainPage } from "./main.page";


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

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
    
    async checkRememberMe() {
        await this.rememberMeCheckbox.check();
    }

    async verifyUserIsLoggedIn(username: string) {
        const mainPage = new MainPage(this.page);
        await expect(mainPage.userDropdown).toBeVisible();
        await expect(mainPage.username).toHaveText(username.toUpperCase());
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}