import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { CategoriesType, CategoryEnum } from '../../constants/functions'
import { catSubtitle } from '../../constants/variables'

export const MostUsedCar: React.FC<{
  titleStyleDark: React.CSSProperties
  categories: CategoriesType
  mostUsed: string | null
}> = ({ titleStyleDark, categories, mostUsed }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const baseStyle: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
  }

  const delay = 3 * fps

  const scale = spring({
    fps,
    frame,
    from: 0,
    to: 2,
    delay: delay,
    config: { damping: 50 },
  })

  const textScale = spring({
    fps,
    frame,
    from: 0,
    to: 1,
    delay: delay,
    config: { damping: 50 },
  })

  const questionMarkScale =
    1 +
    spring({
      fps,
      frame,
      config: { damping: 50 },
    }) *
      0.5 -
    spring({
      fps,
      frame,
      delay: delay,
      config: { damping: 50 },
    }) *
      1.5

  return (
    <AbsoluteFill style={baseStyle}>
      <h1
        style={{
          ...titleStyleDark,
          transform: `scale(${questionMarkScale})`,
          fontSize: 400,
          position: 'absolute',
          paddingBottom: 120,
          background:
            'linear-gradient(141deg, rgba(130,35,46,1) 0%, rgba(231,20,25,1) 26%, rgba(231,20,25,1) 30%, rgba(140,10,83,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ?
      </h1>
      {mostUsed && (
        <Img
          src={staticFile(`/categories/${mostUsed}.png`)}
          style={{
            transform: `scale(${scale})`,
            margin: '120px 0px',
          }}
        />
      )}
      {mostUsed && (
        <div style={{ height: 200 }}>
          {frame < delay ? (
            <h1 style={{ ...titleStyleDark }}>
              {catSubtitle[mostUsed as CategoryEnum]}
            </h1>
          ) : (
            <h1 style={{ ...titleStyleDark, transform: `scale(${textScale})` }}>
              My perfect companion, the{' '}
              <span style={{ color: 'rgba(231,20,25,1)' }}>{mostUsed}</span>{' '}
              category..
            </h1>
          )}
        </div>
      )}
    </AbsoluteFill>
  )
}
