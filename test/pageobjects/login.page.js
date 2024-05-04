const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmailAddress () {
        return $('#Email');
    }

    get inputPassword () {
        return $('#Password');
    }

    get checkBoxRecaptcha() {
        return $('#recaptcha-anchor');
    }

    get btnLogin () {
        return $('button[value="login"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using email address and password
     */
    async login (emailAddress, password) {
        await (await this.inputEmailAddress).waitForDisplayed();
        await this.inputEmailAddress.setValue(emailAddress);
        await (await this.inputPassword).waitForDisplayed();
        await this.inputPassword.setValue(password);
        await (await this.checkBoxRecaptcha).click();

        await this.btnLogin.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    // open () {
    //     return super.open('(modal:login)');
    // }
}

module.exports = new LoginPage();
