import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from '@/presentation/pages/Home';
const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(_jsx(React.StrictMode, { children: _jsx(Home, {}) }));
