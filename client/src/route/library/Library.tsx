import * as React from 'react';
import Layout from 'page/Layout';
import TabComponent from 'components/tab/TabComponent';
import { TabData } from 'components/tab/subcomponents/TabRender';
import { Paper, Typography } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import AssetBoard from 'components/asset/AssetBoard';
import ShoppingCart from 'components/cart/ShoppingCart';
import { getAndSetUsername } from '../../util/auth/Authentication';
import tabs from './LibraryTabData';

function useLibraryData() {
  const auth = useAuth();
  getAndSetUsername(auth);

  const assetBoardWithSuspense = (
    pathToAssets: string,
    privateRepo?: boolean
  ) => (
    <React.Suspense fallback={<AssetBoard />}>
      <AssetBoard pathToAssets={pathToAssets} privateRepo={privateRepo} />
    </React.Suspense>
  );
  const tabsData: TabData[] = tabs.map((tab) => ({
    label: tab.label,
    body: (
      <>
        <Typography variant="body1">{tab.body}</Typography>
        <TabComponent
          tabs={[
            { label: 'Private', body: assetBoardWithSuspense(tab.label, true) },
            { label: 'Common', body: assetBoardWithSuspense(tab.label) },
          ]}
        />
      </>
    ),
  }));
  return tabsData;
}

function LibraryContent() {
  const tabsData = useLibraryData();
  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <TabComponent
          tabs={tabsData}
          sx={{ flexGrow: 2, marginRight: '2rem' }}
        />
        <Paper
          sx={{
            flexGrow: 1,
            minWidth: '20rem',
            textAlign: 'center',
            paddingTop: '2rem',
          }}
        >
          <Typography variant="h5">Shopping Cart</Typography>
          <ShoppingCart />
        </Paper>
      </div>
    </Layout>
  );
}

export default function Library() {
  return <LibraryContent />;
}
