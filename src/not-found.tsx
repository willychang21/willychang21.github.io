import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles';
import { NotFound } from './sections/NotFound';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<NotFound />
	</StrictMode>
);
