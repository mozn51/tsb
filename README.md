# Test Application TSB

## API Tests

Copy .env.example to .env, and create expected tokens
The file will guide you to where you need to go
```
cp .env.example .env
```

How to run?
```
cd api-tests
npm install
npm run test
```

Test Cases
File createListItem.spec.ts
 - Test Case - API - Testing - POST /v1/Selling.json. Creates a new listing item under selling methods.

File retrieveLatestList.spec.ts
 - Test Case 1 - API - Testing - GET /v1/Listings/Latest.json. Returns at least one item from latest listing under listing methods.
 - Test Case 2 - API - Testing - GET /Listings/{listingId}.xml. Validate if the item created is showing on the latest reportj.

## End to End tests


How to run?
```
cd e2e-tests
npm install
npm run test
```


Test Cases

File listingItem.e2e.ts - My Listing Application - Start a Listing under General
Test Case Listing a new item under General Section
 - Step 1 - Open TradeMe website.
 - Step 2 - You must be logged to be able to complete the process.
 - Step 3 - Click Start a Listing button
 - Step 4 - Click General Item button
 - Step 5 - Tab Title & Category should be available, Add the item Title
 - Step 6 - Click Choose Category button
 - Step 7 - Click Choose Category button
 - Step 8 - Choose Category pop-up should open, select Mobile phones from the list
 - Step 9 - Mobile phones should open, select Mobile phones
 - Step 10 - other Mobile phones should open, select iPhone from the list
 - Step 11 - iPhone section should open, select iPhone 7 from the list
 - Step 12 - Button Next should be available, click Next
 - Step 13 - Tab Item details should be available, add a Description
 - Step 14 - Click Next
 - Step 15 - Tab Photos should be available
 - Step 16 - Click Next
 - Step 17 - Tab Price & payment should be available, add Start Price and click Next
 - Step 18 - Tab Shipping & pick-up should be available, select Must pick-up from the list and click Next
 - Step 19 - Tab Promote should be available, click Start listing button
 - Step 20 - Action details page should be available
 - Step 21 - Confirm the data added during the process

---

File loginTest.e2e.ts - My Login application - Login process
I created these tests cases because I found a lot of ways to do a login on the page.
 - Test case 1 - should login with valid credentials via Log in button
 - Step 1 - Open TradeMe website
 - Step 2 - click log in button
 - Step 3 - Login pop-up should be available
 - Step 4 - Peform the login steps, add user email address and password
 - Step 5 - You must complete the reCaptcha section - MANUAL STEP
 - Step 6 - click Login
 - Step 7 - The home page should be available
 - Step 8 - Click Logout button

Test case 2 - should login with valid credentials via Watchlist button
 - Step 1 - Open TradeMe website
 - Step 2 - click Watchlist button
 - Step 3 - Login pop-up should be available
 - Step 4 - Peform the login steps, add user email address and password
 - Step 5 - You must complete the reCaptcha section - MANUAL STEP
 - Step 6 - click Login
 - Step 7 - The Watchlist page should be available
 - Step 8 - Click Logout button

Test case 3 - should login with valid credentials via Favourites button
 - Step 1 - Open TradeMe website
 - Step 2 - click Favourites button
 - Step 3 - Login pop-up should be available
 - Step 4 - Peform the login steps, add user email address and password
 - Step 5 - You must complete the reCaptcha section - MANUAL STEP
 - Step 6 - click Login
 - Step 7 - The Favourites page should be available
 - Step 8 - Click Logout button

Test case 4 - should login with valid credentials via My Trade Me button
 - Step 1 - Open TradeMe website
 - Step 2 - click My Trade Me button
 - Step 3 - Login page should be available
 - Step 4 - Peform the login steps, add user email address and password
 - Step 5 - You must complete the reCaptcha section - MANUAL STEP
 - Step 6 - click Login
 - Step 7 - The My Trade Me page should be available
 - Step 8 - Click Logout button

Test case 5 - should check the errors when for login with invalid credentials via My Trade Me button
 - Step 1 - Open TradeMe website
 - Step 2 - click My Trade Me button
 - Step 3 - Login page should be available
 - Step 4 - Peform the login steps, add user email address but use a wrong password
 - Step 5 - You must complete the reCaptcha section - MANUAL STEP
 - Step 6 - click Login
 - Step 7 - The page should show an error message "Invalid email or password"
 - Step 8 - Click Cancel button

--- 

File searchTest.e2e.ts - My Seaching application
Test Cases My Seaching application
Test Case 1 - should Verify if the user can search for a Monitor within the "Computers" category
 - Step 1 - Open TradeMe website
 - Step 2 - You dont need to be logged to be able to use the search function
 - Step 3 - Click on Browser button on the top of the page
 - Step 4 - Browser Marktplace pop-up should open, select Computers
 - Step 5 - Computer page should be available, click on the search within Computers
 - Step 6 - type Monitor and the Search button should be available
 - Step 7 - click search
 - Step 8 - Validate if the search results have been changed before and after clicking search.

Test Case 2 - should Verify if the user can search for a iPhone 7 within the "Computers" category
 - Step 1 - Open TradeMe website
 - Step 2 - You dont need to be logged to be able to use the search function
 - Step 3 - Click on Browser button on the top of the page
 - Step 4 - Browser Marktplace pop-up should open, select Computers
 - Step 5 - Computer page should be available, click on the search within Computers
 - Step 6 - type iPhone 7 and the Search button should be available
 - Step 7 - click search
 - Step 8 - Validate if message on the page because there is 0 iPhones under computers section

Test Case 3 - should Verify if the user can search for a word "monit" within the "Computers" category
 - Step 1 - Open TradeMe website
 - Step 2 - You dont need to be logged to be able to use the search function
 - Step 3 - Click on Browser button on the top of the page
 - Step 4 - Browser Marktplace pop-up should open, select Computers
 - Step 5 - Computer page should be available, click on the search within Computers
 - Step 6 - type monit  and the Search button should be available
 - Step 7 - click search
 - Step 8 - Validate if message on the page because there word is wrong, 0 results should show.
