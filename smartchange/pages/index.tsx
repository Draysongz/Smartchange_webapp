import type { ReactElement } from 'react';

import { Grid, Box } from '@mui/material';
import PageContainer from '../src/components/container/PageContainer';

// components
import CardY from '../src/components/dashboard/CardY';
import Blog from '../src/components/dashboard/Merchants';
import Cardo from '../src/components/dashboard/Cardo';
import FullLayout from '../src/layouts/full/FullLayout';



export default function Home() {

  return (
    
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={5}>
              <Grid item xs={10}>
                <CardY />
              </Grid>
              <Grid item xs={12}>
                <Cardo />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};