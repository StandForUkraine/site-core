import { defaultLang } from 'core/texts';
import { useLang } from './lang';

const useLangLinkPrefix = (): string => {
  const lang = useLang();

  return lang === defaultLang ? '/' : `/${lang}/`;
}

export default useLangLinkPrefix;
