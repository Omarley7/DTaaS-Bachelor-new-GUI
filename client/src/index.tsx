import '@fontsource/roboto';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from 'page/Layout';
import Dashboard from './route/dashboard/Dashboard';
import Library from './route/library/Library';
import DigitalTwins from './route/digitaltwins/DigitalTwins';
import ScenarioAnalysis from './route/scenarioAnalysis/ScenarioAnalysis';
import DTHistory from './route/history/History';
import SignIn from './route/auth/Signin';
import Account from './route/auth/Account';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="digitaltwins" element={<DigitalTwins />} />
          <Route path="sanalysis" element={<ScenarioAnalysis />} />
          <Route path="history" element={<DTHistory />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </>
);
