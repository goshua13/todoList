import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { addTask, removeTask } from '../actions';

import { connect } from 'react-redux';

class TasksNew extends Component {

    renderField(field){
        return(
        <div className='form-group'>
            <label>Enter Tasks</label>
            <input 
            className='form-control'
            type='text'
            {...field.input}
            />
        </div>
        )
    }

    submitDis(value) {
        console.log(value)
        this.props.addTask(value.disInput);
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div>
                <Link className='btn btn-danger' to='/'>
                    Back to Tasks
                </Link>
                <form onSubmit = {handleSubmit(this.submitDis.bind(this))}>               
                    <Field 
                        name = 'disInput'
                        component = {this.renderField}
                        />
                </form>
                <div>
                    {
                        this.props.tasks.map(task => {
                            return <div onClick={() => this.props.removeTask(task)} key={Math.random()}>{task}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const tasks = state.task.tasks;
    return { tasks }
}


TasksNew = connect(mapStateToProps, { addTask, removeTask })(TasksNew);

TasksNew = reduxForm({
    form: "NewTaskForm"
})(TasksNew);

export default TasksNew;
