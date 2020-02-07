import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import "./ListItems.css";
import firebase from "@firebase/app";

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      newItem: ""
    };

    this.updateInput = this.updateInput.bind(this);
  }

  componentDidMount() {
    this.setState({ list: this.props.items });
  }

  updateInput(event) {
    this.setState({ newItem: event.target.value });
  }

  addNewItem = function(itemName) {
    let newList = this.state.list;
    let index = 1;
    if (newList.length > 0) {
      index =
        newList.reduce(
          (max, p) => (p.key > max ? p.key : max),
          newList[0].key
        ) + 1;
    }

    var newItem = {
      key: index,
      name: itemName,
      checked: false,
      order: index
    };

    firebase
      .firestore()
      .collection("supermarket-list")
      .doc("supermarket-list" + index)
      .set(newItem)
      .then();

    newList.push(newItem);
    this.setState({ list: newList });
    localStorage.setItem("list", JSON.stringify(newList));
    this.setState({ newItem: "" });
  };

  checkItem = function(key) {
    let newList = this.state.list;
    let objIndex = newList.findIndex(obj => obj.key === key);
    newList[objIndex].checked = !newList[objIndex].checked;
    this.setState({ list: newList });
  };

  removeItem = function(key) {
    let list = this.state.list;
    var filteredList = list.filter(function(e) {
      return e.key !== key;
    });

    firebase
      .firestore()
      .collection("supermarket-list")
      .doc("supermarket-list" + key)
      .delete()
      .then();

    this.setState({ list: filteredList });
  };

  removeAllItems = function() {
    const collection = firebase
      .firestore()
      .collection("supermarket-list")
      .get();

    collection.then(doc => {
      doc.docs.map(doc => {
        var item = doc.data();
        firebase
          .firestore()
          .collection("supermarket-list")
          .doc("supermarket-list" + item.key)
          .delete()
          .then();
      });
    });

    this.setState({ list: [] });
  };

  render() {
    return (
      <div>
        <ReactSortable
          list={this.state.list}
          setList={newState => this.setState({ list: newState })}
        >
          {this.state.list.map(item => (
            <div key={item.key}>
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
              this.addNewItem(this.state.newItem);
            }}
          ></FaPlus>
        </div>
        <div
          onClick={() => {
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
