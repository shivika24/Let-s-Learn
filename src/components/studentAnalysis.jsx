import React,{Component} from 'react';
import { Bar } from 'react-chartjs-2';
class StudentAnalysis extends Component{
    render(){
        const datais = {
            labels: ['January', 'February', 'March',
                     'April', 'May'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
              }
            ]
        }
        return(
            <div>
                <div className="row">

                <div className="col-12" >
                <Bar 
                width={100}
                height={40}
          data={datais}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
                </div>

                </div>
                <div className="row">
                    <div className="col-12">
                        Students
                    </div>
                </div>
                <div class="card shadow ">
    <div class="card-header py-3 ">
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
            <input type="text" className="col-3 form-control"  placeholder="student Name"/>
            <input type="Email" className="col-3 form-control"  placeholder="student Email"/>
            <input type="RollNo" className="col-2 form-control"  placeholder="student RollNo"/>

        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 text-nowrap">
                <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable"><label>Show <select class="form-control form-control-sm custom-select custom-select-sm"><option value="10" selected>10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>
            </div>
        </div>
        <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <table class="table dataTable my-0" id="dataTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img class="rounded-circle mr-2" width="30" height="30" src="avatars/avatar1.jpeg" />Airi Satou</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                        <td>33</td>
                        <td>2008/11/28</td>
                        <td>$162,700</td>
                    </tr>
                </tbody>
               
            </table>
        </div>
        <div class="row">
            <div class="col-md-6 align-self-center">
                <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
            </div>
            <div class="col-md-6">
                <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                    <ul class="pagination">
                        <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
            </div>
        )
    }
}
export default StudentAnalysis;