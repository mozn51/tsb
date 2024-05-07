import { log } from "./logger";

/**
* Browse Marketplace
* @param category: the category you need to select to perform the search
* @param valueToSearch: the value you want to search
* @returns {Promise<{showingResultsValue: string, showingResultsAfterSearchValue: string}>} The values before and after the search
*/
export async function browseMarketPlaceAndSearch(category:string, valueToSearch: string) {
    await log('browse Marketplace function');

    // Click on the "browser" button on the home page. First validate if the pop-up is open
    const browseButton = await browser.$('//button[text()=" Browse "]');
    
    // check if the button is expanded
    const isExpanded = await browseButton.getAttribute('aria-expanded');
    if (isExpanded === "false") {
        await browseButton.waitForClickable();
        await browseButton.click();
    }else {
        await log('Browse pop-up is already expanded');
    }

    // validate if Browse Marketplace is available
    const browseMarkteplacePopup = await browser.$('//tg-dropdown-content //div[text()="Browse Marketplace"]');
    await browseMarkteplacePopup.waitForDisplayed();

    // select Category
    const browseOptionSelected = await browser.$(`//tg-dropdown-content //ul //li //a[text()=" ${category} "]`);
    await browseOptionSelected.waitForClickable();
    await browseOptionSelected.click();
    await log(`Selected ${category} Category`);
    
    // validate the Category page
    const computerPage = await browser.$(`//tm-search-header-heading //h1[text()=" ${category} "]`);
    await computerPage.waitForDisplayed();

    // click on the search bar
    const searchComputers = await browser.$(`//input[@placeholder="Search within ${category}"]`);
    await searchComputers.waitForClickable();
    await searchComputers.click();

    // validate the search results when you open the page
    const showingResults = await browser.$('h3.tm-search-header-result-count__heading');
    const showingResultsValue = await showingResults.getText();
    
    // add the value on the search
    //const valueToSearch = "Monit";
    await searchComputers.setValue(valueToSearch);
            
    // click on the search button
    const searchButton = await browser.$('//button[text()=" Search "]');
    await searchButton.waitForClickable();
    await searchButton.click();
    await log(`searching for (${valueToSearch})`)

    // validate the search results after using the search function
    await browser.waitUntil(async () => {
        const showingResultsAfterSearch = await browser.$('h3.tm-search-header-result-count__heading');
        const showingResultsAfterSearchValue = await showingResultsAfterSearch.getText();
        return showingResultsAfterSearchValue !== showingResultsValue;
    }, { timeout: 5000, timeoutMsg: 'Search results did not update within the timeout' });

    // Now retrieve the updated search results text
    const showingResultsAfterSearch = await browser.$('h3.tm-search-header-result-count__heading');
    const showingResultsAfterSearchValue = await showingResultsAfterSearch.getText();
    
    await log('completed browser marketplace search')

    // Return the values before and after the search
    return { showingResultsValue, showingResultsAfterSearchValue };
    
}