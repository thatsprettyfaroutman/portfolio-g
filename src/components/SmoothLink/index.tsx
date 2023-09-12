import { type MouseEventHandler } from 'react'
import Link, { LinkProps } from 'next/link'

type TSmoothLinkProps = LinkProps

export default function SmoothLink({
  href,
  onClick,
  ...restProps
}: TSmoothLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Prevent default behavior for all links except for external links
    if (!String(href).startsWith('http')) {
      e.preventDefault()
    }

    if (onClick) {
      onClick(e)
    }

    // Scroll to element with id matching the hash in the URL
    const hash = String(href).split('#')[1]
    const element = document.getElementById(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return <Link href={href} onClick={handleClick} {...restProps} />
}
