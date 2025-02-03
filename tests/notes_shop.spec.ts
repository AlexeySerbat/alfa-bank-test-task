import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { Credentials } from '../fixtures/creds.enum';
import { mainModule } from 'process';

let mainMPage: MainPage;

test.beforeEach(async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const mainPage: MainPage = new MainPage(page);

  await page.goto('https://enotes.pointschool.ru/login');
  await loginPage.login(Credentials.username, Credentials.password);
  await loginPage.verifyUserIsLoggedIn(Credentials.username);
  await mainPage.checkCartIsEmpty();
});

test('#1. Переход в пустую корзину', async ({ page }) => {
  mainMPage = new MainPage(page);
  await mainMPage.goToCart();
});

test('#2.  Переход в корзину с 1 неакционным товаром', async ({ page }) => {
  mainMPage = new MainPage(page);
  await mainMPage.goToCart();
});