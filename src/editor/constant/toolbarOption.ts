export const defaultToolbar =
  'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | lineheight table';

export const pcToolbar = [
  'custom_image custom_video custom_youtube link',
  'fontfamily fontsize | ' + defaultToolbar,
];

export const mobileToolbar = [
  'custom_image custom_video custom_youtube link | fontfamily fontsize',
  defaultToolbar,
];

export const naverCafeToolbar =
  'custom_image custom_video custom_youtube link fontfamily fontsize' +
  'bold italic strikethrough lineheight forecolor backcolor' +
  'alignleft aligncenter alignright alignjustify table';
