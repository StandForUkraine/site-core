import * as React from 'react'
import Hero from 'core/components/Hero'
import PageTabs from 'core/components/PageTabs'
import Langs from './Langs'
import { SocialFeedPost } from 'core/utils/social-feed/feed'
import ContentList from './ContentList'
import { socialNetworks } from 'core/utils/socialNetworks'
import { useText } from 'core/utils/lang'
import { useGtag } from 'core/utils/useGtag'
import SocialEmbedPostWidget from './SocialEmbedPostWidget'
import DeferredRender from './DeferredRender'

export default function SpreadTheWord({ feed }: { feed: SocialFeedPost[] }) {
  const t = useText();
  const gtag = useGtag();

  const filter1 = React.useMemo(
    () => [...new Set(feed.map((post) => post.tags).flat())],
    [],
  )
  
  return (
    <>
      <Langs />
      <Hero />
      <PageTabs currentTab={'inform'} />
      <ContentList
        list={feed}
        filter1={filter1}
        filter2={socialNetworks.map((item) => item.name)}
        filter2Field="network"
        itemBuilder={(post) => (
          <DeferredRender key={post.id}>
            <SocialEmbedPostWidget post={post} />
          </DeferredRender>
        )}
        filter1Title={false}
        filter2Title={false}
        onResetFilterClick={() => {
          gtag('event', 'reset_filter_click', { event_category: 'home_page' })
        }}
        onShowAllClick={() => {
          gtag('event', 'show_all_orgs_click', { event_category: 'home_page' })
        }}
        showAllButtonChildren={(
          <>{t('browseAll1')} {feed.length} {t('browseAll3')}</>
        )}
        filter1ToLabel={(value) => `#${value}`}
        filter2ToLabel={(value) => value.slice(0, 1).toUpperCase() + value.slice(1)}
      />
    </>
  )
}
