import type { ReactElement } from 'react';
import FullLayout from '../../../src/layouts/full/FullLayout';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import BlankCard from '../../../src/components/shared/BlankCard';


const TypographyPage = () => {
  return (
    <PageContainer title="Smart Swap" description="Smart Swap">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Smart Swap">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1"></Typography>
                    <Typography variant="body1" color="textSecondary">
                      {/* data and styling runs here dray */}
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>

          </DashboardCard>
        </Grid>
      </Grid >
    </PageContainer>
  );
};

export default TypographyPage;
TypographyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};