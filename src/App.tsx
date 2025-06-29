import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

// Component to render routes
const AppRoutes: React.FC = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;