import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component
{
    render(){
      const len=this.props.len;
        const items = []
        var url = new URL(window.location.href); 
        var params = new URLSearchParams(url.search);
       //console.log(this.props.test);
       for (let i=0;i<len ; i++) {
            items.push(<li class="nav-item " key={i}>
            <Link to={`/mcq?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`} className="btn  btn-circle btn-md text-xm" style={{backgroundColor:"rgb(159, 196, 216)"}} onClick={()=>this.props.selectMCQ(i)}>{i+1}</Link>
             <hr class="sidebar-divider"></hr></li>)
             }
        return(
              <ul class="navbar-nav sidebar sidebar-dark accordion text-center "  id="accordionSidebar">
                  <li class="nav-item active">
                   <Link class="nav-link" to={`/test?name=${params.get('name')}&id=${params.get('id')}&code=${params.get('code')}`}>
                   <i class="fas fa-fw fa-tachometer-alt"></i>
                   <span>Dashboard</span></Link>
                   </li><br></br>
                  <hr class="sidebar-divider"></hr>
                {items}
              </ul>
        )
    }
}