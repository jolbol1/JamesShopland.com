"use client"
export default function Strava() {
  return (
    <>
      <iframe
        title="Strava activity summary"
        height="160"
        className="mx-auto mt-3"
        width="300"
        src="https://www.strava.com/athletes/92849539/activity-summary/349e72c767f7b8bb5e1d5f6502ba3ceb80a29933"
      ></iframe>
      <iframe
        title="Strava latest runs"
        className="mx-auto "
        height="454"
        width="300"
        src="https://www.strava.com/athletes/92849539/latest-rides/349e72c767f7b8bb5e1d5f6502ba3ceb80a29933"
      ></iframe>
    </>
  )
}
