import styled from 'styled-components'
import { SmallParagraph } from '@/components/Text'
import { useColorBrightness } from '@/styles/theme'

type TTechProps = { name: string; iconSrc?: string }

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  place-items: center;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  grid-gap: 0;
  background-color: var(--color-hero-bg-up-10);
  padding-right: calc(var(--space) / 4);

  > p {
    display: block;
    width: 100%;
    padding: calc(var(--fluidSpace) / 4) 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Icon = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--space) / 5);
  width: calc(var(--space) / 4);

  > img {
    display: block;
    margin: 0;
    width: 100%;
    height: auto;
    max-width: 16px;
    max-height: 16px;
  }

  // Empty state icon
  :empty {
    ::after {
      content: ' ';
      display: block;
      width: 10px;
      height: 10px;
      align-self: center;
      border: 1px solid var(--color-main-text);
      box-sizing: border-box;
      transform: rotate(45deg);
    }
  }
`

export default function Tech({ name, iconSrc }: TTechProps) {
  const filter = useColorBrightness('main-text') < 0.5 ? 'invert()' : undefined

  return (
    <Wrapper title={name}>
      <Icon>
        {iconSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconSrc} alt="" style={{ filter }} />
        )}
      </Icon>
      <SmallParagraph>{name}</SmallParagraph>
    </Wrapper>
  )
}
