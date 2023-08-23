import styled from 'styled-components'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'
import { SmallParagraph } from '@/components/Text'

type TTechProps = { name: string; iconSrc?: string }

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  place-items: center;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  grid-gap: 0;

  border: 1px solid ${palette.main.border};

  > p {
    padding: calc(var(--col) / 4) 0;
  }
`

const Icon = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--maxCol) / 5);
  width: calc(var(--maxCol) / 4);

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
      border: 1px solid ${palette.main.text};
      box-sizing: border-box;
      transform: rotate(45deg);
    }
  }
`

export default function Tech({ name, iconSrc }: TTechProps) {
  return (
    <Wrapper>
      <Icon>
        {iconSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconSrc} alt="" />
        )}
      </Icon>
      <SmallParagraph>{name}</SmallParagraph>
    </Wrapper>
  )
}
