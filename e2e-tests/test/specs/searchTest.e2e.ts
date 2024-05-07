import { homePage } from "../common/homePage";
import { log } from "../common/logger";
import * as dotenv from 'dotenv';
import { logout } from "../common/loginUtils";
import { browseMarketPlaceAndSearch } from "../common/browseMarket";

dotenv.config();

xdescribe('My Seaching application', () => {

    const homePageUrl = process.env.TRADEME_BASE_URL!;

    beforeEach(async () => {
        await homePage(homePageUrl);
    })

    afterEach(async () => {
        await logout();
    })

    it('should Verify if the user can search for a Monitor within the "Computers" category', async () => {

        const marketPlaceCategory = "Computers";
        const valueToSearch = "Monitor";

        const { showingResultsValue, showingResultsAfterSearchValue } = await browseMarketPlaceAndSearch(marketPlaceCategory, valueToSearch);

        // Validate the result is showing the value used on the search field.
        if (showingResultsValue !== showingResultsAfterSearchValue) {
            await log(`Validation: The search results value changed from "${showingResultsValue}" to "${showingResultsAfterSearchValue}"`);
        } else {
            await log(`Validation: The search results value remains the same as "${showingResultsValue}"`);
        }
        expect(showingResultsValue).not.toEqual(showingResultsAfterSearchValue);

        // Validate the result is showing the value used on the search field.
        if (showingResultsAfterSearchValue.toLowerCase().includes(valueToSearch.toLowerCase())) {
            await log(`Validation: The search results contain the search value "${valueToSearch}"`);
        } else {
            await log(`Validation: The search results do not contain the search value "${valueToSearch}"`);
        }
        expect(showingResultsAfterSearchValue.toLowerCase()).toContain(valueToSearch.toLowerCase());

    });

    it('should Verify the results if user search for iPhone 7 within the "Computers" category', async () => {

        const marketPlaceCategory = "Computers";
        const valueToSearch = "iPhone 7";

        const { showingResultsValue, showingResultsAfterSearchValue } = await browseMarketPlaceAndSearch(marketPlaceCategory, valueToSearch);

        const noResultsFound = await browser.$('//tm-no-results //h2[text()="No results found"]');
        await noResultsFound.isExisting();

        // Validate that no results found message is displayed
        if (await noResultsFound.isExisting()) {
            await log("Validation: 0 results found is displayed");
        } else {
            await log("Validation: 0 results found is not displayed");
        }
        expect(await noResultsFound.isExisting()).toBe(true);

        // Validate the result is showing the value used on the search field.
        if (showingResultsValue !== showingResultsAfterSearchValue) {
            await log(`Validation: The search results value changed from "${showingResultsValue}" to "${showingResultsAfterSearchValue}"`);
        } else {
            await log(`Validation: The search results value remains the same as "${showingResultsValue}"`);
        }
        expect(showingResultsValue).not.toEqual(showingResultsAfterSearchValue);

        // Validate that the search results contain the character "0"
        if (showingResultsAfterSearchValue.includes("0")) {
            await log("Validation: The search results contain the character '0'");
        } else {
            await log("Validation: The search results do not contain the character '0'");
        }
        expect(showingResultsAfterSearchValue).toContain("0");

    });

    it('should Verify the results if user search for monit within the "Computers" category', async () => {

        const marketPlaceCategory = "Computers";
        const valueToSearch = "monit";

        const { showingResultsValue, showingResultsAfterSearchValue } = await browseMarketPlaceAndSearch(marketPlaceCategory, valueToSearch);

        const noResultsFound = await browser.$('//tm-no-results //h2[text()="No results found"]');
        await noResultsFound.isExisting();

        // Validate that no results found message is displayed
        if (await noResultsFound.isExisting()) {
            await log("Validation: 0 results found is displayed");
        } else {
            await log("Validation: 0 results found is not displayed");
        }
        expect(await noResultsFound.isExisting()).toBe(true);

        // Validate the result is showing the value used on the search field.
        if (showingResultsValue !== showingResultsAfterSearchValue) {
            await log(`Validation: The search results value changed from "${showingResultsValue}" to "${showingResultsAfterSearchValue}"`);
        } else {
            await log(`Validation: The search results value remains the same as "${showingResultsValue}"`);
        }
        expect(showingResultsValue).not.toEqual(showingResultsAfterSearchValue);

        // Validate that the search results contain the character "0"
        if (showingResultsAfterSearchValue.includes("0")) {
            await log("Validation: The search results contain the character '0'");
        } else {
            await log("Validation: The search results do not contain the character '0'");
        }
        expect(showingResultsAfterSearchValue).toContain("0");
    });
})