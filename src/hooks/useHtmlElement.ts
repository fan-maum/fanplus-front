import { useState } from 'react';

export default function useHtmlElement(string: React.ReactDOM) {
  return { __html: string };
}
