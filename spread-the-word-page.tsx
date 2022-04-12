import React from 'react'
import Head from 'next/head'
import { useMetadataRenderer } from 'core/utils/metadata'
import SpreadTheWord from 'core/components/SpreadTheWord'
import { SocialFeedPost } from './utils/social-feed/feed'
import { langs } from './texts'

export default function SpreadTheWordPage({ feed }: { feed: SocialFeedPost[] }) {
  const renderMetadata = useMetadataRenderer()
  return (
    <>
      <Head>{renderMetadata({})}</Head>
      <SpreadTheWord feed={feed} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: langs.map((lang) => ({
      params: { lang },
    })),
  }
}
