import { expect } from 'chai';
import $ from 'jquery';


describe('Customer Login Scenarios', () => {
  it('Test Case 1: Verify that a registered user can successfully log in with valid credentials', () => {
    browser.url('https://www.tmsandbox.co.nz/login');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const loginButton = $('button[type="submit"]');

    // Enter valid username and password
    usernameInput.setValue('valid_username');
    passwordInput.setValue('valid_password');

    // Click on the login button
    loginButton.click();

    // Verify redirection to dashboard or another appropriate page
    const dashboardTitle = $('h1=Dashboard');
    expect(dashboardTitle).to.exist;
  });

  it('Test Case 2: Verify that the login page redirects to the user\'s dashboard after successful login', () => {
    // Implement similar steps as Test Case 1 and assert redirection to dashboard
  });

  it('Test Case 3: Verify that the appropriate error message is displayed when logging in with invalid credentials', () => {
    browser.url('https://www.tmsandbox.co.nz/login');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const loginButton = $('button[type="submit"]');
    const errorMessage = $('.error-message');

    // Enter invalid username and/or password
    usernameInput.setValue('invalid_username');
    passwordInput.setValue('invalid_password');

    // Click on the login button
    loginButton.click();

    // Verify error message
    expect(errorMessage).to.exist;
    expect(errorMessage.getText()).to.equal('Invalid username or password.');
  });

  it('Test Case 4: Verify that the login button is disabled when required fields are empty', () => {
    browser.url('https://www.tmsandbox.co.nz/login');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const loginButton = $('button[type="submit"]');

    // Verify login button is initially disabled
    expect(loginButton.isEnabled()).to.be.false;

    // Enter only username
    usernameInput.setValue('username');

    // Verify login button is still disabled
    expect(loginButton.isEnabled()).to.be.false;

    // Enter both username and password
    passwordInput.setValue('password');

    // Verify login button is enabled
    expect(loginButton.isEnabled()).to.be.true;
  });
});
