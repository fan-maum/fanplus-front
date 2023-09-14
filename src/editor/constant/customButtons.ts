// @ts-ignore
export const useCustomImageButton = ({ editor, onCustomAction }) => {
  editor.ui.registry.addButton("custom_image", {
    icon: "image",
    onAction: onCustomAction,
  });
};

// @ts-ignore
export const useCustomVideoButton = ({ editor, onCustomAction }) => {
  editor.ui.registry.addIcon(
    "custom_video_icon",
    '<img src="/tinymce/icons/editor/editor-video-camera.png" style="width:24px; height:24px;" />'
  );
  editor.ui.registry.addButton("custom_video", {
    icon: "custom_video_icon",
    onAction: onCustomAction,
  });
};

// @ts-ignore
export const useCustomYoutubeButton = ({ editor }) => {
  editor.ui.registry.addIcon(
    "custom_youtube_icon",
    '<img src="/tinymce/icons/editor/editor-youtube.png" style="width:24px; height:24px;" />'
  );
  editor.ui.registry.addButton("custom_youtube", {
    icon: "custom_youtube_icon",
    onAction: () => {
      editor.editorCommands.commands.exec.mcemedia();
    },
  });
};
