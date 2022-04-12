import * as React from 'react'
import Hero from 'core/components/Hero'
import PageTabs from 'core/components/PageTabs'
import Donations from 'core/components/Donations'
import { DonationItem } from 'core/utils/donations'
import Langs from './Langs'

export default function LandingPage({ donations }: { donations: DonationItem[] }) {
  return (
    <>
      <Langs />
      <Hero />
      <PageTabs currentTab={'donate'} />
      <Donations donations={donations} />
    </>
  )
}
