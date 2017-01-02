var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = React.PropTypes;

const PepeSingleton = {
  angry: "http://i3.kym-cdn.com/entries/icons/original/000/017/318/angry_pepe.jpg",
  happy: "http://i1.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg",
  sneaky: "http://i2.kym-cdn.com/photos/images/newsfeed/000/977/021/a14.jpg",
  good: "http://i1.kym-cdn.com/photos/images/facebook/000/095/218/feels-good-man.jpg",
  crying: "http://images.8tracks.com/cover/i/008/769/353/tumblr_ndo4s3xQln1qlpyreo8_1280-9891.jpg?rect=3,0,633,633&q=98&fm=jpg&fit=max&w=320&h=320",
  resting: "https://pbs.twimg.com/media/CayijGDUYAAJcAk.jpg"
};

var getSelectedIndex = function(e) {
  return parseInt(e.target.parentElement.attributes.getNamedItem('data-index').value);
};

var Noob = React.createClass({


  getInitialState: function() {

    return {
      value: "",
      pepe: "",
      todoList: [
        {title: "ayy", complete: true},
        {title: "lmao", complete: false}
      ]
    }

  },

  handleChange: function(e) {

    this.setState({
      value: e.target.value,
      pepe: PepeSingleton.happy
    });

  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (this.state.value === "") {
      this.setState({pepe: PepeSingleton.angry})
      return false;
    }

    var tasks_array = this.state.todoList;
    var new_task = {title: this.state.value, complete: false};

    tasks_array.push(new_task);

    this.setState({
      value: "",
      pepe: PepeSingleton.sneaky,
      todoList: tasks_array
    });

  },

  handleRemove: function(e) {

    var new_tasks_array = this.state.todoList.filter(function (task, i) {
      return getSelectedIndex(e) != i ? task : "";
    });

    this.setState({
      pepe: PepeSingleton.good,
      todoList: new_tasks_array
    });

  },

  handleDone: function(e) {

    var index = getSelectedIndex(e);
    var new_tasks_array = this.state.todoList.map(function (task, i) {

      if (index === i) {
        !task.complete ? task.complete = true : task.complete = false;
      }

      return task;

    });

    var pepe_reaction = new_tasks_array[index].complete ? PepeSingleton.resting : PepeSingleton.crying;

    this.setState({
      pepe: pepe_reaction,
      todoList: new_tasks_array
    });

  },

  render: function() {

    return (
      <MainContainer>
        <Title />
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit} value={this.state.value} />
        <TodoList todoList={this.state.todoList} onRemove={this.handleRemove} toggleDone={this.handleDone} />
        <Pepe pepe={this.state.pepe} />
      </MainContainer>
    )

  }


});


const MainContainer = function(props) {

  return (
    <div className="col-sm-6 col-sm-offset-3 text-center">
      {props.children}
    </div>
  )

}


const Title = function(props) {

  return (
    <h1>Heyo, Noob!</h1>
  )

}


const Form = function(props) {

  return (
    <form>
      <input
        type="text"
        className="form-control"
        value={props.value}
        onChange={props.onChange} />
      <button
        type="button"
        className="btn btn-lg btn-primary"
        onClick={props.onSubmit}
        style={{margin: 10 + 'px'}}>
          Add a task
      </button>
    </form>
  )

};


const TodoList = function(props) {

  return (
    <div>
      <ul className="list-group">
        {props.todoList.map(function(task, index) {
          return (
            <li className={"list-group-item clearfix" + (task.complete ? " done" : "")} data-index={index} key={index}>
              <span className="pull-left task">{task.title}</span>
              <span
                className="btn btn-sm btn-danger pull-right"
                onClick={props.onRemove}>
                  Remove
              </span>
              <span
                className="btn btn-sm btn-success pull-right"
                onClick={props.toggleDone}
                style={{marginRight: 10 + "px"}}>
                  {task.complete ? "Undo" : "Done"}
              </span>
            </li>
          )
        }.bind(this))}
      </ul>
    </div>
  )
};


const Pepe = function(props) {

  if (props.pepe != "") {
    return (
      <div style={{marginBottom: 30 + "px"}}>
        <img src={props.pepe} alt="" style={{height: "auto",width: 100 + "%"}}/>
      </div>
    )
  }

  return (<div></div>)

};


// Noob.propTypes = {
//   value: PropTypes.string,
//   pepe: PropTypes.string,
//   todoList: PropTypes.arrayOf(PropTypes.shape({
//      title: PropTypes.string.isRequired,
//      complete: PropTypes.bool.isRequired,
//    })).isRequired
// }

ReactDOM.render(
  <Noob />,
  document.getElementById("app")
);
