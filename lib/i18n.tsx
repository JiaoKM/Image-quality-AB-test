'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'en' | 'sv' | 'zh'

const translations = {
  en: {
    home: {
      title: 'Image Quality Preference Study',
      description:
        'Thank you for participating in this research. You will be shown pairs of images and asked to judge which one looks better overall. The study takes approximately 5–10 minutes.',
      note: 'Your responses are anonymous and will be used only for academic research.',
      start: 'Start Study',
    },
    instructions: {
      title: 'Instructions',
      items: [
        'You will see a reference image at the top (to show what the original looks like), followed by two comparison images side by side (stacked on mobile).',
        'Compare the two images based on overall visual quality — detail, realism, naturalness, and absence of artifacts.',
        'Click the button that matches your preference, or "Similar / No Preference" if you cannot tell a difference.',
        'There are no right or wrong answers — go with your first impression.',
        'Once you click a choice you cannot change it, so take a moment before deciding.',
        'Do not refresh the page or use the browser back button during the study.',
      ],
      hint: 'If you need to take a break, you can close the browser and return later — your progress is saved automatically.',
      begin: 'Begin Study',
    },
    study: {
      loading: 'Loading...',
      question: 'Which of the two images looks better overall?',
      leftBetter: 'Left is Better',
      similar: 'Similar / No Preference',
      rightBetter: 'Right is Better',
      topBetter: 'Top is Better',
      bottomBetter: 'Bottom is Better',
      saving: 'Saving...',
      error: 'Failed to save your response. Please try again.',
    },
    progress: {
      question: 'Question',
      of: 'of',
      complete: '% complete',
    },
    done: {
      title: 'Thank You!',
      body: 'Your responses have been recorded. Your participation is greatly appreciated and contributes to our research.',
      close: 'You may now close this browser tab.',
    },
    img: {
      left: 'Left',
      right: 'Right',
      top: 'Top',
      bottom: 'Bottom',
      ref: 'Reference',
    },
  },

  sv: {
    home: {
      title: 'Studie om bildkvalitetspreferens',
      description:
        'Tack för att du deltar i denna forskning. Du kommer att se par av bilder och ombeds bedöma vilken som ser bäst ut totalt sett. Studien tar ungefär 5–10 minuter att slutföra.',
      note: 'Dina svar är anonyma och används enbart för akademisk forskning.',
      start: 'Starta studien',
    },
    instructions: {
      title: 'Instruktioner',
      items: [
        'Du kommer att se en referensbild längst upp (för att visa hur originalet ser ut), följt av två jämförelsebilder sida vid sida (ovanför varandra på mobil).',
        'Jämför de två bilderna utifrån den övergripande visuella kvaliteten – detaljer, realism, naturlighet och frånvaro av artefakter.',
        'Klicka på knappen som matchar din preferens, eller "Liknande / Ingen preferens" om du inte kan avgöra skillnaden.',
        'Det finns inga rätt eller fel svar – gå efter ditt första intryck.',
        'När du klickat på ett val kan du inte ändra det, så ta ett ögonblick att tänka.',
        'Undvik att uppdatera sidan eller använda webbläsarens bakåtknapp under studien.',
      ],
      hint: 'Om du behöver ta en paus kan du stänga webbläsaren och återvända senare – dina framsteg sparas automatiskt.',
      begin: 'Börja studien',
    },
    study: {
      loading: 'Laddar...',
      question: 'Vilken av de två bilderna ser bättre ut totalt sett?',
      leftBetter: 'Vänster är bättre',
      similar: 'Liknande / Ingen preferens',
      rightBetter: 'Höger är bättre',
      topBetter: 'Övre är bättre',
      bottomBetter: 'Nedre är bättre',
      saving: 'Sparar...',
      error: 'Det gick inte att spara. Försök igen.',
    },
    progress: {
      question: 'Fråga',
      of: 'av',
      complete: '% klart',
    },
    done: {
      title: 'Tack!',
      body: 'Dina svar har sparats. Vi uppskattar verkligen ditt deltagande och ditt bidrag till vår forskning.',
      close: 'Du kan nu stänga den här fliken.',
    },
    img: {
      left: 'Vänster',
      right: 'Höger',
      top: 'Övre',
      bottom: 'Nedre',
      ref: 'Referensbild',
    },
  },

  zh: {
    home: {
      title: '图像质量偏好研究',
      description:
        '感谢您参与本次研究。您将看到若干对图像，每次对比两张，请根据整体视觉效果选择更好的一张。完成测试大约需要 5–10 分钟。',
      note: '您的回答完全匿名，仅用于学术研究目的。',
      start: '开始',
    },
    instructions: {
      title: '实验说明',
      items: [
        '每题顶部会展示一张参考图（帮助你了解原始图像的样子），下方是两张对比图并排显示（手机上为上下排列）。',
        '比较两张图的整体视觉质量，包括细节、真实感、自然度和是否有明显的瑕疵。',
        '根据您的判断，点击对应的按钮，或选择「差不多 / 无偏好」。',
        '没有标准答案，请依据您的第一印象作出选择即可。',
        '点击按钮后无法修改，请稍作思考后再点击。',
        '请不要刷新页面或使用浏览器的"后退"按钮。',
      ],
      hint: '如需中途休息，可以直接关闭浏览器，下次打开时进度会自动恢复。',
      begin: '开始实验',
    },
    study: {
      loading: '加载中...',
      question: '两张图中，哪张的整体效果更好？',
      leftBetter: '左图更好',
      similar: '差不多 / 无偏好',
      rightBetter: '右图更好',
      topBetter: '上图更好',
      bottomBetter: '下图更好',
      saving: '正在保存...',
      error: '保存失败，请重试。',
    },
    progress: {
      question: '第',
      of: '题 / 共',
      complete: '% 已完成',
    },
    done: {
      title: '感谢您的参与！',
      body: '您的回答已成功记录。感谢您抽出宝贵时间参与本次研究，您的贡献对我们非常重要。',
      close: '您现在可以关闭此页面。',
    },
    img: {
      left: '左图',
      right: '右图',
      top: '上图',
      bottom: '下图',
      ref: '参考图',
    },
  },
}

export type Translations = typeof translations.en
type LangContextType = { lang: Lang; setLang: (l: Lang) => void; t: Translations }

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('abtest_lang') as Lang | null
    if (stored === 'en' || stored === 'sv' || stored === 'zh') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('abtest_lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
