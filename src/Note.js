/**
 * Created by alexandershipunov on 01/03/2017.
 *
 */
import React  from 'react';
import './App.css';
import Draggable from 'react-draggable'

const Note = React.createClass({
    getInitialState() {
        return { editing: false }
    },
    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 300, 'px'),
            top: this.randomBetween(0, window.innerHeight - 300, 'px'),
            backgroundColor: this.randomColorSet()
    }
    },
    componentDidUpdate() {
        if(this.state.editing) {
            this.refs.newText.focus();
            this.refs.newText.select();
        }
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.children !== nextProps.children || this.state !== nextState;
    },
    randomBetween(x, y, s){
        return (x + Math.ceil(Math.random() * (y - x))) + s;
    },
    randomColor() {
        return Math.ceil(Math.random() * (101)) + 100;
    },
    randomColorSet() {
        return `rgba(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()}, 1)`;
    },
    edit() {
        this.setState({ editing: true });
    },
    save() {
        this.props.onChange(this.refs.newText.value, this.props.id);
        this.setState({ editing: false})
    },
    remove(){
        this.props.onRemove(this.props.id);
    },
    renderForm() {
        return (
            <div className="note"
                 style={this.style}>
                        <textarea ref="newText"
                                  defaultValue={this.props.children}/>
                <button onClick={this.save}>SAVE</button>
            </div>
        );
    },
    renderDisplay() {
        return (
            <div className="note"
                 style={this.style}>
                <p>{this.props.children}</p>
                <span>
                             <button onClick={this.edit}>Edit</button>
                             <button onClick={this.remove}>X</button>
                        </span>
            </div>
        );
    },
    render() {
        return ( <Draggable>
            {(this.state.editing) ?  this.renderForm() : this.renderDisplay()}
        </Draggable>)
    }
});

export default Note;