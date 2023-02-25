import { DefaultTheme } from 'styled-components';

const color = {
  correct: '#5babab',
  present: '#fdb800',
  absent: '#908790',
};

export const lightTheme: DefaultTheme = {
  background1: 'rgba(222,222,222,0.8)',
  background2: '#fefefe', // 다이얼로그
  text: '#111',
  keyBg1: '#e3e1e3',
  KeyBg2: '#cfcbcf',
  boardBg: 'white',
  boardBorder1: '#222f3e',
  boardBorder2: '#202124', // 활성화시
  button1: '#e3e1e3',
  button2: '908790',
  color: { ...color },
};

export const darkTheme: DefaultTheme = {
  background1: '#2f3640',
  background2: '#38393e', // 다이얼로그
  text: 'white',
  keyBg1: '#403c40',
  KeyBg2: '#766c76',
  boardBg: '#131213',
  boardBorder1: '#9c88ff',
  boardBorder2: '#e3e1e3', // 활성화시
  button1: '#5c565c',
  button2: '#908790',
  color: { ...color },
};
// export const darkTheme: DefaultTheme = {
//   bgColor: '#2f3640',
//   textColor: 'white',
//   accentColor: '#9c88ff',
//   cardBgColor: 'rgba(0,0,0,0.15)',
// };
// export const lightTheme: DefaultTheme = {
//   bgColor: 'rgba(222,222,222,0.8)',
//   textColor: '#111',
//   accentColor: '#222f3e',
//   cardBgColor: 'white',
// };
