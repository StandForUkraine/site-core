import Script from 'next/script'

export default ({ params = 'variant=button&button-position=bottom-left' }: { params?: string }) => (
  <Script
    id="sfuw"
    async={true}
    src={`https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget@1.0/artifacts/index.iife.min.js?${params}`}
  />
)
