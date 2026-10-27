import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from './Icon';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
	const [theme, setTheme] = useTheme();
	const next = theme === 'dark' ? 'light' : 'dark';
	return (
		<button type="button" className={styles.toggle} onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`}>
			{theme === 'dark' ? <Sun /> : <Moon />}
		</button>
	);
}
