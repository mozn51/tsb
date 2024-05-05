

export async function login(emailAddress: string, password: string){
    
    if (await isLoggedIn()){
        console.log('Already logged in')
        return;
    }
   
    // Open the browser and navigate to the page
        console.log('===== Opening Login page =====');
        await browser.url('https://www.tmsandbox.co.nz/a/login');
    
        const loginFormDisplayed = await browser.$('//div[contains(@class, "au-card login-card")]//h1[text()="Log in"]');
        await loginFormDisplayed.isDisplayed();
        console.log('Log in page is available');

        // added to wait for the iframe to load.
        await browser.setTimeout({ implicit: 3000 });
    
        // switch to iframe available for login
        const loginIframe = await browser.$('iframe[src*="https://auth.tmsandbox.co.nz/connect/authorize?"]');
        await browser.switchToFrame(loginIframe);
        console.log('switch to iframe login');
    
        // Perform login actions
        const emailAddressField = await browser.$('input#Email.email-input');
        const passwordField = await browser.$('input#Password.password-input');
        
        await emailAddressField.waitForClickable();
        await emailAddressField.setValue(emailAddress);
        console.log('email address added');
    
        await passwordField.waitForClickable();
        await passwordField.setValue(password);
        console.log('password added');

        await browser.switchToFrame(null);
    
        console.log('Human interaction - complete reCaptcha and click Login button');
  
        const logoutLink = await browser.$('//a[text()=" Log out "]');
        await logoutLink.waitForExist({timeout: 30000});
        console.log('Success login');

}

export async function isLoggedIn() {
    const logoutLink = await browser.$(`=Logout`);
    return logoutLink.isDisplayed();
}

