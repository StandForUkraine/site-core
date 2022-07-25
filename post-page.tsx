import Head from 'next/head'
import { useMetadataRenderer } from 'core/utils/metadata'
import LandingPage from 'core/components/LandingPage'
import { PostItem, posts } from 'core/utils/posts'
import { langs } from 'core/texts'
import { DonationItem } from 'core/utils/donations'

export interface PostPageParams {
  postData: PostItem
  donations: DonationItem[]
}

export default ({ postData, donations }: PostPageParams) => {
  const renderMetadata = useMetadataRenderer()
  return (
    <>
      <Head>
        {renderMetadata({
          title: postData.imageAlt,
          image: postData.image,
        })}
      </Head>
      <LandingPage donations={donations} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: langs
      .map((lang) =>
        posts.map(({ segment }) => ({
          params: { segment, lang },
        }))
      )
      .flat(),
  }
}
