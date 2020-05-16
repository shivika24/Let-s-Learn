import React,{Component} from 'react';
import {Link,BrowserRouter} from 'react-router-dom';
class Testhistory extends Component
{
    render()
    {
        {console.log(this.props.location.state.historydata)}
        return (
            <div></div>
        )
    }
}
export default Testhistory;