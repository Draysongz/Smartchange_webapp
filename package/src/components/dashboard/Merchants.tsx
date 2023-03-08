import React from "react";
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
} from "@mui/material";
import img1 from "public/images/products/user.svg";
import { Stack } from "@mui/system";
import { IconBasket, IconTrash } from "@tabler/icons-react";
import BlankCard from "../shared/BlankCard";
import Image from "next/image";

const ecoCard = [
  {
    title: "Primidac",
    subheader: "September 14, 2023",
    photo: img1,
    rating: 4,
  },
  {
    title: "Crypto Karla",
    subheader: "September 14, 2023",
    photo: img1,
    rating: 5,
  },
  {
    title: "Benzima",
    subheader: "September 14, 2023",
    photo: img1,
    rating: 3,
  },
  {
    title: "CZ",
    subheader: "September 14, 2023",
    photo: img1,
    rating: 2,
  },
];

const Blog = () => {
  return (
    <Grid container spacing={3}>
      {ecoCard.map((product, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="/">
              <Image
                src={product.photo}
                alt="img"
                style={{ width: "100%", height: "250px" }}
              />
            </Typography>
            <Tooltip title="Remove Merchant">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconTrash size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6" textAlign={"center"}>{product.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                mt={1}
              > 
                <Rating
                  name="read-only"
                  size="small"
                  value={product.rating}
                  readOnly
                />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;
