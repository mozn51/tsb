import { AxiosInstance } from 'axios';
import { authAxiosInstance, generateOAuthHeader } from './common/auth';

describe('GET /v1/Listings/Latest.json', () => {
    let apiInstance: AxiosInstance;
    const path = "/v1/Listings/Latest.json";

    beforeEach(() => {
      apiInstance = authAxiosInstance(path, 'GET')
    });

    it('returns at least one item', async () => {
        const response = await apiInstance.get(path)

        expect(response.data.List.length).toBeGreaterThan(0)
    })
})