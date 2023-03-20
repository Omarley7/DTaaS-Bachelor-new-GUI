import { Grid, Paper } from '@mui/material';
import Iframe from 'components/Iframe';
import Layout from 'page/Layout';
import * as React from 'react';

function WorkBenchContent() {
  /*
  Will become configurable in the next iteration
  const UrlWorkbench = new URL('user/2/tree?', window.location.href);
  */
  const UrlWorkbench = window.env.REACT_APP_URL_WORKBENCH;

  return (
    <Layout>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            height: '100%',
          }}
        >
          <Iframe title="workbench-sandbox" url={UrlWorkbench} />
        </Paper>
      </Grid>
    </Layout>
  );
}

export default function WorkBench() {
  return <WorkBenchContent />;
}
