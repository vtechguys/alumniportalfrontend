import React,{ Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import TextFieldGroup from './../common/TextFieldGroup'
import {searchKeyword,emptySearchResult } from '../../actions/searchActions'
import SearchDropdown from './search-dropdown'


class Search extends Component {

    constructor(props){
        super()
        this.state = {
            search : '',
            error  : '',
            
        }
    }

    onChange = (e)=>{
        
        const route = this.props.route
        console.log(route)
        const key = route === 'profiles' ? 'profile' : 'post'

        this.setState({
            [e.target.name] : e.target.value
        },()=>{
            this.props.searchKeyword({keyword : this.state.search, timestamp: new Date(), key })
        })

    }
    onClickRouteChangeHandler = () =>{
        this.setState({
            search: ''
        });
        this.props.emptySearchResult()
    }
    render(){
        console.log(this.props.search);
        return (
            <div className='col-md-12'>
                <div className='row'>
                    <div className='col'>
                        <TextFieldGroup
                        name='search'
                        placeholder={'Search Something ...'}
                        value={this.state.search}
                        type='text'
                        onChange={this.onChange}
                        error={this.state.error}
                        />
                        {
                            Object.keys(this.props.search.result).length > 0
                            ?
                            <SearchDropdown search={this.state.search} searchResult={this.props.search.result} onClick = {this.onClickRouteChangeHandler}/>
                            :
                            null 
                        }
                       
                 </div>
                <button className='btn btn-sm'>Search</button>
            </div>
         </div>
         )
    }

}

const mapStateToProps = state =>({
    search : state.search
})
export default withRouter(connect(mapStateToProps, {searchKeyword, emptySearchResult})(Search))

