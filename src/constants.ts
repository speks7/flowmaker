import { dirname } from 'path';
export module ErrorMessages {
  export const NO_HTML = "The current editor doesn't show a HTML document.";
}

export module ExtensionConstants{
  export const PORT=8080;
  export const EXPRESSROOT=__dirname+'/assets/expressroot'
  export const PREVIEW_URI = "HTMLPreview://authority/preview";
}