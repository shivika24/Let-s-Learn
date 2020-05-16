import React,{Component} from 'react';
import {Link,BrowserRouter} from 'react-router-dom';
class Testhistory extends Component
{
    componentDidMount(){
        console.log(this.location);
    }
    render()
    {
        return (
            <div></div>
        )
    }
}
export default Testhistory;