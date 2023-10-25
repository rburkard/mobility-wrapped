import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

export const Referral: React.FC<{
  titleStyleDark: React.CSSProperties
  savingsInChf: number
}> = ({ titleStyleDark, savingsInChf }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const baseStyle: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <AbsoluteFill style={baseStyle}>
      <h1 style={titleStyleDark}>{`Want to benefit too?`}</h1>
      <div style={{ opacity: interpolate(frame, [fps, 2 * fps], [0, 1]) }}>
        <h1
          style={{ ...titleStyleDark, margin: '16px 0px' }}
        >{`Use my code`}</h1>
        <div style={{ border: '1px solid black' }}>
          <h1
            style={{
              ...titleStyleDark,
              margin: '16px 32px',
              fontSize: 56,
              color: 'rgba(231,20,25,1)',
            }}
          >
            RandomCodeRoman23
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  )
}
