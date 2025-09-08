import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // <-- важно подключить стили
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
    </Provider>
  </BrowserRouter>
);
