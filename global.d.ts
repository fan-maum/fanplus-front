import { TinyMCE } from './public/tinymce/tinymce';

declare global {
  interface Window {
    tinymce?: TinyMCE;
  }
}
