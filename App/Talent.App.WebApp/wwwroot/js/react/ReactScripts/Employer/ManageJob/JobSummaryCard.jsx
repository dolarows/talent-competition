import React from "react";
import Cookies from "js-cookie";
import { Popup, Card, Button } from "semantic-ui-react";
import moment from "moment";

export class JobSummaryCard extends React.Component {
  constructor(props) {
    super(props);

    this.selectJob = this.selectJob.bind(this);
  }

  componentDidMount() {
    this.selectJob();
  }

  selectJob(id) {
    var cookies = Cookies.get("talentAuthToken");
    // url: 'http://localhost:51689/listing/listing/closeJob',
  }

  render() {
    console.log(this.props.jobs);
    const jobs = this.props.jobs.map((job) => (
      <Card>
        <Card.Content>
          <Card.Header>{job.title}</Card.Header>
          <Card.Meta>
            {job.location.city ? job.location.city + "," : ""}{" "}
            {job.location.country ? job.location.country : ""}
          </Card.Meta>
          <Card.Description>{job.summary}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button basic color="blue">
              Edit
            </Button>
            <Button basic color="blue">
              Copy
            </Button>
            <Button basic color="red">
              Remove
            </Button>
          </div>
        </Card.Content>
      </Card>
    ));
    return <Card.Group>{jobs}</Card.Group>;
  }
}
