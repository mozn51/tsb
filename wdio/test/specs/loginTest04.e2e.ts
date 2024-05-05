describe('My Login application', () => {
    it('should login with valid credentials via My Trade Me', async () => {

        try {
            // Open the browser and navigate to the page
            console.log('===== Opening sandbox page =====');
            await browser.url('https://www.tmsandbox.co.nz/');

            // Validate the page is loaded
            const  loginFunctions = await browser.$('div.tm-root__afiliates-sat-nav-functions');
            await browser.waitUntil(async () => loginFunctions.waitForDisplayed());
            console.log('Home Page loaded');

            // ***** Login via My TRade Me *****
            const loginWatchlist = await browser.$('//a[contains(@classiclink, "MyTradeMe/Default.aspx")]');
            await loginWatchlist.waitForClickable();
            await loginWatchlist.click();
            console.log('Click My Trade Me');

           // Validate the login page after clicking Trade Me
            const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
            await loginFormDisplayed.isDisplayed();
            console.log('Log in page is available');

            // Perform login actions
            // email address
            const emailAddress = 'miltontest1@miltontest.co.nz';
            const emailAddressField = await browser.$('input#Email.email-input');
            await emailAddressField.waitForClickable();
            await emailAddressField.setValue(emailAddress);
            console.log('email address added');

            // password
            const password = 'P@ssw0rd010203';
            const passwordField = await browser.$('input#Password.password-input');
            await passwordField.waitForClickable();
            await passwordField.setValue(password);
            console.log('password added');

            // added to wait for the iframe to load.
            await browser.setTimeout({ implicit: 3000 });

            // switch to iframe reCAPTCHA
            const reCAPTCHAIframes = await browser.$$('iframe[src*="https://www.recaptcha.net/recaptcha/enterprise/anchor?"]');

            // Check if at least one iframe is found
            if (reCAPTCHAIframes.length > 0) {
                // Switch to the first reCAPTCHA iframe
                await browser.switchToFrame(reCAPTCHAIframes[0]);
                console.log('switch to iframe reCAPTCHA');
            } else {
                console.error('No iframe matching the specified source attribute found.');
            }            

            // Wait for reCAPTCHA checkbox to be clickable and click it
            await browser.waitUntil(async () => {
                try{
                    const checkBoxRecaptcha = await browser.$('div.recaptcha-checkbox-checkmark');
                    if (checkBoxRecaptcha && await checkBoxRecaptcha.isExisting() && await checkBoxRecaptcha.isDisplayed() && await checkBoxRecaptcha.isClickable()) {
                        await checkBoxRecaptcha.click();
                        return true;
                    }
                }
                catch (error) {
                    console.error("Error while waiting for reCAPTCHA checkbox:", error);
                }
                return false;
            }, { timeout: 20000, timeoutMsg: 'reCAPTCHA checkbox not clickable' });    

            console.log('Check box reCAPTCHA done');

            // added to wait for the iframe to load.
            await browser.setTimeout({ implicit: 3000 });

            // switch to iframe available for login
            await browser.switchToFrame(null);
            console.log('switch off from iframe reCAPTCHA');

            const loginButton = await browser.$('button[value="login"]');
            await loginButton.isClickable();
            await loginButton.click();

        } catch (error) {
            console.error('An Error occured: ', error);
        } finally {
        }
    })
})

