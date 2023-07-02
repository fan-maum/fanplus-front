text_assets에 새로운 언어를 등록하여 사용하려 할 때,

1. middleware.ts에 해당 언어의 locale code를 추가
  - 각 안어별 locale code는 아래 주소를 참고
  https://www.science.co.il/language/Locale-codes.php

2. asset을 사용하려는 component에서 useTranslator hook을 import 하여 사용하면 됨.
  예시는 PageLinkContainer 를 참고.