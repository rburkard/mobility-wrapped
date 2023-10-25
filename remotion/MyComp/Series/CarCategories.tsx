import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { CategoriesType } from '../../constants/functions'

export const CarCategories: React.FC<{
  titleStyleDark: React.CSSProperties
  categories: CategoriesType
}> = ({ titleStyleDark, categories }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const baseStyle: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <AbsoluteFill style={baseStyle}>
      <h1 style={titleStyleDark}>{'This year I used all of those cars..'}</h1>
      {Object.entries(categories).map(([key, value], idx) => {
        const delay = fps * 3
        const staggered = idx * (fps / 3)

        const scale =
          spring({
            fps,
            frame,
            from: 0,
            to: 1,
            delay: staggered,
            config: { overshootClamping: true, damping: 50 },
          }) +
          spring({
            fps,
            frame,
            to: 1.3,
            delay: delay + staggered,
            config: { overshootClamping: true, damping: 50 },
          })

        const translateX =
          spring({
            fps,
            frame,
            from: 1200,
            to: 0,
            config: { overshootClamping: true, damping: 50 },
            delay: staggered,
          }) +
          spring({
            fps,
            frame,
            to: -1200,
            delay: delay + staggered,
            config: { overshootClamping: true, damping: 50 },
          })

        const translateY =
          spring({
            fps,
            frame,
            from: -300,
            to: 0,
            delay: staggered,
            config: { overshootClamping: true, damping: 50 },
          }) +
          spring({
            fps,
            frame,
            to: 200,
            delay: delay + staggered,
            config: { overshootClamping: true, damping: 50 },
          })

        return (
          <Img
            key={key}
            src={staticFile(`/categories/${key.toLowerCase()}.png`)}
            style={{
              transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
