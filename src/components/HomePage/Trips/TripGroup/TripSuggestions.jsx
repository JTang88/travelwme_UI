import React from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';

class TripSuggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: ['ski', 'eat'],
    };
    this.suggestionList = this.suggestionList.bind(this);
    this.commentExampleReplyFormOuter = this.commentExampleReplyFormOuter.bind(this);
  }

  suggestionList() {
    let suggestionBox = (<div className="d-flex flex-column">
      {this.state.suggestions.map(suggestion =>
    (<div key={suggestion} className="p-2">{suggestion}</div>))}
    </div>)

    return suggestionBox;
  }

  commentExampleReplyFormOuter() {
    return ( <Comment.Group>
      <Comment>
        <Comment.Avatar as='a' src='/assets/images/avatar/small/joe.jpg' />
        <Comment.Content>
          <Comment.Author>Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <div>1 day ago</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there.</p>
            <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
  
      <Comment>
        <Comment.Avatar as='a' src='/assets/images/avatar/small/christian.jpg' />
        <Comment.Content>
          <Comment.Author>Christian Rocha</Comment.Author>
          <Comment.Metadata>
            <div>2 days ago</div>
          </Comment.Metadata>
          <Comment.Text>I re-tweeted this.</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
  
      <Form reply>
        <Form.TextArea />
        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>)
  }

  

  render() {
    return (
      <div>
        <h3>Trip Suggestion</h3>
        {this.suggestionList()}
        {this.commentExampleReplyFormOuter()}
        <form>
          <div className="form-group d-inline-flex p-2">
            <input type="text" className="form-control" placeholder="Example input" />
          </div>
        </form>
      </div>
    );
  }
}

export default TripSuggestions;