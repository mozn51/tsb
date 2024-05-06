import { login } from "../common/login";
import { log } from "../common/logger";
import * as dotenv from 'dotenv';

dotenv.config();

describe('My Listing Application', () => {

    const trademeEmailAddress = process.env.TRADEME_CONSUMER_EMAIL!;
    const trademePassword = process.env.TRADEME_CONSUMER_PASSWORD!;

    beforeEach(async () => {
        await login(trademeEmailAddress, trademePassword);
    })

    it('Start a Listing under General', async () => {
        //Start a Listing item
        const startAListingBtn = await browser.$('//span[text()="Start a listing"]');
        await startAListingBtn.waitForClickable();
        await startAListingBtn.click();
        await log('Clicked "Start a listing" button on home page');

        // validate is the list an item page is available
        const listAnItemPage = await browser.$('//h1[text()="List an item"]');
        await listAnItemPage.waitForDisplayed();
        await log('List an Item page is available');

        // validate the General Item btn is available
        const generalItemBtn = await browser.$('//div[text()="General item"]');
        await generalItemBtn.waitForClickable();
        await generalItemBtn.click();
        await log('Clicked "General item" Button');

        // validate the tab title & category is available
        const titleCategoryTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Title & category "]');
        await titleCategoryTab.waitForDisplayed();
        await log('Tab Title & Category');

        // add the value on the title field
        const listingTitleField = await browser.$('[name="title"]');
        const newListingItemTitle = "iPhone 7";
        await listingTitleField.waitForDisplayed();
        await listingTitleField.setValue(newListingItemTitle);
        await log('added New Item Title');

        // add timeout to be able to click on the button
        await browser.pause(2000);

        // Select the button and click on it
        const chooseCategoryBtn = await browser.$('//button[contains(., "Choose category")]');
        await chooseCategoryBtn.isExisting();
        await chooseCategoryBtn.click();
        await log("Clicked on 'Choose category' button successfully.");

        // validate thae pop-up is available
        const categorypopup = await browser.$('tm-marketplace-category-picker-modal[name=categoryPickerModal]');
        await categorypopup.isExisting();

        // Choose Category under Category
        const chooseCategoryPopup = await browser.$('//div //h2[text()=" Choose category "]');
        await chooseCategoryPopup.waitForDisplayed();
        await log('Category pop up displayed');

        // Find an element that is visible and can be scrolled to Mobile phones
        const chooseCategoryVisibleElement = $('//tg-media-block-content[text()=" Flatmates wanted "]');
        await chooseCategoryVisibleElement.waitForDisplayed();
        await (await chooseCategoryVisibleElement).scrollIntoView();
        await log('scroll page using Flatmates wanted');

        // select mobile phones from the choose category list
        const chooseCategoryMobilePhones = await browser.$('//div //tg-media-block-content[text()=" Mobile phones "]');
        await chooseCategoryMobilePhones.waitForClickable();
        await chooseCategoryMobilePhones.click();
        await log('selectd the correct category, Mobile phones');

        // wait to display mobile phones section
        const mobilePhonesCategoryBtn = await browser.$('//tg-rack-item-primary //div[text()=" Mobile phones "]');
        await mobilePhonesCategoryBtn.waitForDisplayed();
        await log('mobile phones button is visible');

        // select mobile phones under mobile phones section
        const mobilePhonesCategoryOptions = await browser.$('//div[@class="sub-categories"] //tg-media-block-content[text()=" Mobile phones "]');
        await mobilePhonesCategoryOptions.waitForClickable();
        await mobilePhonesCategoryOptions.click();
        await log('selectd mobile phones section');

        // wait do display the mobile phones types
        const mobilePhonesTypes = await browser.$('//tg-rack-item-primary[@class="tm-category-picker-primary o-rack-item__primary"] //div[text()=" Mobile phones "]');
        await mobilePhonesTypes.waitForDisplayed();
        await log('mobile phones types are visible');

        // select iPhone under mobile phones types
        const mobilePhonesTypeIphone = await browser.$('//tg-media-block-content[text()=" iPhone "]');
        await mobilePhonesTypeIphone.waitForClickable();
        await mobilePhonesTypeIphone.click();
        await log('selecting iPhone types');

        // wait to display the iPhone section
        const mobilePhonesIPhoneSection = await browser.$('//div[@class="o-rack-item__primary-body"][text()=" iPhone "]');
        await mobilePhonesIPhoneSection.waitForDisplayed();
        await log('iPhone section is available');

        // Find an element that is visible and can be scrolled to Mobile phones
        const chooseIPhoneCategoryVisibleElement = $('//tg-media-block-content[text()=" iPhone 4 "]');
        await chooseIPhoneCategoryVisibleElement.waitForDisplayed();
        await (await chooseIPhoneCategoryVisibleElement).scrollIntoView();
        await log('scroll page using iPhone 4');

        // select iPhone 7 from the list
        const chooseIPhoneFromTheList = $('//tg-media-block-content[text()=" iPhone 7 "]');
        await chooseIPhoneFromTheList.waitForClickable();
        await chooseIPhoneFromTheList.click();
        await log('selected iPhone 7 from the list');

        // validate that iPhone 7 is on the list
        const iPhoneSelected = await browser.$('//div[@class="tm-selected-category__title"][text()=" iPhone 7 "]');
        await iPhoneSelected.waitForDisplayed();
        await log('confirm that iPhone 7 was selected');

        // click Next
        const nextBtn = await browser.$('//button[text()=" Next "]');
        await nextBtn.waitForClickable();
        await nextBtn.click();
        await log('clicked on the "Next" button in the Title & category tab');

        // validate the tab item details is available
        const itemDetailsTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Item details "]');
        await itemDetailsTab.waitForDisplayed();
        await log('tab "Item details" is visible');

        // adding description details for the item
        const itemDetailsDescriptionField = await browser.$('//textarea[@name="description"]');
        const newListingItemDescription = "iPhone 7, 128GB, colour Black";
        await itemDetailsDescriptionField.waitForDisplayed();
        await itemDetailsDescriptionField.setValue(newListingItemDescription);
        await log('added description for the new item');

        // click Next
        await nextBtn.waitForClickable();
        await nextBtn.click();
        await log('clicked on the "Next" button in the Item details tab');

        // Photos - not mandatory
        // validate the tab Photos is available
        const photosTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Photos "]');
        await photosTab.waitForDisplayed();
        await log('tab photo is visible');

        // click Next
        await nextBtn.waitForClickable();
        await nextBtn.click();
        await log('clicked on the "Next" button in the Photos tab');

        // validate the tab price & payment is available
        const pricePaymentTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Price & payment "]');
        await pricePaymentTab.waitForDisplayed();
        await log('tab price & payment is visible');

        // add price (madantory field)
        const startPriceField = await browser.$('//span //input[@name="startPrice"]');
        const newListingItemStartPrice = "1";
        await startPriceField.waitForDisplayed();
        await startPriceField.setValue(newListingItemStartPrice);
        await log('adding start price');

        // click Next
        await nextBtn.waitForClickable();
        await nextBtn.click();
        await log('clicked on the "Next" button in the Price & payment tab');

        // validate the tab shipping & pick-up is available
        const shippingPickupTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Shipping & pick-up "]');
        await shippingPickupTab.waitForDisplayed();
        await log('tab shipping & pick-up is visible');

        // validate if the select pick-up options is available
        const selectPickupOption = await browser.$('//label[text()=" Select a pick-up option "]');
        await selectPickupOption.waitForDisplayed();
        await log('validate if the pick-up option is visible');

        // select the must pick-up options from the list
        const selectMustPickupRadioBtn = await browser.$('//tg-radio-item[@label="Must pick-up"]');
        await selectMustPickupRadioBtn.waitForClickable();
        await selectMustPickupRadioBtn.click();
        await log('select pick-up option');

        // click Next
        await nextBtn.waitForClickable();
        await nextBtn.click();
        await log('clicked on the "Next" button in the Shipping & pick-up tab');

        // validate the tab promote is available
        const promoteTab = await browser.$('//button[@aria-expanded="true"] //span[text()=" Promote "]');
        await promoteTab.waitForDisplayed();
        await log('tab promote is visible');

        // click Start listing
        const startListingBtn = await browser.$('//button[@type="submit"] //span[text()=" Start listing "]');
        await startListingBtn.waitForClickable();
        await startListingBtn.click();
        await log('clicked on the "Start listing" button in the Promote tab');

        // validate the aution details page
        const auctionDetail = await browser.$('//section //tg-box //h2[text()=" Auction detail "]');
        await auctionDetail.waitForDisplayed();
        await log('auction page is visible');

        // validate the values added during the listing testing
        const actionDetailStartPriceElement = await browser.$('//tg-rack-item-primary[.=" Start price "]/following-sibling::tg-rack-item-secondary');
        const actionDetailStartPriceValue = await actionDetailStartPriceElement.getText();
        const actionDetailDescriptionElement = await browser.$('//tg-col[h4="Description"]/following-sibling::tg-col//p');
        const actionDetailDescriptionValue = await actionDetailDescriptionElement.getText();
        const actionDetailsTitleElement = await browser.$('//h1[@class="tm-marketplace-buyer-options__listing_title"]');
        const actionDetailsTitleValue = await actionDetailsTitleElement.getText();

        // Expect statements with descriptive messages
        if (actionDetailsTitleValue === newListingItemTitle) {
            await log(`action details title matches '${newListingItemTitle}'`);
        } else {
            await log(`Expected action details title to be '${newListingItemTitle}', but found '${actionDetailsTitleValue}'`, true);
        }

        if (actionDetailDescriptionValue === newListingItemDescription) {
            await log(`action detail description matches '${newListingItemDescription}'`);
        } else {
            await log(`Expected action detail description to be '${newListingItemDescription}', but found '${actionDetailDescriptionValue}'`, true);
        }

        if (actionDetailStartPriceValue.includes(newListingItemStartPrice)) {
            await log(`action detail start price contains '${newListingItemStartPrice}'`);
        } else {
            await log(`Expected action detail start price to contain '${newListingItemStartPrice}', but found '${actionDetailStartPriceValue}'`, true);
        }

        await log('compared values used during the process in the Action page');
    });
})