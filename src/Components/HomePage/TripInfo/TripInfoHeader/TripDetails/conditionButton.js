import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const styles = {
  root: {
    backgroundColor: 'white',
    color: '#e84393',
  },
};

const ConditionButton = ({ classes, children, onClick }) => {
  return (
    <Button
      size="large"
      variant="contained"
      onClick={onClick}
      className={classes.root}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(ConditionButton);