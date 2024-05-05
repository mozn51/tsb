import { login } from "../common/login";



describe('My Login application', () => {

    beforeEach( async () => {
        
        await login('miltontest1@miltontest.co.nz', 'P@ssw0rd010203');

    })

it('Start a Listing under General', async () => {

    const startAListing = await browser.$('//span[text()="Start a listing"]');
    await startAListing.isClickable();
    await startAListing.click();

    console.log('Start a Listing');


});

})