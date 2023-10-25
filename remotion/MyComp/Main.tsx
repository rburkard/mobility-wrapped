import { z } from 'zod'
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { CompositionProps } from '../../types/constants'
import { loadFont, fontFamily } from '@remotion/google-fonts/Inter'
import React, { useMemo } from 'react'
import { TextFade } from './TextFade'
import {
  CategoriesType,
  getCategories,
  getMostUsed,
} from '../constants/functions'
import { result } from '../constants/resultsRoman'
import { Img, staticFile, Audio, Series, interpolate } from 'remotion'
import { CarCategories } from './Series/CarCategories'
import { TextOverlayGradients } from './Series/TextOverlayGradients'
import { MostUsedCar } from './Series/MostUsedCar'
import { SavingsChf } from './Series/SavingsChf'
import { Referral } from './Series/Referral'

loadFont()

const container: React.CSSProperties = {
  backgroundColor: 'white',
}

const logo: React.CSSProperties = {
  justifyContent: 'center',
  alignItems: 'center',
}

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const { fps } = useVideoConfig()

  const titleStyle: React.CSSProperties = useMemo(() => {
    return {
      fontFamily,
      fontSize: 70,
      textAlign: 'center',
      color: 'white',
      margin: '0px 40px',
    }
  }, [])

  const titleStyleDark: React.CSSProperties = useMemo(() => {
    return {
      fontFamily,
      fontSize: 70,
      textAlign: 'center',
      color: 'black',
      margin: '0px 40px',
    }
  }, [])

  const categories = getCategories(result)

  const mostUsed = getMostUsed(categories)

  const yearlyCarCost = 10000

  const totalCost = Object.values(categories).reduce(
    (tot, curr) => curr.cost + tot,
    0,
  )

  const savingsInChf = yearlyCarCost - totalCost

  console.log(getCategories(result))
  console.log(getMostUsed(getCategories(result)))

  return (
    <AbsoluteFill style={container}>
      <Audio src={staticFile('soundtrack.mp3')} />
      <Series>
        <Series.Sequence durationInFrames={fps * 3}>
          <TextOverlayGradients
            text={'I choose my car depending on my mood..'}
          />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={fps * Object.values(categories).length + fps}
        >
          <CarCategories
            titleStyleDark={titleStyleDark}
            categories={categories}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 4}>
          <TextOverlayGradients text="But one of them I clearly love the most.." />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 5}>
          <MostUsedCar
            titleStyleDark={titleStyleDark}
            categories={categories}
            mostUsed={mostUsed}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 4}>
          <SavingsChf titleStyle={titleStyle} savingsInChf={savingsInChf} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 4}>
          <Referral
            titleStyleDark={titleStyleDark}
            savingsInChf={savingsInChf}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
