import React,{Component} from 'react';
class Testdatainsert extends Component
{
    constructor(){
        super();
        this.state={
            arr:[],
            testid:'',
            testname:'',
            flag:false
        }
    }
    componentDidMount(){
        document.getElementById('onmodal').click();
    }
     add=()=>{
        let q=document.getElementById('ques').value;
        let a=document.getElementById('op1').value;
        let b=document.getElementById('op2').value;
        let c=document.getElementById('op3').value;
        let d=document.getElementById('op4').value;
        let r=document.getElementById('op5').value;
        // this.setState({ arr:[this.ind,q,a,b,c,d,r] });
        console.log(q,a,b,c,d,r);
        if(q && a && b &&c && d && r)
        {
            this.setState(prevState => ({
                arr: [...prevState.arr, [q,a,b,c,d,r] ]
              }))
            alert("added");
        }
        else{
            alert("fill all data");
        }
    }
    submit=()=>{
        console.log(this.state.arr);
        fetch(`http://localhost:8082/handleFile?temail=${JSON.parse(localStorage.getItem("jwt")).user.id}`,{
            method:"POST",
            headers:{
             Accept: "application/json",
               "Content-Type":"application/json",
               },
            body:JSON.stringify(this.state.arr)
         })
         .then(res => {
            if(res.ok){
                return res.json();
            }
         })
         .then(res => {
        //    alert(JSON.stringify(res));
        // alert("http://localhost:3000/testlogin/?name="+this.state.testid+"&id="+JSON.parse(localStorage.getItem("jwt")).user.id+"&code="+this.state.testName);
           window.location="http://localhost:3000/teacherDashboard";
         });   
    }
    handleCancel1=()=>{
        window.location="http://localhost:3000/teacherDashboard";
      }
    setFlag=(e)=>{
        //console.log(e);
        var tn=document.getElementById("testname").value;
         this.setState({testid:e,testName:tn},()=>{
         var obj={testid:this.state.testid,testname:this.state.testName};
         console.log(this.state.testid+" "+this.state.testName);
         fetch("http://localhost:8082/testid",{
          method:"POST",
          headers:{
           Accept: "application/json",
             "Content-Type":"application/json",
             },
          body:JSON.stringify(obj)
       })
       .then(res => res.json())
          .then(res => {
            if(res.resType === 1)
           {
            this.setState({flag:true})
            if(tn && e)
            {
                document.getElementById('close').click();
            }
           }
        else 
        {
            console.log(res.resType);
           alert("Please enter another key.This key already exists!!!");
        }
       });  
      })
         //this.setState({flag:true})
       }
    render()
    {
    return(
        <div>
        <div className="row">
    <div className="col">
        <div className="card shadow mb-3">
            <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">Test ID : {this.state.testid} </p>
                <p className="text-primary m-0 font-weight-bold">Test Name : {this.state.testName}</p>
            </div>
            <div className="card-body">
                <h3>Upload question</h3>
                <div>
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group"><label ><strong>Question</strong></label><input type="text" className="form-control" id="ques" placeholder="user.name" name="Question" /></div>
                        </div>
                        <div className="col-4">
                            <div className="form-group"><label><strong>Answer</strong></label><input type="text" className="form-control" id="op5" placeholder="Correct Answer" name="Correct Answer" /></div>
                        </div>
                    </div>
                    <div className="form-row mt-2">
                    <div className="col-6 col-md-3">
                        <div className="form-group"><label ><strong>Option A</strong></label><input type="text" className="form-control" id="op1" placeholder="Option 1" name="Option1" /></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-group"><label ><strong>Option B</strong></label><input type="text" className="form-control"  id="op2" placeholder="Option 2" name="Option2" /></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-group"><label ><strong>Option C</strong></label><input type="text" className="form-control"  id="op3" placeholder="Option 3" name="Option2" /></div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="form-group"><label ><strong>Option D</strong></label><input type="text" className="form-control"  id="op4" placeholder="Option 4" name="Option2" /></div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                    <a className="btn btn-danger btn-icon-split mr-2" role="button" onClick={()=>this.add()}><span className="text-white-50 icon"><i className="fa fa-plus"></i></span><span className="text-white text">Add</span></a>
                    <a className="btn btn-info btn-icon-split" role="button" onClick={()=>this.submit()}><span className="text-white-50 icon"><i className="fa fa-upload"></i></span><span className="text-white text">Submit</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <div className="card shadow">
    <div className="card-header py-3">
        <p className="text-primary m-0 font-weight-bold">Uploaded Questions</p>
    </div>
    <div className="card-body">
        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <table className="table dataTable my-0" id="dataTable">
                <thead>
                    <tr>
                        <th style={{width: "5%"}}>S.no</th>
                        <th style={{width: "20%"}}>Questions</th>
                        <th style={{width: "15%"}}>Option A</th>
                        <th style={{width: "15%"}}>Option B</th>
                        <th style={{width: "15%"}}>Option C</th>
                        <th style={{width: "15%"}}>Option D</th>
                        <th style={{width: "15%"}}>Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.arr.map((data,index) =>
                    <tr key={index} id={'tdcol'+index}>
                    <td>{index+1}</td>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}</td>
                    <td>{data[4]}</td>
                    <td>{data[5]}</td>
                    </tr>
                    )}
                   
                </tbody>
            </table>
        </div>
    </div>
</div>
<button type="button" className="btn btn-primary" id="onmodal" data-toggle="modal" data-target="#exampleModal" style={{display:"none"}}>
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Test Details</h5>
        <button type="button" className="close" data-dismiss="modal" id="close" aria-label="Close" style={{display:"none"}}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <input type="text" className="form-control" id="testId" placeholder="Enter Test Id" required/>
     <input type="text" className="form-control" id="testname" placeholder="Enter Test Name" required/>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" type="button" data-dismiss="modal" onClick={this.handleCancel1}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>this.setFlag(document.getElementById("testId").value)}>Next</button>
      </div>
    </div>
  </div>
</div>

</div>
    )
    }
}
export default Testdatainsert;