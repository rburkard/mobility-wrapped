import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { TextFade } from '../TextFade'

export const SavingsChf: React.FC<{
  titleStyle: React.CSSProperties
  savingsInChf: number
}> = ({ titleStyle, savingsInChf }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const delay = 2 * fps

  const scale = spring({
    frame,
    fps,
    from: 1,
    to: 1.5,
    delay: delay,
  })

  const gradient: React.CSSProperties = {
    background:
      'linear-gradient(141deg, rgba(130,35,46,1) 0%, rgba(231,20,25,1) 26%, rgba(231,20,25,1) 30%, rgba(140,10,83,1) 100%)',
  }

  return (
    <AbsoluteFill style={gradient}>
      <TextFade>
        <h1
          style={titleStyle}
        >{`By renting instead of owning I saved more than`}</h1>
        <h1
          style={{
            ...titleStyle,
            transform: `scale(${scale})`,
            fontVariantNumeric: 'tabular-nums',
            margin: '16px 0px',
          }}
        >
          {`CHF
            ${Math.floor(
              interpolate(frame, [-fps, delay], [0, savingsInChf], {
                extrapolateRight: 'clamp',
              }),
            )}  
            this year`}
        </h1>
      </TextFade>
    </AbsoluteFill>
  )
}
