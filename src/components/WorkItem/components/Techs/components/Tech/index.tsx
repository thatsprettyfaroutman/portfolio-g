import styled from 'styled-components'
import { SmallParagraph } from '@/components/Text'
import useElementOffset from '@/hooks/useElementOffset'
import { useColorBrightness } from '@/styles/theme'

type TTechProps = { name: string; iconSrc?: string }

const Wrapper = styled.div`
  position: relative;
  padding: 1px;
  border-radius: 4px;

  --x: calc(var(--bg-mouse-x, 0px) - var(--offset-x, 0px));
  --y: calc(var(--bg-mouse-y, 0px) - var(--offset-y, 0px));

  ::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;

    background: radial-gradient(
      500px circle at var(--x) var(--y),
      var(--color-hero-bg-up-50),
      var(--color-hero-bg-up-10) 50%
    );

    opacity: var(--bg-hover);
  }
`

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  place-items: center;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  grid-gap: 0;
  padding-right: calc(var(--space) / 4);
  background-color: var(--color-hero-bg-alpha-70);
  border-radius: 3px;

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
  const { ref, offset } = useElementOffset()
  const filter = useColorBrightness('main-text') < 0.5 ? 'invert()' : undefined

  return (
    <Wrapper
      ref={ref}
      title={name}
      style={{
        // @ts-ignore
        '--offset-x': `${offset.x}px`,
        // @ts-ignore
        '--offset-y': `${offset.y}px`,
      }}
    >
      <Content>
        <Icon>
          {iconSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconSrc} alt="" style={{ filter }} />
          )}
        </Icon>
        <SmallParagraph>{name}</SmallParagraph>
      </Content>
    </Wrapper>
  )
}
