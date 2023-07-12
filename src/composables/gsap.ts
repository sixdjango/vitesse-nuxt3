import { isClient } from '@vueuse/shared'
import { gsap } from 'gsap'

const getGsapElements = (selector: string) => {
  const elements = [] as HTMLElement[]
  document.querySelectorAll('.gsap').forEach((el) => {
    if (el.className.includes(selector) || el.getAttributeNames().join(' ').includes(selector))
      elements.push(el as HTMLElement)
  })
  return elements
}

const toFadeDir = (selector: string, toggleActions = 'play none none none') => {
  getGsapElements(selector).forEach((el) => {
    gsap.to(el,
      {
        scrollTrigger: {
          trigger: el,
          toggleActions,
        },
        x: 0,
        y: 0,
        opacity: 1,
      },
    )
  })
}

/**
 * 滚动切换
 */
const scrollSwiper = () => {
  const sections = getGsapElements('scroll-swiper')
  const swiper = document.querySelector('.scroll-swiper-container') as HTMLElement

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: swiper,
      pin: true,
      pinType: 'transform',
      scrub: 1,
      start: '50% 50%',
      snap: 1 / (sections.length - 1),
    },
  })
}

export const useRegisterCommonGsap = (option: { restart?: boolean } = {}) => {
  const { restart } = option
  const actions = `${restart ? 'restart' : 'play'} none none none`
  if (isClient) {
    scrollSwiper()
    toFadeDir('fade-left', actions)
    toFadeDir('fade-right', actions)
    toFadeDir('fade-top', actions)
    toFadeDir('fade-bottom', actions)
  }
}
