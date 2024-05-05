import axios, { AxiosInstance } from 'axios';

describe('GET /v1/Listings/Latest.json', () => {
    it('returns at least one item', async () => {
        // Mock test just to ensure setup is working
        const response = await axios.get('http://google.com')
        expect(response.data).toBe('hskdhklahdsa')
    })
})