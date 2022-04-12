import * as React from 'react'
import { DonationItem } from 'core/utils/donations'
import { useText } from 'core/utils/lang'
import { allTags } from 'core/utils/tags'
import { payMethods } from 'core/utils/payMethods'
import DonationWidget from './DonationWidget'
import { useGtag } from 'core/utils/useGtag'
import ContentList from './ContentList'

export const Donations = ({ donations }: { donations: DonationItem[] }) => {
  const t = useText();
  const gtag = useGtag()

  return (
    <ContentList
      list={donations}
      filter1={[...allTags]}
      filter2={payMethods.filter((m) => m !== 'Western Union')}
      filter2Field="payMethods"
      itemBuilder={(donation) => (
        <DonationWidget key={donation.id} donation={donation} />
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
        <>{t('browseAll1')} {donations.length} {t('browseAll2')}</>
      )}
    />
  );
}

export default Donations
