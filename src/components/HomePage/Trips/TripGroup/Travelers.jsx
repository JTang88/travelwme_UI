import React from 'react';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';

class Travelers extends React.Component {
  constructor(props) {
    super(props);
    this.cardExampleCard = this.cardExampleCard.bind(this);
  }

  cardExampleCard(user) {
    return (
    <Card>
      <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={user.user.publicId} />
      <Card.Content>
        <Card.Header>
          {user.user.username}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {user.user.gender}
          </span>
        </Card.Meta>
        <Card.Description>
          {user.user.descrition}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {user.user.age}
        {user.user.relationship}
      </Card.Content>
    </Card>)
  };

  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="container">
            <h1 className="text-uppercase triptit">{this.props.showtrip.title}</h1>
          </div>
        </header>
        <div>
          <section className="portfolio" id="portfolio">
            <div className="container">
              <h2 className="text-center text-uppercase text-secondary">Travelers</h2>
              <hr />
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  {this.cardExampleCard(this.props.creator)}
                </div>
                {this.props.triptrav.map(user =>
                (<div key={user.user.id} className="col-md-6 col-lg-4">
                  {this.cardExampleCard(user)}
                </div>))}
              </div>
            </div>  
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

export default connect(mapStateToProps)(Travelers);


    // this.showJoinedTravelers = this.showJoinedTravelers.bind(this);

  // showJoinedTravelers() {
  //   let showTravelers;
  //   if (this.props.triptrav.length === 0) { showTravelers = (<div />); }
  //   else {
  //     showTravelers = (
  //         {this.props.triptrav.map(user =>
  //       (<div key={user.user.id} className="col-md-6 col-lg-4">
  //         <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={user.user.publicId} />
  //         <h4>{user.user.username}</h4>
  //       </div>))})
  //   }
  //   return showTravelers;
  // }