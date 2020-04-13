import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import "./ListItems.css";
import firebase from "@firebase/app";

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      list: [],
      newItem: "",
      docPrefixName: props.docPrefixName,
      collection: firebase.firestore().collection(props.collectionName)
    };

    this.updateInput = this.updateInput.bind(this);
  }

  componentDidMount() {
    if (this.props.data[0].items.length > 0) {
      this.setState({
        list: this.props.data[0].items.sort(this.compare("order"))
      });
    }

    this.setState({ data: this.props.data[0] });
  }

  compare = function(sortBy) {
    return function(a, b) {
      // Use toUpperCase() to ignore character casing
      const orderA = a[sortBy];
      const orderB = b[sortBy];

      let comparison = 0;
      if (orderA > orderB) {
        comparison = 1;
      } else if (orderA < orderB) {
        comparison = -1;
      }
      return comparison;
    };
  };

  updateInput(event) {
    this.setState({ newItem: event.target.value });
  }

  addItem = function(itemName) {
    if (itemName.trim() !== "") {
      let newData = this.state.data;
      let index = 1;
      if (newData.items.length > 0) {
        index =
          newData.items.reduce(
            (max, p) => (p.key > max ? p.key : max),
            newData.items[0].key
          ) + 1;
      }

      var newItem = {
        key: index,
        name: itemName,
        checked: false,
        order: index
      };

      newData.items.push(newItem);

      this.state.collection
        .doc(this.state.docPrefixName)
        .set(newData)
        .then();

      this.setState({ list: newData.items });
      this.setState({ data: newData });

      this.setState({ newItem: "" });
    }
  };

  checkItem = function(key) {
    let newList = this.state.list;
    let objIndex = newList.findIndex(obj => obj.key === key);
    newList[objIndex].checked = !newList[objIndex].checked;
    this.setState({ list: newList });
  };

  removeItem = function(key) {
    let newData = this.state.data;
    let list = newData.items;
    var filteredList = list.filter(function(e) {
      return e.key !== key;
    });

    newData.items = filteredList;

    this.state.collection
      .doc(this.state.docPrefixName)
      .set(newData)
      .then();

    this.setState({ list: newData.items });
  };

  removeAllItems = function() {
    let newData = this.state.data;

    newData.items = [];

    this.state.collection
      .doc(this.state.docPrefixName)
      .set(newData)
      .then();

    this.setState({ list: newData.items });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      let newlist = this.state.list;

      newlist.map((currElement, index) => {
        currElement.order = index + 1;
      });

      let newData = this.state.data;
      newData.items = newlist;

      this.state.collection
        .doc(this.state.docPrefixName)
        .set(newData)
        .then();

      this.setState({ list: newlist });
    }
  };

  render() {
    return (
      <div>
        <ReactSortable
          animation={200}
          onEnd={this.onSortEnd}
          list={this.state.list}
          setList={newState => this.setState({ list: newState })}
        >
          {this.state.list.map(item => (
            <div
              key={item.key}
              className={"item " + (item.checked ? "item-checked" : "")}
            >
              <span onDoubleClick={() => this.checkItem(item.key)}>
                {item.name}
                <FaCheckCircle
                  className={
                    "icon green " + (!item.checked ? "hidden-icon" : "")
                  }
                />
              </span>
              <FaTrash
                className={"icon red right"}
                onDoubleClick={() => this.removeItem(item.key)}
              ></FaTrash>
            </div>
          ))}
        </ReactSortable>
        <div className="add-item">
          <input
            type="text"
            value={this.state.newItem}
            onChange={this.updateInput}
          />
          <FaPlus
            className={"icon"}
            onClick={() => {
              this.addItem(this.state.newItem);
            }}
          ></FaPlus>
        </div>
        <div
          className="clear-items"
          onDoubleClick={() => {
            this.removeAllItems();
          }}
        >
          <label>Remove All</label>
          <FaTrash className={"icon"}></FaTrash>
        </div>
      </div>
    );
  }
}

export default ListItems;
