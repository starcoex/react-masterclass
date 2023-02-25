import { useCallback, useState } from 'react';
function useTheme() {
  const [theme, setTheme] = useState('lightTheme');
  const onChangeTheme = useCallback(() => {
    setTheme((prev) => (prev === 'lightTheme' ? 'darkTheme' : 'lightTheme'));
  }, []);
  return {
    theme,
    onChangeTheme,
  };
}
export default useTheme;
