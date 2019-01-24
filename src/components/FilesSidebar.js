import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { PlusIcon } from "./Icons";
import Button from "./Button";
import * as actions from "../actions";
import "./FilesSidebar.css";

class FilesSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onSearch = e => {
    this.setState({
      query: e.currentTarget.value
    });
  };

  render() {
    const { files, id, setNavigationId } = this.props;
    const { query } = this.state;
    const filesList = query
      ? files.filter(file => {
          return file.name.toUpperCase().indexOf(query.toUpperCase()) > -1;
        })
      : files;

    return (
      <div className="FilesSidebar">
        <div className="FilesSidebar__Search">
          <input
            autoFocus
            placeholder="Search..."
            onChange={this.onSearch}
            value={query}
          />
          <Button>
            <PlusIcon />
          </Button>
        </div>
        {filesList.map(file =>
          <div
            key={file.id}
            onClick={() => setNavigationId(file.id)}
            className={cx("FilesSidebar__ListItem", {
              "FilesSidebar__ListItem--Active": file.id === id
            })}
          >
            {file.name}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.navigation.id
  };
}

const mapDispatchToProps = {
  setNavigationId: actions.setNavigationId
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesSidebar);