export class APIUtil {
  async interceptRequest(page, url, method, response) {
    await page.route(url, (route) => {
      if (route.request().method() === method) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response),
        });
      } else {
        route.continue();
      }
    });
  }
}
