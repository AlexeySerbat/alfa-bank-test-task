import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { Credentials } from '../fixtures/creds.enum';

let mainPage: MainPage;

test.describe('Тесты с пустой корзиной', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    mainPage = new MainPage(page);

    await page.goto('/login');
    await loginPage.login(Credentials.username, Credentials.password);
    await loginPage.verifyUserIsLoggedIn(Credentials.username);
    // await mainPage.clearCartApi();
    // await mainPage.checkCartCount('0');
  });

  test('#1. Переход в пустую корзину', async ({ page }) => {
    
    await mainPage.goToCart();
  });

  test('#2.  Переход в корзину с 1 неакционным товаром', async ({ page }) => {
    test.step('#1. Добавить в корзину один товар без скидки', async () => {
      await mainPage.addProductToCart('Блокнот в точку', false);
    });
  });

  test('#3.  Переход в корзину с 1 неакционным товаром', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goToCart();
  });

  test('#5.  Переход в корзину с 1 неакционным товаром', async ({ page }) => {
    await mainPage.goToCart();
  });
});

test.describe('Тесты с пустой корзиной', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const mainPage: MainPage = new MainPage(page);

    await page.goto('/login');
    await loginPage.login(Credentials.username, Credentials.password);
    await loginPage.verifyUserIsLoggedIn(Credentials.username);
    await mainPage.checkCartCount('0');

    test('#4. Переход в корзину с 9 разными товарами.', async ({ page }) => {});
  });
});
