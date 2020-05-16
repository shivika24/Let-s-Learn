import React,{Component} from 'react';
import Calendar from 'react-calendar';
 import 'react-calendar/dist/Calendar.css';
import { stringify } from 'csv';

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

    onChange = (d) =>
    { 
         this.setState ( { date:d } )
         console.log(d);

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
            <div className="row">
                <div className="col-12 col-md-7">
                {this.addData()}
                {this.eventDisplay()}
                <Calendar  onChange = {this.onChange}  value = {this.state.date} />  
                </div>
                <div className="col-12 col-md-5" style={{overflow:"scroll"}}>
                <ul class="list-group">
                <li class="list-group-item active btn" data-toggle="modal" data-target="#exampleModal">Add Event</li>
                <li class="list-group-item active">{this.state.date.toLocaleDateString().toString()}</li>

                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.date.toLocaleDateString().toString()}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input type="text" className="form-control" placeholder="Write your event..."/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        )
    }

}
export default Calender;
/*<h2>You Have Event <i>{this.state.eventname} </i>on this Date </h2>*/