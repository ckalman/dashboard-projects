import { Dispatcher } from 'flux';

// Only one dispatcher for a given React + Flux application
const AppDispatcher = new Dispatcher();

export default AppDispatcher;
