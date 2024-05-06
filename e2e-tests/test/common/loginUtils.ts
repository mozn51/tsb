import { log } from "./logger";

export async function loginSteps(email: string, password: string, useIframe: boolean = false) {
    if (useIframe) {
        // switch to iframe available for login
        const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        await browser.switchToFrame(loginIframe);
        log('switched to iframe login');
    }

    // Perform login actions
    const emailAddressField = await browser.$("input#Email.email-input");
    const passwordField = await browser.$("input#Password.password-input");

    await emailAddressField.waitForClickable();
    await emailAddressField.setValue(email);
    await log('added trademe email address');

    await passwordField.waitForClickable();
    await passwordField.setValue(password);
    await log('added trademe password');

    if (useIframe) {
        // switch from iframe used for login
        await browser.switchToFrame(null);
    }

    // Human interaction to complete reCaptcha steps and click Login button.
    await log('========== Human interaction - Please complete reCaptcha and click Login button ==========');

    //added timeout for the human interaction.
    // Define a function to check if either logout button is available
    async function isLogoutButtonAvailable() {
        const logoutBtn1 = await browser.$('//input[@value="Log out"]');
        const logoutBtn2 = await browser.$('//a[text()=" Log out "]');
        return (await logoutBtn1.isExisting()) || (await logoutBtn2.isExisting());
    }

    // Check if either logout button is available
    if (await isLogoutButtonAvailable()) {
        await log('Logout button is available.');
    } else {
        await log('Waiting for the logout button to become available...');
    }

    // Wait for either logout button to become available
    while (!(await isLogoutButtonAvailable())) {
        // Add a short delay before checking again
        await browser.pause(4000); // Adjust the delay as needed
    }

    // Once the logout button is available, log a success message
    await log('Success login');
}

export async function logout(logoutButtonLocator: 'input' | 'link' = 'link') {
    let logoutBtn;

    // Determine the locator strategy based on the input parameter
    switch (logoutButtonLocator) {
        case 'input':
            logoutBtn = await browser.$('//input[@value="Log out"]');
            break;
        case 'link':
            logoutBtn = await browser.$('//a[text()=" Log out "]');
            break;
        default:
            throw new Error('Invalid logout button locator provided.');
    }

    // Check if the logout button is displayed
    const isDisplayed = await logoutBtn.isDisplayed();
    if (!isDisplayed) {
        log("User is not logged in. No need to log out.");
        return;
    }
    // If the logout button is displayed, proceed with the logout process
    await logoutBtn.waitForClickable();
    await logoutBtn.click();
    await log('Logout user from the site');
}
