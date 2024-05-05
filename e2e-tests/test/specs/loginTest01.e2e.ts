import { login } from "../common/login";

describe('My Login application', () => {
    xit('should login with valid credentials via Log in', async () => {

        try {
            // Open the browser and navigate to the page
            console.log('===== Opening sandbox page =====');
            await browser.url('https://www.tmsandbox.co.nz/');

            // Validate the page is loaded
            const loginFunctions = await browser.$('div.tm-root__afiliates-sat-nav-functions');
            await browser.waitUntil(async () => loginFunctions.waitForDisplayed());
            console.log('Home Page loaded');

            // ***** login via Log in Words *****
            // Click on the log in word
            const loginWord = await browser.$('div.tm-root__afiliates-sat-nav-functions div a.logged-out__log-in');
            // wait for the element to be avaiable for click action
            await loginWord.waitForClickable();
            await loginWord.click();
            console.log('Click "Log in"');

            // Validate the Login pop-up is loaded
            const loginPopup = await browser.$('div.o-modal__container');
            await loginPopup.waitForDisplayed();
            console.log('Log in Popup is available');

            // added to wait for the iframe to load.
            await browser.setTimeout({ implicit: 3000 });

            // switch to iframe available for login
            const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
            await browser.switchToFrame(loginIframe);
            console.log('switch to iframe login');

            // Perform login actions
            const trademeEmailAddress = process.env.TRADEME_CONSUMER_EMAIL!;
            const trademePassword = process.env.TRADEME_CONSUMER_PASSWORD!;

            const emailAddressField = await browser.$('input#Email.email-input');
            const passwordField = await browser.$('input#Password.password-input');

            await emailAddressField.waitForClickable();
            await emailAddressField.setValue(trademeEmailAddress);
            console.log('trademe email address added');

            await passwordField.waitForClickable();
            await passwordField.setValue(trademePassword);
            console.log('trademe password added');

            // added to wait for the iframe to load.
            await browser.setTimeout({ implicit: 3000 });

            // switch to iframe reCAPTCHA
            const reCAPTCHAIframes = await browser.$$('iframe[src*="https://www.recaptcha.net/recaptcha/enterprise/anchor?"]');
            // Check if at least one iframe is found
            if (reCAPTCHAIframes.length > 0) {
                // Switch to the first reCAPTCHA iframe
                await browser.switchToFrame(reCAPTCHAIframes[0]);
                console.log('switch to iframe reCAPTCHA');
                //esperar por interacao humana e adicionar o wait para a proxima pagina
            } else {
                console.error('No iframe matching the specified source attribute found.');
                // clica no login.


            }

            //validar a proxima pagina



            const loginButton = await browser.$('button[value="login"]');
            await loginButton.click();

        } catch (error) {
            console.error('An Error occured: ', error);
        } finally {
        }
    });

    it('Test login', async () => {

        await login('miltontest1@miltontest.co.nz', 'P@ssw0rd010203');

    });
})

