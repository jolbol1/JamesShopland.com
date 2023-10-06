async function getPageData() {
  const res = await fetch(
    "https://graphql.justgiving.com/?operationName=basePageData&variables=%7B%22includeEvent%22%3Afalse%2C%22type%22%3A%22ONE_PAGE%22%2C%22slug%22%3A%22page%2Fjames-shopland%22%2C%22preview%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2249069c2015a87c32f24a03c0634367a55cc5a39a8e068038aa0a03935e7a50e6%22%7D%7D",
    { next: { revalidate: 600 } }
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function JustGiving() {
  const data = await getPageData()
  const percentage = (
    data.data.page.donationSummary.totalAmount.value / 1000
  ).toFixed(2)
  const value = data.data.page.donationSummary.totalAmount.value / 100
  const giftAid =
    data.data.page.donationSummary.totalMatched[0].amount.value / 100

  return (
    <>
      <div className="mb-1 mt-3 text-lg font-medium dark:text-white">
        £{value} raised of £1,000 target
      </div>
      <div className="h-6 w-full rounded-full bg-gray-400 dark:bg-gray-700">
        <div
          className="flex h-6 items-center justify-center rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
          style={{
            width: `${Number.parseInt(percentage) >= 100 ? 100 : percentage}%`,
          }}
        >
          <p className="text-md h-fit">{percentage}%</p>
        </div>
      </div>
      <span className="text-xs">(plus £{giftAid} Gift Aid)</span>
      <a
        href="https://www.justgiving.com/page/james-shopland/donate"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-3 mt-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Donate on JustGiving
      </a>
    </>
  )
}
