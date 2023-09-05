import Brand from '@/components/Brand'
import Marquee from '@/components/Marquee/lazy'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, Title, BrandsWrapper, Brands } from './styled'

export default async function IntroSection({ ...restProps }) {
  const introSection = await useIntroSection()

  if (!introSection.brands?.length) {
    return null
  }

  return (
    <Wrapper {...restProps}>
      <Title>{introSection.brandsTitle}</Title>
      <BrandsWrapper>
        <Marquee>
          <Brands>
            {introSection.brands.map((brand) => (
              <Brand key={brand.sys.id}>{brand}</Brand>
            ))}
          </Brands>
        </Marquee>
      </BrandsWrapper>
    </Wrapper>
  )
}
