import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Repository from '../pages/Repository';
import Dashboard from '../pages/Dashboard';

export default () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/repositories/*" element={<Repository />} />
  </Routes>
);
