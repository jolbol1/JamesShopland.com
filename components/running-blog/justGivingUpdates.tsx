async function getTimelineData() {
  try {
    const res = await fetch(
      "https://graphql.justgiving.com/?operationName=ListTimelineEntries&variables=%7B%22type%22%3A%22ONE_PAGE%22%2C%22slug%22%3A%22page%2Fjames-shopland%22%2C%22measurementSystem%22%3A%22IMPERIAL%22%2C%22first%22%3A3%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%227e52c2dab36016e39a126ead2c4c8f0f412c78de166a7a5d789d9dcf2a2f0a77%22%7D%7D",
      { next: { revalidate: 600 } }
    )

    if (!res.ok) {
      return []
    }

    const payload = await res.json()
    return payload?.data?.page?.timeline?.nodes ?? []
  } catch {
    return []
  }
}

export default async function JustGivingUpdates() {
  const timeline = await getTimelineData()

  return (
    <>
      {timeline &&
        timeline.map(
          (
            item: { id: string; message: string; media: [{ url: string }] },
            index: number
          ) => {
            const updateCount = timeline.length - index
            return (
              <div key={item.id}>
                <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white">
                  Update {updateCount}
                </h3>

                <p
                  key={item.id}
                  dangerouslySetInnerHTML={{
                    __html: item.message.replace(/\n/g, "<br />"),
                  }}
                  className="mt-2"
                ></p>
                {item?.media[0]?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="mx-auto my-3 w-full max-w-[500px]"
                    src={item.media[0].url}
                    alt={`update ${updateCount}`}
                    loading="lazy"
                  />
                )}
              </div>
            )
          }
        )}
    </>
  )
}
