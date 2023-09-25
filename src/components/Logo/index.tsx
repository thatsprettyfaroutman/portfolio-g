'use client'

import styled from 'styled-components'
import { MiniHeading } from '@/components/Text'

type TLogoProps = {
  children?: React.ReactNode
}

const Wrapper = styled.div`
  display: flex;
  gap: calc(var(--space) / 4);
  justify-content: center;
  align-items: center;

  > svg {
    display: block;
    margin: 0;
    margin-top: -6px;

    path {
      fill: var(--color-main-text);
    }
  }
`

const Content = styled(MiniHeading)`
  text-align: center;
  color: var(--color-main-text);
  letter-spacing: 0.5em;
`

export default function Logo({ children, ...restProps }: TLogoProps) {
  return (
    <Wrapper {...restProps}>
      <svg
        width="62"
        height="19"
        viewBox="0 0 62 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0149 5.08789H15.6149L10.1669 17.9999H6.30291L0.878906 5.08789H4.74291L8.31891 13.8719L12.0149 5.08789Z"
          fill="white"
        />
        <path
          d="M26.1991 0.191895H29.9431V17.9999H26.3671V16.5119C25.4311 17.6399 24.0631 18.1919 22.3351 18.1919C18.6871 18.1919 15.8791 15.5999 15.8791 11.5439C15.8791 7.4879 18.6871 4.8959 22.3351 4.8959C23.9191 4.8959 25.2631 5.39989 26.1991 6.45589V0.191895ZM22.9831 15.1199C24.8311 15.1199 26.2711 13.7759 26.2711 11.5439C26.2711 9.31189 24.8311 7.9679 22.9831 7.9679C21.1111 7.9679 19.6711 9.31189 19.6711 11.5439C19.6711 13.7759 21.1111 15.1199 22.9831 15.1199Z"
          fill="white"
        />
        <path
          d="M46.0563 11.5919C46.0563 11.8799 46.0083 12.2879 45.9843 12.5999H36.2163C36.5763 14.2079 37.9443 15.1919 39.9123 15.1919C41.2803 15.1919 42.2643 14.7839 43.1523 13.9439L45.1443 16.1039C43.9443 17.4719 42.1443 18.1919 39.8163 18.1919C35.3523 18.1919 32.4483 15.3839 32.4483 11.5439C32.4483 7.6799 35.4003 4.8959 39.3363 4.8959C43.1283 4.8959 46.0563 7.43989 46.0563 11.5919ZM39.3603 7.72789C37.6563 7.72789 36.4323 8.7599 36.1683 10.4159H42.5283C42.2643 8.7839 41.0403 7.72789 39.3603 7.72789Z"
          fill="white"
        />
        <path
          d="M57.5305 5.08789H61.1305L55.6825 17.9999H51.8185L46.3945 5.08789H50.2585L53.8345 13.8719L57.5305 5.08789Z"
          fill="white"
        />
      </svg>
      {children && <Content>{children}</Content>}
    </Wrapper>
  )
}
