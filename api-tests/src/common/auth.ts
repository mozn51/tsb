import OAuth from 'oauth-1.0a';
import * as dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';

dotenv.config();

const oauth = new OAuth({
  consumer: {
    key: process.env.TRADEME_CONSUMER_KEY!,
    secret: process.env.TRADEME_CONSUMER_SECRET!,
  },
  signature_method: 'PLAINTEXT',
  hash_function(base_string, key) {
    return key;
  },
});

export function generateOAuthHeader(url: string, method: string)  {
  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url,
        method,
      },
      {
        key: process.env.TRADEME_OAUTH_TOKEN!,
        secret: process.env.TRADEME_OAUTH_TOKEN_SECRET!
      }
    )
  );

  return authHeader;
}

export function authAxiosInstance(path: string, method: string): AxiosInstance {
    const baseUrl = process.env.TRADEME_BASE_URL!
    const authorisationUrl = `${baseUrl}${path}`
    return axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: generateOAuthHeader(
            authorisationUrl,
            method,
          ).Authorization,
        },
      });
}