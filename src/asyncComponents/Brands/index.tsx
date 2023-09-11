import Brand from '@/components/Brand'
import useIntroSection from '@/contentful/hooks/useIntroSection'
import { Wrapper, Title, BrandsMarquee, Brands } from './styled'

export default async function IntroSection({ ...restProps }) {
  const introSection = await useIntroSection()

  if (!introSection.brands?.length) {
    return null
  }

  return (
    <Wrapper {...restProps}>
      <Title>{introSection.brandsTitle}</Title>
      <BrandsMarquee>
        <Brands>
          {introSection.brands.map((brand) => (
            <Brand key={brand.sys.id}>{brand}</Brand>
          ))}
        </Brands>
      </BrandsMarquee>
    </Wrapper>
  )
}
