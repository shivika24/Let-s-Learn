import React, { Component } from 'react';

class ViewTestanalysis extends Component {
    state={
        testpaper:null,
        answers:null,
        result:null
    }
    componentDidMount(){
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
        var testid=params.get('id')
        console.log(testid)
        
        const user={
             testid:testid,
             email:JSON.parse(localStorage.getItem("jwt")).user.id
            //email:'shivikasingla12@gmail.com'
          }
          console.log(user)
          fetch("http://localhost:8082/viewTestanalysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(res => {
            if(res.data==null)
            {
              alert("not run");
            }
            else
            {
            this.setState({testpaper:res.data})
             console.log(this.state.testpaper);
             fetch("http://localhost:8082/studenttestparticular", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
              })
                .then(res => res.json())
                .then(res => {
                  if(res.data==null)
                  {
                    alert("not run");
                  }
                  else
                  {                   
                   this.setState({answers:res.data[0].answers.split("*")})
                   this.setState({result:res.data[0].marks})
                   console.log(this.state.answers);

                  }
                }); 
            }
          }); 
    }
    render() {
        return (
            <div>
              <center><h1 style={{color:"#0e8dca"}}>TEST RESULT</h1></center>
                <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table class="table dataTable my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Your Answer</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.testpaper&&this.state.answers?this.state.testpaper.map((t,index)=>{
                                return <tr>
                                        <td>{index+1}</td>
                                        <td>{t.question}</td>
                                         <td>{t.answer}</td>
                                        <td>{this.state.answers[index]}</td>
                                        <td>{parseInt(t.answer)==parseInt(this.state.answers[index]) ? "true":"false"}</td>
                                    </tr>
                                  }):<div>loding...</div>
                               }
                                </tbody>
                                
                            </table>
                        </div>
                        
            </div>
        );
    }
}

export default ViewTestanalysis;