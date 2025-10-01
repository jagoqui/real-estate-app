import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MainContainer} from './app/modules/shared/infrastructure/ui/react/containers/main/main.container.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContainer />
  </StrictMode>
);
