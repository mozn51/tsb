import { log } from "./logger";

/**
* Login Steps page
* @param trademeEmailAddress: user's email address used to login
* @param trademePassword: user's password used to login
* @param useIframe: true or false, used to validate and switch between iframes on the page.
*/
export async function loginSteps(trademeEmailAddress: string, trademePassword: string, useIframe: boolean = false) {

    await log('login Steps');

    if (useIframe) {
        // switch to iframe available for login
        const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        await browser.switchToFrame(loginIframe);
        await log('switched to iframe login');
    }

    // Perform login actions
    const emailAddressField = await browser.$("input#Email.email-input");
    const passwordField = await browser.$("input#Password.password-input");

    await emailAddressField.waitForClickable();
    await emailAddressField.setValue(trademeEmailAddress);
    await log('added trademe email address');

    await passwordField.waitForClickable();
    await passwordField.setValue(trademePassword);
    await log('added trademe password');

    if (useIframe) {
        // switch from iframe used for login
        await browser.switchToFrame(null);
    }

    // Human interaction to complete reCaptcha steps and click Login button.
    await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

    // Define a function to check if either logout button is available
    async function isLogoutButtonAvailable() {
        const logoutBtn1 = await browser.$('//input[@value="Log out"]');
        const logoutBtn2 = await browser.$('//a[text()=" Log out "]');
        return (await logoutBtn1.isExisting()) || (await logoutBtn2.isExisting());
    }

    // Define a function to check if the error message is displayed
    async function isErrorMessageDisplayedEmailOrPassword() {
        const errorMessage = await browser.$('//div[@class="validation-summary-errors"] //li[text()="Invalid email or password"]');
        return await errorMessage.isExisting();
    }

    // Define a function to check if the error message is displayed
    async function isErrorMessageDisplayedEmailOrPasswordEmpty() {
        const errorMessage = await browser.$('//span[@class="field-validation-error"]');
        return await errorMessage.isExisting();
    }

    // Check if either logout button is available
    if (await isLogoutButtonAvailable()) {
        await log('Logout button is available.');
    } else {
        await log('Waiting for the logout button to become available...');
    }

    // Wait for either logout button or error message to become available
    while (!(await isLogoutButtonAvailable()) && !(await isErrorMessageDisplayedEmailOrPassword()) && !(await isErrorMessageDisplayedEmailOrPasswordEmpty())) {
        // Add a short delay before checking again
        await browser.pause(40000); // Adjust the delay as needed
    }

    // Once the logout button is available, log a success message
    if (await isLogoutButtonAvailable()) {
        await log('Success login');
    } else if (await isErrorMessageDisplayedEmailOrPassword()) {
        await log('Error occurred after login attempt. Invalid email or password', true);
    } else if (await isErrorMessageDisplayedEmailOrPasswordEmpty()) {
        await log('Error occurred after login attempt. Email or Password Filed is Empty', true);
    }
}

export async function logout() {
    await log('Log out Steps');

    // Define locators for both types of logout buttons
    const inputLocator = '//input[@value="Log out"]';
    const linkLocator = '//a[text()=" Log out "]';

    // Check if the logout button using input locator is available
    const inputLogoutBtn = await browser.$(inputLocator);
    const isInputLogoutBtnDisplayed = await inputLogoutBtn.isDisplayed();

    if (isInputLogoutBtnDisplayed) {
        await inputLogoutBtn.waitForClickable();
        await inputLogoutBtn.click();
        await log('Logged out using input logout button');
        return;
    }

    // If the input logout button is not available, try using the link logout button
    const linkLogoutBtn = await browser.$(linkLocator);
    const isLinkLogoutBtnDisplayed = await linkLogoutBtn.isDisplayed();

    if (isLinkLogoutBtnDisplayed) {
        await linkLogoutBtn.waitForClickable();
        await linkLogoutBtn.click();
        await log('Logged out using link logout button');
        return;
    }

    // If neither logout button is available, log an error
    await log('Error: No logout button found. User may not be logged in.');
}

export async function login(trademeEmailAddress: string, trademePassword: string) {
    // to check if the user is already logged in
    if (await isLoggedIn()) {
        await log('User already logged in');
        return;
    }

    // open the browser and navigate to login page
    await log("Opening Login page");
    const baseUrl = process.env.TRADEME_BASE_URL!;
    const loginUrl = `${baseUrl}a/login`;
    await browser.url(loginUrl);

    await loginSteps(trademeEmailAddress, trademePassword, true);
}

export async function isLoggedIn() {
    const logoutBtn = await browser.$(`//a[text()=" Log out "]`);
    return logoutBtn.isDisplayed();
}
