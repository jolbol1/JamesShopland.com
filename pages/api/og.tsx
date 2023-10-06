/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { NextRequest } from "next/server"

import { ImageResponse } from "@vercel/og"

import { ogImageSchema } from "@/lib/validations/og"

export const config = {
  runtime: "edge",
}

const interBold = fetch(
  new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const image = fetch(
  new URL("../../assets/logo-64x64.png", import.meta.url)
).then((res) => res.arrayBuffer())

const image2 = fetch(new URL("../../assets/icons.png", import.meta.url)).then(
  (res) => res.arrayBuffer()
)

export default async function handler(req: NextRequest) {
  try {
    const fontBold = await interBold

    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading

    const { mode } = values
    const paint = mode === "dark" ? "#fff" : "#000"

    const fontSize = heading.length > 30 ? "70px" : "100px"

    const imageData = await image
    const image2Data = await image2

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background: mode === "dark" ? "black" : "white",
          }}
        >
          <div
            tw="flex leading-[1.1] font-bold tracking-tighter items-center"
            style={{
              fontFamily: "Inter",
              fontWeight: "bolder",
              marginLeft: "-3px",
              fontSize: "32px",
            }}
          >
            <img width="64" height="64" src={imageData} />
            <h1 tw="pl-4">James Shopland</h1>
          </div>

          <div tw="flex flex-col flex-1 ">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter"
              style={{
                fontFamily: "Inter",
                fontWeight: "bolder",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              jamesshopland.com
            </div>
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              <img height="86" src={image2Data} />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
