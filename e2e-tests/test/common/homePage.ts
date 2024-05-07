import { log } from "../common/logger";

/**
* Opening Home page
* @param homePageUrl: the Url to open the homepage
*/
export async function homePage(homePageUrl: string) {

    // Open the browser and navigate to the page
    await browser.url(homePageUrl);
    log('Open Home Page');

    // Validate the Register and Log in is available
    const loginContainer = await browser.$('div.tm-root__afiliates-sat-nav-functions');
    await browser.waitUntil(async () => loginContainer.waitForDisplayed());

    // Validate the member options list is available
    const memberOptionsList = await browser.$('//ul[@class="tm-shell-main-nav__member-options-list"]');
    await browser.waitUntil(async () => memberOptionsList.waitForDisplayed());
    log('Home Page loaded');
}