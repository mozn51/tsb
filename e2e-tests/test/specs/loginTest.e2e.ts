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
    
    afterEach(async () => {
        await logout();
     })

    it('should login with valid credentials via Log in button', async () => {

        // Click on the "log in" on the home page
        const loginButton = await browser.$('div.tm-root__afiliates-sat-nav-functions div a.logged-out__log-in');
        await loginButton.waitForClickable();
        await loginButton.click();
        log('Clicked "Log in" button on home page');

        // Validate the Login pop-up is loaded
        const loginPopup = await browser.$('div.o-modal__container');
        await loginPopup.waitForDisplayed();
        log('Log in Popup is available');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        // // switch to iframe available for login
        // const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        // await browser.switchToFrame(loginIframe);
        // console.log('switched to iframe login');

        // // Perform login actions
        // const emailAddressField = await browser.$("input#Email.email-input");
        // const passwordField = await browser.$("input#Password.password-input");

        // await emailAddressField.waitForClickable();
        // await emailAddressField.setValue(trademeEmailAddress);
        // await log('added trademe email address');

        // await passwordField.waitForClickable();
        // await passwordField.setValue(trademePassword);
        // await log('added trademe password');

        // // switch from iframe used for login
        // await browser.switchToFrame(null);

        // // Human interaction to complete reCaptcha steps and click Login button.
        // await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

        // //added timeout for the human interaction.
        // const logoutBtn = await browser.$('//a[text()=" Log out "]');
        // await logoutBtn.waitForExist({ timeout: 40000 });
        // await log('Success login');

        
        const homepageHeader = await browser.$('//div //p[text()=" Kia ora! Ready to find "]');
        await homepageHeader.waitForDisplayed();

        // Add expectations to validate successful login
        expect(await homepageHeader.waitForDisplayed()).toBe(true); // Ensure the homepage header exisits after the login
    });

    it('should login with valid credentials via Watchlist button', async () => {

       // login via Watchlist icon
        const loginWatchlist = await browser.$('//li[contains(@class, "tm-shell-main-nav__member-options-list-item")]//span[text()="Watchlist"]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        log('Clicked Watchlist button on home page');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        // // switch to iframe available for login
        // const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        // await browser.switchToFrame(loginIframe);
        // console.log('switched to iframe login');

        // // Perform login actions
        // const emailAddressField = await browser.$("input#Email.email-input");
        // const passwordField = await browser.$("input#Password.password-input");

        // await emailAddressField.waitForClickable();
        // await emailAddressField.setValue(trademeEmailAddress);
        // await log('added trademe email address');

        // await passwordField.waitForClickable();
        // await passwordField.setValue(trademePassword);
        // await log('added trademe password');

        // // switch from iframe used for login
        // await browser.switchToFrame(null);

        // // Human interaction to complete reCaptcha steps and click Login button.
        // await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

        // // added timeout for the human interaction.
        // const logoutBtn = await browser.$('//a[text()=" Log out "]');
        // await logoutBtn.waitForExist({ timeout: 40000 });
        // await log('Success login');

        // validate if the page opened after login is the one related to the click
        const watchlistPage = await browser.$('//h2[@class="tm-watchlist__header-title"][text()="Watchlist"]');
        await watchlistPage.waitForDisplayed();        

        // Add expectations to validate successful login
        expect(await watchlistPage.waitForDisplayed()).toBe(true); // It is showing the Watchlist Page
    });

    it('should login with valid credentials via Favourites button', async () => {

       // login via Favourites icon
        const loginWatchlist = await browser.$('//li[contains(@class, "tm-shell-main-nav__member-options-list-item")]//span[text()="Favourites"]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        log('Clicked Favourites button on home page');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });

        await loginSteps(trademeEmailAddress, trademePassword, true);

        // // switch to iframe available for login
        // const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        // await browser.switchToFrame(loginIframe);
        // console.log('switched to iframe login');

        // // Perform login actions
        // const emailAddressField = await browser.$("input#Email.email-input");
        // const passwordField = await browser.$("input#Password.password-input");

        // await emailAddressField.waitForClickable();
        // await emailAddressField.setValue(trademeEmailAddress);
        // await log('added trademe email address');

        // await passwordField.waitForClickable();
        // await passwordField.setValue(trademePassword);
        // await log('added trademe password');

        // // switch from iframe used for login
        // await browser.switchToFrame(null);

        // // Human interaction to complete reCaptcha steps and click Login button.
        // await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

        // // added timeout for the human interaction.
        // const logoutBtn = await browser.$('//a[text()=" Log out "]');
        // await logoutBtn.waitForExist({ timeout: 40000 });
        // await log('Success login');

        // validate if the page opened after login is the one related to the click
        const favouritesPage = await browser.$('//div[contains(@class, "favourites__header-container")]');
        await favouritesPage.waitForDisplayed();        

        // Add expectations to validate successful login
        expect(await favouritesPage.waitForDisplayed()).toBe(true); // It is showing the Watchlist Page

    });

    it('should login with valid credentials via My Trade Me button', async () => {

        // login via My Trade Me button
        const loginWatchlist = await browser.$('//a[contains(@classiclink, "MyTradeMe/Default.aspx")]');
        await loginWatchlist.waitForClickable();
        await loginWatchlist.click();
        log('Clicked My Trade Me on home page');

        // Validate the login page after clicking Trade Me
        const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
        await loginFormDisplayed.isDisplayed();
        log('Log in page is available');

        await loginSteps(trademeEmailAddress, trademePassword, false);

        // // Perform login actions
        // const emailAddressField = await browser.$("input#Email.email-input");
        // const passwordField = await browser.$("input#Password.password-input");

        // await emailAddressField.waitForClickable();
        // await emailAddressField.setValue(trademeEmailAddress);
        // await log('added trademe email address');

        // await passwordField.waitForClickable();
        // await passwordField.setValue(trademePassword);
        // await log('added trademe password');

        // // Human interaction to complete reCaptcha steps and click Login button.
        // await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

        // // added timeout for the human interaction.
        // const logoutBtn = await browser.$('//a[text()=" Log out "]');
        // await logoutBtn.waitForExist({ timeout: 40000 });
        // await log('Success login');

        // validate if the page opened after login is the one related to the click
        const myTradeMePage = await browser.$('//div[@id="mainContent"] //h1[text()="My Trade Me"]');
        await myTradeMePage.waitForDisplayed();        

        // Add expectations to validate successful login
        expect(await myTradeMePage.waitForDisplayed()).toBe(true); // It is showing the Watchlist Page
    });
})

