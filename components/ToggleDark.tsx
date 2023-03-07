import { useTheme } from 'next-themes';

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'trailfinder_light' ? 'trailfinder_dark' : 'trailfinder_light');
  }

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* rest of your component code */}
    </div>
  );
}