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
        width="92"
        height="17"
        viewBox="0 0 92 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.48709 13.0002L0.871094 4.3922H3.44709L6.45509 11.8002H5.17509L8.29509 4.3922H10.6951L7.06309 13.0002H4.48709Z"
          fill="white"
        />
        <path
          d="M11.7136 13.0002V4.3922H14.2096V13.0002H11.7136ZM12.9616 3.1922C12.5029 3.1922 12.1296 3.05887 11.8416 2.7922C11.5536 2.52554 11.4096 2.19487 11.4096 1.8002C11.4096 1.40554 11.5536 1.07487 11.8416 0.808204C12.1296 0.541537 12.5029 0.408203 12.9616 0.408203C13.4203 0.408203 13.7936 0.536203 14.0816 0.792204C14.3696 1.03754 14.5136 1.35754 14.5136 1.7522C14.5136 2.1682 14.3696 2.51487 14.0816 2.7922C13.8043 3.05887 13.4309 3.1922 12.9616 3.1922Z"
          fill="white"
        />
        <path
          d="M16.5261 13.0002V1.1282H19.0221V13.0002H16.5261Z"
          fill="white"
        />
        <path
          d="M20.6986 16.2322C20.3146 16.2322 19.9466 16.1895 19.5946 16.1042C19.2426 16.0295 18.9439 15.9122 18.6986 15.7522L19.3706 13.9442C19.6586 14.1469 20.0106 14.2482 20.4266 14.2482C20.7359 14.2482 20.9813 14.1415 21.1626 13.9282C21.3546 13.7255 21.4506 13.4162 21.4506 13.0002V4.3922H23.9466V12.9842C23.9466 13.9762 23.6639 14.7655 23.0986 15.3522C22.5333 15.9389 21.7333 16.2322 20.6986 16.2322ZM22.6986 3.1922C22.2399 3.1922 21.8666 3.05887 21.5786 2.7922C21.2906 2.52554 21.1466 2.19487 21.1466 1.8002C21.1466 1.40554 21.2906 1.07487 21.5786 0.808204C21.8666 0.541537 22.2399 0.408203 22.6986 0.408203C23.1573 0.408203 23.5306 0.536203 23.8186 0.792204C24.1066 1.03754 24.2506 1.35754 24.2506 1.7522C24.2506 2.1682 24.1066 2.51487 23.8186 2.7922C23.5413 3.05887 23.1679 3.1922 22.6986 3.1922Z"
          fill="white"
        />
        <path
          d="M31.5248 13.0002V11.3202L31.3648 10.9522V7.9442C31.3648 7.41087 31.1995 6.99487 30.8688 6.6962C30.5488 6.39754 30.0528 6.2482 29.3808 6.2482C28.9222 6.2482 28.4688 6.32287 28.0208 6.4722C27.5835 6.61087 27.2102 6.80287 26.9008 7.0482L26.0048 5.3042C26.4742 4.97354 27.0395 4.71754 27.7008 4.5362C28.3622 4.35487 29.0342 4.2642 29.7168 4.2642C31.0288 4.2642 32.0475 4.57354 32.7728 5.1922C33.4982 5.81087 33.8608 6.7762 33.8608 8.0882V13.0002H31.5248ZM28.9008 13.1282C28.2288 13.1282 27.6528 13.0162 27.1728 12.7922C26.6928 12.5575 26.3248 12.2429 26.0688 11.8482C25.8128 11.4535 25.6848 11.0109 25.6848 10.5202C25.6848 10.0082 25.8075 9.5602 26.0528 9.1762C26.3088 8.7922 26.7088 8.49354 27.2528 8.2802C27.7968 8.0562 28.5062 7.9442 29.3808 7.9442H31.6688V9.4002H29.6528C29.0662 9.4002 28.6608 9.4962 28.4368 9.6882C28.2235 9.8802 28.1168 10.1202 28.1168 10.4082C28.1168 10.7282 28.2395 10.9842 28.4848 11.1762C28.7408 11.3575 29.0875 11.4482 29.5248 11.4482C29.9408 11.4482 30.3142 11.3522 30.6448 11.1602C30.9755 10.9575 31.2155 10.6642 31.3648 10.2802L31.7488 11.4322C31.5675 11.9869 31.2368 12.4082 30.7568 12.6962C30.2768 12.9842 29.6582 13.1282 28.9008 13.1282Z"
          fill="white"
        />
        <path
          d="M47.1438 4.2642C47.8265 4.2642 48.4292 4.40287 48.9518 4.6802C49.4852 4.94687 49.9012 5.36287 50.1998 5.9282C50.5092 6.48287 50.6638 7.19754 50.6638 8.0722V13.0002H48.1678V8.4562C48.1678 7.76287 48.0238 7.25087 47.7358 6.9202C47.4478 6.58954 47.0425 6.4242 46.5198 6.4242C46.1572 6.4242 45.8318 6.50954 45.5438 6.6802C45.2558 6.8402 45.0318 7.08554 44.8718 7.4162C44.7118 7.74687 44.6318 8.1682 44.6318 8.6802V13.0002H42.1358V8.4562C42.1358 7.76287 41.9918 7.25087 41.7038 6.9202C41.4265 6.58954 41.0265 6.4242 40.5038 6.4242C40.1412 6.4242 39.8158 6.50954 39.5278 6.6802C39.2398 6.8402 39.0158 7.08554 38.8558 7.4162C38.6958 7.74687 38.6158 8.1682 38.6158 8.6802V13.0002H36.1198V4.3922H38.5038V6.7442L38.0558 6.0562C38.3545 5.46954 38.7758 5.02687 39.3198 4.7282C39.8745 4.41887 40.5038 4.2642 41.2078 4.2642C41.9972 4.2642 42.6852 4.46687 43.2718 4.8722C43.8692 5.26687 44.2638 5.87487 44.4558 6.6962L43.5758 6.4562C43.8638 5.7842 44.3225 5.25087 44.9518 4.8562C45.5918 4.46154 46.3225 4.2642 47.1438 4.2642Z"
          fill="white"
        />
        <path
          d="M52.9011 13.0002V4.3922H55.3971V13.0002H52.9011ZM54.1491 3.1922C53.6904 3.1922 53.3171 3.05887 53.0291 2.7922C52.7411 2.52554 52.5971 2.19487 52.5971 1.8002C52.5971 1.40554 52.7411 1.07487 53.0291 0.808204C53.3171 0.541537 53.6904 0.408203 54.1491 0.408203C54.6078 0.408203 54.9811 0.536203 55.2691 0.792204C55.5571 1.03754 55.7011 1.35754 55.7011 1.7522C55.7011 2.1682 55.5571 2.51487 55.2691 2.7922C54.9918 3.05887 54.6184 3.1922 54.1491 3.1922Z"
          fill="white"
        />
        <path
          d="M58.6576 13.1282C58.2309 13.1282 57.8629 12.9842 57.5536 12.6962C57.2549 12.3975 57.1056 12.0189 57.1056 11.5602C57.1056 11.1015 57.2549 10.7335 57.5536 10.4562C57.8629 10.1682 58.2309 10.0242 58.6576 10.0242C59.0949 10.0242 59.4629 10.1682 59.7616 10.4562C60.0603 10.7335 60.2096 11.1015 60.2096 11.5602C60.2096 12.0189 60.0603 12.3975 59.7616 12.6962C59.4629 12.9842 59.0949 13.1282 58.6576 13.1282Z"
          fill="white"
        />
        <path
          d="M65.5033 13.1282C64.6927 13.1282 63.962 12.9469 63.3113 12.5842C62.6607 12.2109 62.1433 11.6935 61.7593 11.0322C61.386 10.3709 61.1993 9.5922 61.1993 8.6962C61.1993 7.78954 61.386 7.00554 61.7593 6.3442C62.1433 5.68287 62.6607 5.17087 63.3113 4.8082C63.962 4.44554 64.6927 4.2642 65.5033 4.2642C66.2287 4.2642 66.8633 4.4242 67.4073 4.7442C67.9513 5.0642 68.3727 5.54954 68.6713 6.2002C68.97 6.85087 69.1193 7.68287 69.1193 8.6962C69.1193 9.69887 68.9753 10.5309 68.6873 11.1922C68.3993 11.8429 67.9833 12.3282 67.4393 12.6482C66.906 12.9682 66.2607 13.1282 65.5033 13.1282ZM65.9353 11.0802C66.3407 11.0802 66.7087 10.9842 67.0393 10.7922C67.37 10.6002 67.6313 10.3282 67.8233 9.9762C68.026 9.61354 68.1273 9.18687 68.1273 8.6962C68.1273 8.19487 68.026 7.7682 67.8233 7.4162C67.6313 7.0642 67.37 6.7922 67.0393 6.6002C66.7087 6.4082 66.3407 6.3122 65.9353 6.3122C65.5193 6.3122 65.146 6.4082 64.8153 6.6002C64.4847 6.7922 64.218 7.0642 64.0153 7.4162C63.8233 7.7682 63.7273 8.19487 63.7273 8.6962C63.7273 9.18687 63.8233 9.61354 64.0153 9.9762C64.218 10.3282 64.4847 10.6002 64.8153 10.7922C65.146 10.9842 65.5193 11.0802 65.9353 11.0802ZM68.1913 13.0002V11.2402L68.2393 8.6802L68.0793 6.1362V1.1282H70.5753V13.0002H68.1913Z"
          fill="white"
        />
        <path
          d="M77.1575 13.1282C76.1761 13.1282 75.3121 12.9362 74.5655 12.5522C73.8295 12.1682 73.2588 11.6455 72.8535 10.9842C72.4481 10.3122 72.2455 9.54954 72.2455 8.6962C72.2455 7.8322 72.4428 7.06954 72.8375 6.4082C73.2428 5.7362 73.7921 5.21354 74.4855 4.8402C75.1788 4.4562 75.9628 4.2642 76.8375 4.2642C77.6801 4.2642 78.4375 4.44554 79.1095 4.8082C79.7921 5.1602 80.3308 5.6722 80.7255 6.3442C81.1201 7.00554 81.3175 7.8002 81.3175 8.7282C81.3175 8.8242 81.3121 8.9362 81.3015 9.0642C81.2908 9.18154 81.2801 9.29354 81.2695 9.4002H74.2775V7.9442H79.9575L78.9975 8.3762C78.9975 7.9282 78.9068 7.53887 78.7255 7.2082C78.5441 6.87754 78.2935 6.62154 77.9735 6.4402C77.6535 6.2482 77.2801 6.1522 76.8535 6.1522C76.4268 6.1522 76.0481 6.2482 75.7175 6.4402C75.3975 6.62154 75.1468 6.88287 74.9655 7.2242C74.7841 7.55487 74.6935 7.94954 74.6935 8.4082V8.7922C74.6935 9.26154 74.7948 9.67754 74.9975 10.0402C75.2108 10.3922 75.5041 10.6642 75.8775 10.8562C76.2615 11.0375 76.7095 11.1282 77.2215 11.1282C77.6801 11.1282 78.0801 11.0589 78.4215 10.9202C78.7735 10.7815 79.0935 10.5735 79.3815 10.2962L80.7095 11.7362C80.3148 12.1842 79.8188 12.5309 79.2215 12.7762C78.6241 13.0109 77.9361 13.1282 77.1575 13.1282Z"
          fill="white"
        />
        <path
          d="M85.159 13.0002L81.543 4.3922H84.119L87.127 11.8002H85.847L88.967 4.3922H91.367L87.735 13.0002H85.159Z"
          fill="white"
        />
      </svg>

      {children && <Content>{children}</Content>}
    </Wrapper>
  )
}
