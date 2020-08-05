import { createContext } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

const AppContext = createContext<WebPartContext>(undefined);

export default AppContext;
