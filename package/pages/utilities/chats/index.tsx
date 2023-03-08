import type { ReactElement } from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullLayout from '../../../src/layouts/full/FullLayout';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  return (
    <PageContainer title="Chat" description="this is Shadow">

      <DashboardCard title="Chat">
        <Grid container spacing={2}>
          {[lightTheme, darkTheme].map((theme, index) => (
            <Grid item xs={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                 
                </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
Shadow.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};