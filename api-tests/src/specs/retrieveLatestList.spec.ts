import { AxiosInstance } from 'axios';
import { authAxiosInstance } from '../common/auth';

describe('API - Testing - GET /v1/Listings/Latest.json', () => {
  let apiInstance: AxiosInstance;
  const path = "/v1/Listings/Latest.json";

  beforeEach(() => {
    apiInstance = authAxiosInstance(path, 'GET');
  });

  test('Returns at least one item from latest listing under listing methods', async () => {
    const response = await apiInstance.get(path);
    expect(response.status).toBe(200);
    expect(response.data.List.length).toBeGreaterThan(0);
  });
});

describe('API - Testing - GET /Listings/{listingId}.xml', () => {
  let apiInstance: AxiosInstance;
  const otherPath = "v1/Listings/2149608770.xml";

  beforeEach(() => {
    apiInstance = authAxiosInstance(otherPath, 'GET');
  });

  test('Validate if the item created is showing on the latest report', async () => {
    const response = await apiInstance.get(otherPath);
    expect(response.status).toBe(200);
  });
});