import React from 'react';

class TripSug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: ['ski', 'eat'],
    };
    this.suggestionList = this.suggestionList.bind(this);
  }

  suggestionList() {
    let suggestionBox = (<div className="d-flex flex-column">
      {this.state.suggestions.map(suggestion =>
    (<div key={suggestion} className="p-2">{suggestion}</div>))}
    </div>)

    return suggestionBox;
  }

  render() {
    return (
      <div>
        <h3>Trip Suggestion</h3>
        {this.suggestionList()}
        <form>
          <div className="form-group d-inline-flex p-2">
            <input type="text" className="form-control" placeholder="Example input" />
          </div>
        </form>
      </div>
    );
  }
}

export default TripSug;