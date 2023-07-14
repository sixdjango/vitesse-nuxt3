import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-40 py-10 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'bg-transparent inline-block cursor-pointer select-none  transition duration-200 ease-in-out opacity-70 hover:opacity-100 hover:bg-black/10 rounded-2'],
  ],
  theme: {
    fontSize: {
      '2xl': '24px',
      'xl': '20px',
      'lg': '16px',
      'md': '14px',
      'sm': '12px',
    },
  },
  rules: [
    [/^fade-bottom-?(\d+)?$/, ([, d]) => ({ transform: `translate(0px, -${d || 60}px)`, opacity: 0 })],
    [/^fade-top-?(\d+)?$/, ([, d]) => ({ transform: `translate(0px, ${d || 60}px)`, opacity: 0 })],
    [/^fade-right-?(\d+)?$/, ([, d]) => ({ transform: `translate(${d || 60}px, 0px)`, opacity: 0 })],
    [/^fade-left-?(\d+)?$/, ([, d]) => ({ transform: `translate(-${d || 60}px, 0px)`, opacity: 0 })],
    // [/^rounded-?(\d+)?$/, ([, d]) => ({ 'border-radius': `${parseInt(d || '4')}rem` })],
    // [/^max-w-(\d+)$/, ([, d]) => ({ width: `${parseInt(d)}rem` })],
    // [/^w-(\d+)$/, ([, d]) => ({ width: `${parseInt(d)}rem` })],
    // [/^h-(\d+)$/, ([, d]) => ({ height: `${parseInt(d)}rem` })],
    // [/^m-(\d+)$/, ([, d]) => ({ margin: `${parseInt(d)}rem` })],
    // [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${parseInt(d)}rem` })],
    // [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${parseInt(d)}rem` })],
    // [/^p-(\d+)$/, match => ({ padding: `${parseInt(match[1])}rem` })],
    // [/^px-(\d+)$/, match => ({ 'padding-right': `${parseInt(match[1])}rem`, 'padding-left': `${parseInt(match[1])}rem` })],
    // [/^py-(\d+)$/, match => ({ 'padding-top': `${parseInt(match[1])}rem`, 'padding-bottom': `${parseInt(match[1])}rem` })],
  ],
  // 安全选项，防止为编译 CSS 的类名被删除。 字符串数组
  safelist: [],
  // preflights: [
  //   {
  //     getCSS: ({ theme }) => {
  //       return `
  //         .fade-left {
  //           transform: translate(-100px, 0px);
  //           opacity: 0;
  //         }`
  //     },
  //   },
  // ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
