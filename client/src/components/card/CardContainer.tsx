import * as React from 'react';
import { Grid } from '@mui/material';
import CardComponent, { CardData } from './CardComponent';

interface CardContainerProps {
  data: CardData[];
}

function CardContainer(props: CardContainerProps) {
  const { data } = props;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: 'flex-start',
        overflow: 'auto',
        maxHeight: 'inherent',
      }}
    >
      {data.map((cardData) => (
        <Grid
          key={cardData.index}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{ minWidth: 250 }}
        >
          <CardComponent data={cardData} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardContainer;