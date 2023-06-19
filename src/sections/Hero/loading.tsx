import Image from "next/image";
import Styled from "./styled";

export default function LoadingHero({ ...restProps }) {
  return (
    <Styled.Hero {...restProps}>
      <Image
        src="/thing-loading.png"
        alt="Ever changing graphical element"
        width={519}
        height={511}
      />
    </Styled.Hero>
  );
}
