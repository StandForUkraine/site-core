import * as React from 'react'
import Hero from 'core/components/Hero'
import PageTabs, { Tab } from 'core/components/PageTabs'
import Langs from './Langs'
import { SocialFeedPost } from 'core/utils/social-feed/feed'
import ContentList from './ContentList'
import { socialNetworks } from 'core/utils/socialNetworks'
import { useText } from 'core/utils/lang'
import { useGtag } from 'core/utils/useGtag'
import SocialEmbedPostWidget from './SocialEmbedPostWidget'

export default function SpreadTheWord({ feed }: { feed: SocialFeedPost[] }) {
  const t = useText();
  const gtag = useGtag();
  
  return (
    <>
      <Langs />
      <Hero />
      <PageTabs currentTab={'inform'} />
      <ContentList
        list={feed}
        filter1={['BoycottRussia', 'StandWithUkraine', 'StopRussianAgression']}
        filter2={socialNetworks.map((item) => item.name)}
        filter2Field="network"
        itemBuilder={(post) => (
          <SocialEmbedPostWidget key={post.id} post={post} />
        )}
        filter1Title={t('filterTo')}
        filter2Title={t('filterPayVia')}
        onResetFilterClick={() => {
          gtag('event', 'reset_filter_click', { event_category: 'home_page' })
        }}
        onShowAllClick={() => {
          gtag('event', 'show_all_orgs_click', { event_category: 'home_page' })
        }}
        showAllButtonChildren={(
          <>{t('browseAll1')} {feed.length} {t('browseAll2')}</>
        )}
        filter1ToLabel={(value) => `#${value}`}
        filter2ToLabel={(value) => value.slice(0, 1).toUpperCase() + value.slice(1)}
      />
    </>
  )
}
