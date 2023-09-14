// @ts-ignore
export const useIOSIMESetting = (editor) => {
  editor.on("keydown", (e: Event) => e.stopImmediatePropagation());
};
