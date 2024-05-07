import { homePage } from "../common/homePage";
import { log } from "../common/logger";
import * as dotenv from 'dotenv';
import { loginSteps, logout } from "../common/loginUtils";

dotenv.config();

describe('My Login application', () => {

    const trademeEmailAddress = process.env.TRADEME_CONSUMER_EMAIL!;
    const trademePassword = process.env.TRADEME_CONSUMER_PASSWORD!;
    const homePageUrl = process.env.TRADEME_BASE_URL!;

    beforeEach(async () => {
        await homePage(homePageUrl);
    })

    it('should login with valid credentials via Log in button', async () => {

        // Click on the "log in" on the home page
        const loginButton = await browser.$('div.tm-root__afiliates-sat-nav-functions div a.logged-out__log-in');
        await loginButton.waitForClickable();
        await loginButton.click();
        await log('Clicked "Log in" button on home page');

        // Validate the Login pop-up is loaded
        const loginPopup = await browser.$('div.o-modal__container');
        await loginPopup.waitForDisplayed();
        await log('Log in Popup is available');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        const homepageHeader = await browser.$('//div //p[text()=" Kia ora! Ready to find "]');
        await homepageHeader.waitForDisplayed();

        // Add expectations to validate successful login
        expect(await homepageHeader.waitForDisplayed()).toBe(true); // Ensure the homepage header exisits after the login

        await log('Completed login via Log in button');

        await logout();
    });

    it('should login with valid credentials via Watchlist button', async () => {

        // login via Watchlist icon
        const loginWatchlist = await browser.$('//li[contains(@class, "tm-shell-main-nav__member-options-list-item")]//span[text()="Watchlist"]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        await log('Clicked Watchlist button on home page');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        // validate if the page opened after login is the one related to the click
        const watchlistPage = await browser.$('//h2[@class="tm-watchlist__header-title"][text()="Watchlist"]');
        await watchlistPage.waitForDisplayed();

        // Add expectations to validate successful login
        expect(await watchlistPage.waitForDisplayed()).toBe(true); // It is showing the Watchlist Page

        await log('Completed login via Watchlist button');

        await logout();
    });

    it('should login with valid credentials via Favourites button', async () => {

        // login via Favourites icon
        const loginWatchlist = await browser.$('//li[contains(@class, "tm-shell-main-nav__member-options-list-item")]//span[text()="Favourites"]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        await log('Clicked Favourites button on home page');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        // validate if the page opened after login is the one related to the click
        const favouritesPage = await browser.$('//div[contains(@class, "favourites__header-container")]');
        await favouritesPage.waitForDisplayed();

        // Add expectations to validate successful login
        expect(await favouritesPage.waitForDisplayed()).toBe(true); // It is showing the Favourites Page

        await log('Completed login via Favourites button');

        await logout();

    });

    it('should login with valid credentials via My Trade Me button', async () => {

        // login via My Trade Me button
        const loginWatchlist = await browser.$('//a[contains(@classiclink, "MyTradeMe/Default.aspx")]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        await log('Clicked My Trade Me on home page');

        // Validate the login page after clicking Trade Me
        const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
        await loginFormDisplayed.isDisplayed();
        await log('Log in page is available');

        await loginSteps(trademeEmailAddress, trademePassword, false);

        // validate if the page opened after login is the one related to the click
        const myTradeMePage = await browser.$('//div[@id="mainContent"] //h1[text()="My Trade Me"]');
        await myTradeMePage.waitForDisplayed();

        // Add expectations to validate successful login
        expect(await myTradeMePage.waitForDisplayed()).toBe(true); // It is showing the My Trade Me Page

        await log('Completed login via My Trade Me button');

        await logout();
    });

    it('should check the errors when for login with invalid credentials via My Trade Me button', async () => {

        // login via My Trade Me button
        const loginWatchlist = await browser.$('//a[contains(@classiclink, "MyTradeMe/Default.aspx")]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        await log('Clicked My Trade Me on home page');

        // Validate the login page after clicking Trade Me
        const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
        await loginFormDisplayed.isDisplayed();
        await log('Log in page is available');

        await loginSteps(trademeEmailAddress, "password", false);

        const errorMessageDisplayed = await browser.$('//div[@class="validation-summary-errors"] //li[text()="Invalid email or password"]');

        // Validate error message
        const errorMessageText = await errorMessageDisplayed.getText();
        if (errorMessageText.includes('Invalid email or password')) {
            await log('Error message indicates invalid email or password');
        } else {
            await log('Error message does not match expected error');
        }
        // Assert error message content
        expect(errorMessageText).toContain('Invalid email or password');

        // click Cancel button
        const cancelBtn = await browser.$('//button //span[text()="Cancel"]');
        await cancelBtn.waitForClickable();
        await cancelBtn.click();

        await log('Completed login using invalid credentials');

    });
})

