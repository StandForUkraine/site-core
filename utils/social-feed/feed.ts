import path from 'path'
import fs from 'fs/promises';
import getConfig from 'next/config';
import { SocialNetworkName } from '../socialNetworks';

const { serverRuntimeConfig } = getConfig()


export interface SocialFeedPost {
  id: string
  link: string;
  network: SocialNetworkName;
  tags: string[];
}

export const loadSocialFeed = async (): Promise<SocialFeedPost[]> => {
  const file = await fs.readFile(path.join(serverRuntimeConfig.PROJECT_ROOT, 'social-feed/feed.json'), 'utf-8');
  const json = JSON.parse(file);

  return json as SocialFeedPost[];
};