import 'styled-components';

interface ColorObj {
  correct: string;
  present: string;
  absent: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    background1: string;
    background2: string;
    text: string;
    keyBg1: string;
    KeyBg2: string;
    boardBg: string;
    boardBorder1: string;
    boardBorder2: string;
    button1: string;
    button2: string;
    color: ColorObj;
  }
}
