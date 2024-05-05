import { log } from "../common/logger";
import * as dotenv from "dotenv";

dotenv.config();

export async function login(trademeEmailAddress: string, trademePassword: string
) {
    if (await isLoggedIn()) {
        await log('User already logged in');
        return;
    }

    // Open the browser and navigate to home page
    await log("Opening Login page");
    const baseUrl = process.env.TRADEME_BASE_URL!;
    const loginUrl = `${baseUrl}a/login`;
    await browser.url(loginUrl);
    
    const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
    await loginFormDisplayed.isDisplayed();
    await log('Log in page is available');

    // added to wait for the iframe to load.
    await browser.setTimeout({ implicit: 3000 });

    // switch to iframe to add user's details for login
    const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
    await browser.switchToFrame(loginIframe);
    await log('switched to iframe login');

    // Perform login actions
    const emailAddressField = await browser.$("input#Email.email-input");
    const passwordField = await browser.$("input#Password.password-input");

    await emailAddressField.waitForClickable();
    await emailAddressField.setValue(trademeEmailAddress);
    await log('added trademe email address');

    await passwordField.waitForClickable();
    await passwordField.setValue(trademePassword);
    await log('added trademe password');

    // switch from iframe used for login
    await browser.switchToFrame(null);

    // Human interaction to complete reCaptcha steps and click Login button.
    await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

    //added timeout for the human interaction.
    const logoutBtn = await browser.$('//a[text()=" Log out "]');
    await logoutBtn.waitForExist({ timeout: 40000 });
    await log('Success login');
}

export async function isLoggedIn() {
    const logoutBtn = await browser.$(`//a[text()=" Log out "]`);
    return logoutBtn.isDisplayed();
}