import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
class StudentAnalysis extends Component {
  render() {
    const datais = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
    return (
      <div>
        <div id="wrapper">
          <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div class="container-fluid">
                <div class="d-sm-flex justify-content-between align-items-center mb-4">
                  <Link class="nav-link h3 text-primary" to="/teacherDashboard">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </Link>
                  <a
                    class="btn btn-primary btn-sm d-none d-sm-inline-block"
                    role="button"
                    href="#"
                  >
                    <i class="fas fa-download fa-sm text-white-50"></i>
                    &nbsp;Generate Report
                  </a>
                </div>
                <div class="row">
                  <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card shadow border-left-primary py-2">
                      <div class="card-body">
                        <div class="row align-items-center no-gutters">
                          <div class="col mr-2">
                            <div class="text-uppercase text-primary font-weight-bold text-xs mb-1">
                              <span>Performance of Students</span>
                            </div>
                            <div class="text-dark font-weight-bold h5 mb-0">
                              <span>Avg</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card shadow border-left-success py-2">
                      <div class="card-body">
                        <div class="row align-items-center no-gutters">
                          <div class="col mr-2">
                            <div class="text-uppercase text-success font-weight-bold text-xs mb-1">
                              <span>Tests</span>
                            </div>
                            <div class="text-dark font-weight-bold h5 mb-0">
                              <span>1</span>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-7 col-xl-8">
                      <div class="card shadow mb-4">
                        <div class="card-header d-flex justify-content-between align-items-center">
                          <h6 class="text-primary font-weight-bold m-0">
                            {" "}
                            Overview
                          </h6>
                          <div class="dropdown no-arrow">
                            <button
                              class="btn btn-link btn-sm dropdown-toggle"
                              data-toggle="dropdown"
                              aria-expanded="false"
                              type="button"
                            >
                              <i class="fas fa-ellipsis-v text-gray-400"></i>
                            </button>
                            <div
                              class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
                              role="menu"
                            >
                              <p class="text-center dropdown-header">
                                dropdown header:
                              </p>
                              <a
                                class="dropdown-item"
                                role="presentation"
                                href="#"
                              >
                                &nbsp;Action
                              </a>
                              <a
                                class="dropdown-item"
                                role="presentation"
                                href="#"
                              >
                                &nbsp;Another action
                              </a>
                              <div class="dropdown-divider"></div>
                              <a
                                class="dropdown-item"
                                role="presentation"
                                href="#"
                              >
                                &nbsp;Something else here
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="card-body">
                          <div className="col-12">
                            <Bar
                              width={100}
                              height={40}
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
                      </div>
                    </div>
                    <div class="col-lg-5 col-xl-3">
                      <div class="card shadow mb-4">
                        <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">
                            Bar Chart
                          </h6>
                        </div>
                        <div class="card-body">
                          <div class="chart-bar">
                            <Bar
                              width={100}
                              height={40}
                              data={datais}
                              options={{
                                title: {
                                  display: true,
                                  text: "Average Rainfall per month",
                                  fontSize: 20,
                                },
                                legend: {
                                  display: true,
                                  position: "right",
                                },
                              }}
                            />
                          </div>
                          <hr></hr>
                          Styling for the bar chart can be found in the{" "}
                          <code>/js/demo/chart-bar-demo.js</code> file.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">{/* filter */}</div>
                <h3 class="text-dark mb-4">Students Report</h3>
                <div class="card shadow">
                  <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">Test </p>
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
                      <table class="table dataTable my-0" id="dataTable">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Test-Id</th>
                            <th>Student Name</th>
                            <th>Email-Id</th>
                            <th>Roll No.</th>
                            <th>Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {this.props.prevTest.map((t,index)=>{
                               return <tr>
                                       <td>{index+1}</td>
                                       <td>{t.tid}</td>
                                        <td>{t.temail}</td>
                                       <td>{t.testid}</td>
                                       <td>{t.testName}</td>
                                       <td>{this.funcdate(t.Date)}</td>
                                       <td>{t.url}</td>
                                       {/* <td><a href={t.url}>Test Link</a></td> */}
                          {/*<td><Link className="page-link" to="/viewteachtest"  aria-label="Next" onClick={()=>this.props.showT(t.testid)}><span aria-hidden="true">View More»</span></Link></td>
                                   </tr>
                                 })
                              } */}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <strong>S.No</strong>
                            </td>
                            <td>
                              <strong>Test Id</strong>
                            </td>
                            <td>
                              <strong>Student Name</strong>
                            </td>
                            <td>
                              <strong>Email Id</strong>
                            </td>
                            <td>
                              <strong>Roll No.</strong>
                            </td>
                            <td>
                              <strong>Marks</strong>
                            </td>
                          </tr>
                        </tfoot>
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
          </div>
        </div>
      </div>
    );
  }
}
export default StudentAnalysis;
