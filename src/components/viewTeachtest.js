import React,{Component} from 'react';
import { Bar,Doughnut  } from "react-chartjs-2";
import { Link } from "react-router-dom";
import './viewtest.css';
class ViewTeachTest extends Component
{
    state={
        testdata:[],
        marks:[],
        stid:[],
        datatable:'',
        flag:false
    }
    componentDidMount(){
        this.dataget();
        console.log(this.props.viewtid)
        console.log(this.props.tidis)
    }
     dataget=()=>{
            const user={
            testid:this.props.tidis
            //testid:'C'
            }
            fetch("http://localhost:8082/viewtestdatafile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body:JSON.stringify(user)
              })
            .then(res=> res.json())
              .then(res => {
                this.setState(prevState => ({
                    testdata: [...prevState.testdata, res.code]
                  }))
                console.log(this.state.testdata);
                
                var arrmarks=[],stuid=[]
                for(var i=0;i<this.state.testdata[0].length;i++)
                {
                    arrmarks.push(this.state.testdata[0][i].marks)
                    stuid.push(this.state.testdata[0][i].semail.split('@')[0])
                }
                this.setState(prevState => ({
                    marks: [...prevState.marks, arrmarks]
                  }))
                this.setState(prevState => ({
                    stid: [...prevState.stid, stuid]
                  }))
                //   console.log(this.state.stid[0]);
                this.setState({flag:true})
              })
    }
   
    tablecreate = () =>{
        console.log(this.state.testdata[0]);
        const doubled = this.state.testdata[0].map((number,index) => 
        <tr key={index+1}>
            <td>{index+1}</td>
            <td>{number.testid}</td>
            <td>{number.semail}</td>
            <td>{number.marks}</td>
        </tr>
       );
       return doubled;
      
      
    }
    
    render()
    {
     
        let arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
      console.log(this.state.marks[0]?this.state.marks[0][0]:0);
      let avgval=0,maxval=0,minval=0;
      if(this.state.marks[0])
      {
        avgval=arrAvg(this.state.marks[0])
        maxval=Math.max(...this.state.marks[0])
        minval=Math.min(...this.state.marks[0])
      }
      
      // let avgval=arrAvg(this.state.marks[0]),maxval=Math.max(...this.state.marks[0]),minval=Math.min(...this.state.marks[0])
      // this.state.stid?this.state.stid:['a','b','c']
      const val=this.state.stid[0];
      const datais = {
            labels:val?val:"['a','b']",
            datasets: [
              {
                label:'Marks',
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data:this.state.marks[0],
              },
            ],
          };
        console.log(datais.datasets[0].data)
         const nutdata = {
            labels: ['max','min','avg'],
            datasets: [{
              data: [maxval,minval,avgval] ,
              backgroundColor: ['#2196f38c', '#f443368c', '#3f51b570'],
          }],
          labels: ['max','min','avg'],
          };

        if(this.props.prevTest){
        var len=this.props.prevTest.length;
        console.log(this.props.prevTest)
        return (
            <div>
            <div>
        <div>
        <div id="wrapper">
                <div className="row">
                    <div className="col-12 col-md-6" style={{width:"50vw"}}>
                            <div>
                            <Bar
                              data={datais}
                              options={{
                                title: {
                                  display: true,
                                  text: "Recent Test Analysis",
                                  fontSize: 20,
                                },
                                legend: {
                                  display: true,
                                  position: "right",
                                },
                              }}
                            />
                      </div>
                    </div>
                    <div className="col-12 col-md-6"  style={{width:"40vw"}}>
                       <div>
                       <Doughnut
                              data={nutdata}
                            />
                       </div>
                      </div>
                    </div>
                </div>
                    
                <div class="row">{/* filter */}</div>
                <h3 class="text-dark mb-4">Students Report</h3>
                <div class="card shadow">
                  <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">Student List </p>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6 text-nowrap">
                        <div
                          id="dataTable_length"
                          class="dataTables_length"
                          aria-controls="dataTable"
                        >
                          <label>
                            Show&nbsp;
                            <select class="form-control form-control-sm custom-select custom-select-sm">
                              <option value="10" selected="">
                                10
                              </option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div
                          class="text-md-right dataTables_filter"
                          id="dataTable_filter"
                        >
                          <label>
                            <input
                              type="search"
                              class="form-control form-control-sm"
                              aria-controls="dataTable"
                              placeholder="Search"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      class="table-responsive table mt-2"
                      id="dataTable"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
                      
                      <table class="table dataTable my-0" id="dataTable">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Test-Id</th>
                            <th>Email-Id</th>
                            <th>Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.flag?this.tablecreate():"no"}
                        </tbody>
                        
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-md-6 align-self-center">
                        <p
                          id="dataTable_info"
                          class="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 10 of 10
                        </p>
                      </div>
                      <div class="col-md-6">
                        <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                          <ul class="pagination">
                            <li class="page-item disabled">
                              <a
                                class="page-link"
                                href="#"
                                aria-label="Previous"
                              >
                                <span aria-hidden="true">«</span>
                              </a>
                            </li>
                            <li class="page-item active">
                              <a class="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">»</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
      
            <div class="container-fluid">
                
                <div class="card shadow">
                    <div class="card-header py-3">
                        <p class="text-primary m-0 font-weight-bold">Test Paper</p>
                    </div>
                    <div class="card-body">
                        
                        <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table class="table dataTable my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Ques</th>
                                        <th>Option 1</th>
                                        <th>Option 2</th>
                                        <th>Option 3</th>
                                        <th>Option 4</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.prevTest.map((t,index)=>{
                                return <tr>
                                        <td>{t.sno}</td>
                                        <td>{t.question}</td>
                                         <td>{t.option1}</td>
                                        <td>{t.option2}</td>
                                        <td>{t.option3}</td>
                                        <td>{t.option4}</td>
                                        <td>{t.answer}</td>
                                    </tr>
                                  })
                               }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
                                
        )
        }
        else
        {
            console.log("loading")
        }
    }
}
export default ViewTeachTest;
/*
<div class="py-3 ">
                        <h4>Fillters</h4>
                        <div className="row p-3">
                          <select className="col-2 form-control">
                            <option>Year</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                          <select className="col-2 form-control">
                            <option>Test</option>
                            <option>Test1</option>
                            <option>Test2</option>
                            <option>Test3</option>
                            <option>Test4</option>
                          </select>
                          <input
                            type="text"
                            className="col-3 form-control"
                            placeholder="student Name"
                          />
                          <input
                            type="Email"
                            className="col-3 form-control"
                            placeholder="student Email"
                          />
                          <input
                            type="RollNo"
                            className="col-2 form-control"
                            placeholder="student RollNo"
                          />
                        </div>
                      </div>
*/