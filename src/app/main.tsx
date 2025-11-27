import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MainContainer } from './modules/shared/infrastructure/ui/react/containers/main/main.container.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContainer />
  </StrictMode>
);
