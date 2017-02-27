import { Dispatcher } from 'flux';

// Only ever one dispatcher for a given React + Flux application
const AppDispatcher = new Dispatcher();

export default AppDispatcher;