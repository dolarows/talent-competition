﻿import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import LoggedInBanner from "../../Layout/Banner/LoggedInBanner.jsx";
import { LoggedInNavigation } from "../../Layout/LoggedInNavigation.jsx";
import { JobSummaryCard } from "./JobSummaryCard.jsx";
import { BodyWrapper, loaderData } from "../../Layout/BodyWrapper.jsx";
import {
  Pagination,
  Icon,
  Dropdown,
  Checkbox,
  Accordion,
  Form,
  Segment,
} from "semantic-ui-react";

export default class ManageJob extends React.Component {
  constructor(props) {
    super(props);
    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");
    this.state = {
      loadJobs: [],
      loaderData: loader,
      activePage: 1,
      sortBy: {
        date: "desc",
      },
      filter: {
        showActive: true,
        showClosed: false,
        showDraft: true,
        showExpired: true,
        showUnexpired: true,
      },
      totalPages: 1,
      activeIndex: "",
    };
    this.loadData = this.loadData.bind(this);
    this.init = this.init.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    //your functions go here
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData }); //comment this

    //set loaderData.isLoading to false after getting data
    // this.loadData(() => this.setState({ loaderData }));

    // console.log(this.state.loaderData);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    // var link = "http://localhost:51689/listing/listing/getSortedEmployerJobs";
    var cookies = Cookies.get("talentAuthToken");
    // your ajax call and other logic goes here
    $.ajax({
      url: "http://localhost:51689/listing/listing/getEmployerJobs",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "GET",
      success: function(res) {
        this.setState({
          loadJobs: res.myJobs,
        });
      }.bind(this),
    });
    this.init();
  }

  loadNewData(data) {
    var loader = this.state.loaderData;
    loader.isLoading = true;
    data[loaderData] = loader;
    this.setState(data, () => {
      this.loadData(() => {
        loader.isLoading = false;
        this.setState({
          loadData: loader,
        });
      });
    });
  }

  render() {
    return (
      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <div className="ui container">
          <h2>List of Jobs</h2>
          <JobSummaryCard jobs={this.state.loadJobs} />
        </div>
      </BodyWrapper>
    );
  }
}
