import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Testhistory extends Component
{
    state={
        testresult:''
    }
    componentDidMount(){
        console.log(this.location);
        this.setState({testresult:this.props.prevTest})
    }
    funcdate=(str)=>{
        str=str.split('T')
        let time=str[1].split('.')
        return(str[0]+" "+time[0]);
    }
    render()
    {
        console.log(this.props.prevTest);
        var len=this.props.prevTest.length;
        return (
            <div class="container-fluid">
                <center><h3 class="text-dark mb-4">Previous Tests Uploaded</h3></center>
                <div class="card shadow">
                    <div class="card-header py-3">
                        <p class="text-primary m-0 font-weight-bold">Test Info</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 text-nowrap">
                                <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable"><label>Show&nbsp;<select class="form-control form-control-sm custom-select custom-select-sm"><option value="10" selected="">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>&nbsp;</label></div>
                            </div>
                            <div class="col-md-6">
                                <div class="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"/></label></div>
                            </div>
                        </div>
                        <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table class="table dataTable my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>TeacherId</th>
                                        <th>Email-Id</th>
                                        <th>Test Id</th>
                                        <th>Test Name</th>
                                        <th>Date</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.prevTest.map((t,index)=>{
                                return <tr>
                                        <td>{index+1}</td>
                                        <td>{t.tid}</td>
                                         <td>{t.temail}</td>
                                        <td>{t.testid}</td>
                                        <td>{t.testName}</td>
                                        <td>{this.funcdate(t.Date)}</td>
                                        <td>{t.url}</td>
                                        {/* <td><a href={t.url}>Test Link</a></td> */}
                                        <td><Link className="page-link" to="/viewteachtest"  aria-label="Next" onClick={()=>this.props.showT(t.testid)}><span aria-hidden="true">View More»</span></Link></td>
                                    </tr>
                                  })
                               }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><strong>S.No</strong></td>
                                        <td><strong>TeacherId</strong></td>
                                        <td><strong>Email-Id</strong></td>
                                        <td><strong>Test Id</strong></td>
                                        <td><strong>Test Name</strong></td>
                                        <td><strong>Date</strong></td>
                                        <td><strong>Url</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-md-6 align-self-center">
                                {len>=10?
                                <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of {len}</p>:
                                <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to {len} of {len}</p>}
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
export default Testhistory;