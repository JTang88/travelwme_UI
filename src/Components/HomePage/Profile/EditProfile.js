import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { 
   Typography,
   withStyles, 
   TextField, 
   Select,
   FormControl,
   MenuItem,
   InputLabel, 
   Button,
} from '@material-ui/core' 
import UploadUser from '../../Global/Forms/UploadUser';
import updateUser from '../../../graphql/mutations/updateUser';
import GeneralHeader from '../GeneralHeader';

const styles = {
  formControl: {
    width: 180,
  },
  description: {
    width: '100%',
    marginBottom: 40,
    backgroundColor: '#f5f6fa',
    padding: '5px 15px 5px 15px',
    borderRadius: 5,
  },
  button: {
    margin: 10,
  }
}

class EditProfile extends Component {
  state = { 
    username: this.props.user.username,
    gender: this.props.user.gender,
    relationship: this.props.user.relationship,
    birthday: this.props.user.birthday,
    description: this.props.user.description || '',

  }

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, console.log(this.state));
  }

  handdleUpdateProfile = async (e) => {
    e.preventDefault();
    this.setState({ edit: false });
    const updatedUserInfo = {
      username: this.state.username || null,
      description: this.state.description || null,
      id: this.props.user.id,
      gender: this.state.gender || null,
      relationship: this.state.relationship || null,
      birthday: this.state.birthday || null,
      publicId: null,
    }

    await this.props.mutate({
      variables: updatedUserInfo,
    });
  
    this.props.activateEdit();
  }

  render() {
    const { 
      user: {
        id,
        publicId,
      }, 
      classes: {
        formControl,
        description,
        button,
      },
      activateEdit,
    } = this.props;
    return ( 
      <div>
        <GeneralHeader>
          Edit Profile
        </GeneralHeader>
        <div className="profile-container">
          <UploadUser
            id={id}
            getUpdatedPhoto={this.getUpdatedPhoto}
          >
          <Image
            className="profile-pic"
            cloudName={process.env.REACT_APP_CLOUDNAME}
            publicId={publicId}
          />
          <Typography variant="caption" color="primary">
            click on the photo area to upload new photo
          </Typography>
        </UploadUser>
          <div className="edit-info-container">
            <div>
              <FormControl className={formControl} margin="normal">
                <TextField
                  autoFocus
                  value={this.state.username}
                  id="username"
                  label="Username"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={formControl} margin="normal">
                <TextField
                  name="birthday"
                  value={this.state.birthday}
                  id="birthday"
                  label="Birthday"
                  type="date"
                  name="birthday"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={formControl} margin="normal" >
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'gender',
                    id: 'gender',
                  }}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl> 
            </div>
            <div>
              <FormControl className={formControl} margin="normal">
                <InputLabel htmlFor="relationship">Relationship</InputLabel>
                <Select
                  value={this.state.relationship}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'relationship',
                    id: 'relationship',
                  }}
                >
                  <MenuItem value={'single'}>Single</MenuItem>
                  <MenuItem value={'in a relationship'}>In a relationship</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
            </div>
          </div>
          <div className="about-container">
            <FormControl className={description}>
              <TextField
                value={this.state.description}
                id="description"
                label="About:"
                type="text"
                rows={13}
                multiline
                name="description"
                onChange={this.handleChange}
              />
            </FormControl>
          </div>
          <Button 
            className={button} 
            variant="contained" 
            color="primary"
            onClick={this.handdleUpdateProfile}
          >
            Submit
          </Button>
          <Button 
            className={button} 
            onClick={activateEdit}
            variant="outlined" 
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}


export default graphql(updateUser)(withStyles(styles)(EditProfile));
