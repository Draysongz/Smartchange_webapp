import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Button } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import Image from "next/image";
import Link from 'next/link';


import DashboardCard from '../shared/DashboardCard';

const CardY = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard title="Smart Change Update">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
          Join $CSA Upscale Launchpad Test Activities
          </Typography>
          <Stack spacing={3} mt={5} direction="row">
          <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
                Learn More
            </Button>
          </Stack>
        </Grid>
        {/* column */}

      </Grid>
    </DashboardCard>
  );
};

export default CardY;
