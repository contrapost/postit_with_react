import React  from 'react';
import './App.css';
import Note from './Note'

const Board = React.createClass({
    propTypes: {
        count: function (props, propName) {
            if(typeof props[propName] !== "number") {
                return new Error("the count must be a number");
            }

            if(props[propName] > 100) {
                return new Error(`
                        Creating ${props[propName]} notes is ridiculous.
                    `);
            }
        }
        /*count: React.PropTypes.number*/
    },
    getInitialState() {
        return {
            notes: []
        }
    },
    componentWillMount() {
        if(this.props.count) {
            const url = `http://api.icndb.com/jokes/random/${this.props.count}`;
            fetch(url)
                .then((response) => response.json())
                .then(json => json.value.forEach(joke => this.add(joke.joke)))
                .catch((error) => {
                    console.log('no connection to API', error);
                });
        }
    },
    nextID() {
        this.uniqID = this.uniqID || 0;
        return this.uniqID++;
    },
    add(text) {
        const notes = [
            ...this.state.notes,
            {
                id: this.nextID(),
                note: text
            }
        ];
        this.setState({notes});
    },
    update(newText, id){
        const notes = this.state.notes.map(
            note => (note.id !== id) ?
                note :
                {
                    ...note,
                    note: newText
                }
        );
        this.setState({notes});
    },
    remove(id){
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({notes});
    },
    eachNote(note){
        return (<Note key={note.id}
                      id={note.id}
                      onChange={this.update}
                      onRemove={this.remove}>
            {note.note}
        </Note>);
    },
    render() {
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button onClick={() => this.add('New Note')}>+</button>
            </div>
        );
    }
});

export default Board;
