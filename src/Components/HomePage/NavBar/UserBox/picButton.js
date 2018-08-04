import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    bottom: 1,
    paddingBottom: 12,
    paddingTop: 0,
    marginLeft: 10,
    backgroundColor: 'inherit',
    color: '#636e72',
    borderBottom: '3px solid white',
    borderRadius: 0,
    minWidth: 72,
    '&:hover': {
      backgroundColor: 'inherit',
      borderBottom: `3px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
  label: {
    textTransform: 'initial',
  },

});

function PicButton(props) {
  const { classes } = props;

  return (
    <Button
      disableRipple
      onClick={props.onClick}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
    >
      {props.children}
    </Button>
  );
}

PicButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PicButton);