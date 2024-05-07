import { AxiosInstance } from 'axios';
import { authAxiosInstance } from '../common/auth';

describe('API - Testing - POST /v1/Selling.json', () => {
    let apiInstance: AxiosInstance;
    const path = "/v1/Selling.json";
        
    beforeEach(() => {
        apiInstance = authAxiosInstance(path, 'POST');
    });

    test('Creates a new listing item under selling methods', async () => {
        try {
            // Define the payload for the Post
            const payload = {
                "Category": 3849,
                "Title": "Arty surprises of lovers",
                "Description": ["All true art lovers will buy this. it is amazing"],
                "StartPrice": 5,
                "BuyNowPrice": 20,
                "Duration": 0,
                "Pickup": 1,
                "IsBrandNew": true,
                "PhotoIds": [12345678],
                "ShippingOptions": [{ "Type": 1 }],
                "PaymentMethods": [4]
            };

            // POST request
            const response = await apiInstance.post(path, payload);
            expect(response.status).toBe(200);

        } catch (error) {
            // Handle any errors that occur during the execution of the test
            console.error("Error occurred during test execution:", error);
        } 
    });    
});
