// For testing purposes on local env
const debugging = {
  enabled: true,
  intercept: [
    {
      when: {
        adUnitCode: 'rectangle-1',
        bidder: 'rubicon',
      },
      then: {
        cpm: 10,
        mediaType: 'banner',
        currency: 'USD',
        creativeId: '11111',
        width: 300,
        height: 250,
        ad: '<a href=""><img src="./assets/cpex_ad_300_250.png" /></a>',
      },
    },
  ],
}

const prebidConfig = {
  debug: true,
  debugging, // Testing
  bidderTimeout: 1000,
  consentManagement: {
    gdpr: {
      cmpApi: 'iab',
      defaultGdprScope: true,
      rules: [
        { purpose: 'storage', enforcePurpose: false, enforceVendor: false },
        { purpose: 'basicAds', enforcePurpose: false, enforceVendor: false },
        { purpose: 'measurement', enforcePurpose: false, enforceVendor: false },
      ],
      timeout: 2000,
      actionTimeout: 0,
    },
  },
  currency: {
    adServerCurrency: 'CZK',
    defaultRates: { USD: { USD: 1, CZK: 23 }, EUR: { USD: 1, CZK: 24 } },
  },
  cache: { url: 'https://prebid.adnxs.com/pbc/v1/cache' },
  enableTIDs: true,
}

var adUnits = [
  {
    code: 'rectangle-1',
    mediaTypes: {
      banner: {
        sizes: [300, 250],
      },
    },
    bids: [
      {
        bidder: 'rubicon',
        params: {
          accountId: 1001,
          siteId: 267318,
          zoneId: 1861698,
        },
      },
    ],
  },
]

pbjs = window.pbjs || {}
pbjs.que = pbjs.que || []

pbjs.que.push(() => {
  pbjs.setConfig(prebidConfig)
  pbjs.addAdUnits(adUnits)
  pbjs.requestBids({
    bidsBackHandler: handleBidsBack,
  })
})

function handleBidsBack() {
  // TODO: How to get highest bids for ad unit?
  pbjs.winningBids = pbjs.getHighestCpmBids()
  console.table(
    '%c Winning bids ',
    'background-color: yellow; padding: 1px; color: black',
    pbjs.winningBids
  )

  pbjs.winningBids.forEach((bid) => {
    renderCreative(bid)
  })
}

function renderCreative(bid) {
  const targetElement = document.getElementById(bid.adUnitCode)
  targetElement.innerHTML = bid.ad
}
