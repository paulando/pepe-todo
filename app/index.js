var React = require("react");
var ReactDOM = require("react-dom");

var Noob = React.createClass({


  getInitialState: function() {

    return {
      value: "",
      pepe: "",
      todoList: ["wipe", "butt"]
    }

  },

  handleChange: function(e) {

    // this.inputValue = e.target.value;
    console.log("kon ci spaudi?",this.state.value);
    this.setState({
      value: e.target.value,
      pepe: "http://i1.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg"
    });

  },

  handleSubmit: function(e) {
    e.preventDefault();

    console.log("bebi!",this.state.value);
    if (this.state.value === "") {
      this.setState({pepe: "http://i3.kym-cdn.com/entries/icons/original/000/017/318/angry_pepe.jpg"})
      return false;
    }

    var list_array = this.state.todoList;
    list_array.push(this.state.value);
    this.setState({
      value: "",
      pepe: "http://i2.kym-cdn.com/photos/images/newsfeed/000/977/021/a14.jpg",
      todoList: list_array
    });

  },

  handleRemove: function(e) {

    var index = e.target.attributes.getNamedItem('data-index').value;
    var updated_list = this.state.todoList.filter(function (item, i) {
       return index != i ? item : "";
    });

    this.setState({
      pepe: "http://i1.kym-cdn.com/photos/images/facebook/000/095/218/feels-good-man.jpg",
      todoList: updated_list
    });

  },

  handleDone: function(e) {
    var el = e.target;
    var el_parent = el.parentElement.classList;

    if (!el_parent.contains('done')) {
      el_parent.add("done");
      el.innerHTML = "Undo";
      this.setState({
        pepe: "https://pbs.twimg.com/media/CayijGDUYAAJcAk.jpg",
      });

    } else {
      el_parent.remove("done");
      el.innerHTML = "Done";
      this.setState({
        pepe: "http://images.8tracks.com/cover/i/008/769/353/tumblr_ndo4s3xQln1qlpyreo8_1280-9891.jpg?rect=3,0,633,633&q=98&fm=jpg&fit=max&w=320&h=320",
      });
    }

  },

  render: function() {

    return (
      <div className="col-sm-6 col-sm-offset-3 text-center">
        <h1>Heyo, Noob!</h1>
        <form>
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
          <button type="button" className="btn btn-lg btn-primary" onClick={this.handleSubmit} style={{margin: 10 + 'px'}}>Add a task</button>
        </form>
        <div>
          <h3>Todo List</h3>
          <ul className="list-group">
            {this.state.todoList.map(function(task, index) {
              return (
                <li className="list-group-item clearfix" key={index}>
                  <span className="pull-left task">{task}</span>
                  <span
                    className="btn btn-sm btn-danger pull-right"
                    data-index={index}
                    onClick={this.handleRemove}>
                      Remove
                  </span>
                  <span
                    className="btn btn-sm btn-success pull-right"
                    onClick={this.handleDone}
                    style={{marginRight: 10 + "px"}}>
                      Done
                  </span>
                </li>
              )
            }.bind(this))}
          </ul>
        </div>
        <div style={{marginBottom: 30 + "px"}}>
          <Pepe pepe={this.state.pepe} />
        </div>
      </div>
    )

  }


});

const Pepe = function(props) {
  // console.log(props.pepe);
  // return (
    if (props.pepe != "") {
      return (
        <div>
          <img src={props.pepe} alt="" style={{height: "auto",width: 100 + "%"}}/>
        </div>
      )
    }
    return (<div></div>)
  // )
};

// <List items={this.state.todoList}></List>

// const List = function(props) {
//   console.log(props.items);
//   return (
//     <div>
//       <h3>Todo List</h3>
//       <ul className="list-group">
//         {props.items.map(function(item, index) {
//           return (
//             <li className="list-group-item clearfix" key={index}>
//               <span className="pull-left">{item}</span>
//               <span className="btn btn-sm btn-danger pull-right" onClick={}>Remove</span>
//               <span className="btn btn-sm btn-success pull-right" style={{marginRight: 10 + "px"}}>Done</span>
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }


ReactDOM.render(
  <Noob />,
  document.getElementById("app")
);
