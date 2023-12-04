import type { Editor } from '../../../public/tinymce/tinymce';

export const useIOSIMESetting = (editor: Editor) => {
  editor.on('keydown', (e: Event) => e.stopImmediatePropagation());
};
