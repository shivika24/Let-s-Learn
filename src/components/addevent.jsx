import React,{Component} from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom';

class Addevent extends Component
{
    constructor()
    {
        super();
        this.state = { 
            date : new Date(),

        }
    }

    onChange = d =>
    { 
         this.setState ( { date:d } )

    } 
    handleSubmit = event => {

        event.preventDefault();
               
        var obj={
            date:'',
            month:'',
            eventname:'',
            description:'',
          }
        
          obj.eventname = document.getElementById("1").value;
          obj.description = document.getElementById("2").value;
          obj.date=this.state.date.getDate();
          obj.month=this.state.date.getMonth()+1;
         
          this.props.onAddEvent(obj);
    }

    render() {
        return (
            <div>
                 
                <h1>Add Event</h1>
                <Calendar  onChange = {this.onChange}  value = {this.state.date}    />
                
                <form onSubmit = {this.handleSubmit} >

                              <label> EventName</label><br/>
                              <input id = "1" type = "text" /> <br/>

                              <label> Description</label><br/>
                              <textarea id = "2" rows="7" cols="50" type = "text" /><br/>

                              <input type="submit" value = "POST"></input>

               </form>
               
               <Link to="/calendar">Confirm Here Again</Link>

            </div>
        )
    }
}

export default Addevent;