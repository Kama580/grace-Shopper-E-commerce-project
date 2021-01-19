import React from 'react'
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import {Fingerprint} from '@material-ui/icons'
import EmailIcon from '@material-ui/icons/Email'

const styles = theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(1)
  }
})

class SignInSignUp extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <div className="signin-card">
        <Paper className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="email"
                  label="email"
                  type="email"
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="password"
                  label="password"
                  type="password"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Button
                  disableFocusRipple
                  disableRipple
                  style={{textTransform: 'none'}}
                  variant="text"
                  color="primary"
                >
                  Forgot password ?
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{marginTop: '10px'}}>
              <Button
                variant="outlined"
                color="primary"
                style={{textTransform: 'none'}}
              >
                Sign In
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SignInSignUp)
