import styled from 'styled-components'
import FONT from '@/styles/fonts'
import { palette } from '@/styles/theme'
import Text from '@/components/Text'

export type TTechProps = { name: string; icon?: string }

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  place-items: center;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  grid-gap: 0;

  border: 1px solid ${palette.main.background.bottom.brighten()};

  font-family: ${FONT.Inconsolata};

  > p {
    padding: calc(var(--col) / 4) 0;
  }
`

const Icon = styled.div`
  align-self: stretch;
  display: flex;
  place-content: center;
  padding: calc(var(--maxCol) / 5);
  width: calc(var(--maxCol) / 4);

  > img {
    display: block;
    margin: 0;
    width: 100%;
    height: auto;
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

export default function Tech({ name, icon }: TTechProps) {
  return (
    <Wrapper>
      <Icon>
        {icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt="" />
        )}
      </Icon>
      <Text.SmallParagraph>{name}</Text.SmallParagraph>
    </Wrapper>
  )
}
