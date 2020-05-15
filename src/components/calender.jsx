import React,{Component} from 'react';
import Calendar from 'react-calendar';
 import 'react-calendar/dist/Calendar.css';

class Calender extends Component{
   constructor()
   {
    super();
    this.eventDisplay=this.eventDisplay.bind(this);
    this.addData=this.addData.bind(this);

    this.state = {
        date : new Date(),
        eve :[
            {
                date:13,
                month:5,
                eventname:'Java Mock Test',
                description:'good event'
            },
            {
                date:30,
                month:5,
                eventname : 'Infosys Mock Test',
                description : 'Good Event'
            }
        ],
        eventname : 'none',
        p:0,
    }
   } 

    eventDisplay()
    {
        console.log("hii");
        this.state.eventname = 'none';

        const date1 = this.state.date.getDate();
        const month1 = this.state.date.getMonth()+1;

        this.state.eve.map( e => {
            if( e.date==date1 && e.month==month1 )
            {
                this.state.eventname = e.eventname
            }
        })
    }

    onChange = d =>
    { 
         this.setState ( { date:d } )
    }    
    
    addData()
    {
        var obj=
        {
         date:0,
         month:0,
         eventname:'',
         description:'',
        }

        if(this.props.h1 == 1)
        {
            obj.date = this.props.date1;
            obj.month = this.props.month1;
            obj.eventname = this.props.eventname1;
            obj.description = this.props.description1;
           
            this.state.eve.push(obj);
            console.log(this.state.eve);
            this.props.changeflag1();

        }
    }

    render() {
        return (
            <div>
                {this.addData()}
                {this.eventDisplay()}
                <Calendar  onChange = {this.onChange}  value = {this.state.date}/>                
            </div>
        )
    }

}
export default Calender;
/*<h2>You Have Event <i>{this.state.eventname} </i>on this Date </h2>*/