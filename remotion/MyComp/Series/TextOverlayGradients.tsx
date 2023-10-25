import { fontFamily } from '@remotion/google-fonts/Inter'
import { useMemo } from 'react'
import { AbsoluteFill } from 'remotion'
import { TextFade } from '../TextFade'

export const TextOverlayGradients: React.FC<{
  text: string
}> = ({ text }) => {
  const gradient: React.CSSProperties = {
    background:
      'linear-gradient(141deg, rgba(130,35,46,1) 0%, rgba(231,20,25,1) 26%, rgba(231,20,25,1) 30%, rgba(140,10,83,1) 100%)',
  }

  const titleStyle: React.CSSProperties = useMemo(() => {
    return {
      fontFamily,
      fontSize: 70,
      textAlign: 'center',
      color: 'white',
      margin: '0px 40px',
    }
  }, [])

  return (
    <AbsoluteFill style={gradient}>
      <TextFade>
        <h1 style={titleStyle}>{text}</h1>
      </TextFade>
    </AbsoluteFill>
  )
}
