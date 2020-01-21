import React,{Component} from 'react'
import {Link} from 'react-router-dom'




const SearchDropdown = (props)=>{

    const {profiles, posts} = props.searchResult
    console.log(props.searchResult)




    return (
        <div className='container ' 
            style={{
                position:'absolute',
                backgroundColor : 'white',
                padding : '0px',
                zIndex : '1'
            }}>
            {/* {
                posts.length === 0 && profiles.length === 0
                ?
                <div>No result found</div>
                :
                null
            } */}
            {
                posts && posts.length > 0 
                ?
                <div className='container' 
                    style={{
                        padding :'0px',
                        borderBottom : '1px solid gray'
                    }}>
                    <div className='container'>
                        <div className='row'>
                            {/* <div className='col-1 ' style={{
                                borderRadius : '5px',
                                // backgroundColor : 'grey',
                                justifyContent : 'center'
                            }}>
                            <i class="fas fa-hashtag"></i>
                            </div> */}
                            <div className='col-10'>
                            <Link  onClick= {props.onClick} to={`/feed/${props.search}`}>
                            <i class="fas fa-hashtag"></i>
                                <span style={{marginLeft : '10px'}}>{props.search}</span>
                                </Link>
                            </div>
                            <div className='col'>
                                {/* <div>{profile.name}</div> */}
                                <div>
                                    <small>{posts.length} {posts.length > 1 ? 'posts' : 'post'} found</small>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div> 
                :
                null
            }

            {
                profiles && profiles.length > 0
                ?
                profiles.map(profile => {
                    console.log(profile)
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col-2'>
                                    <img src={profile.avatar}/>
                                </div>
                                <div className='col-10'>
                                    <div>{profile.name}</div>
                                    <div>
                                        <Link  onClick= {props.onClick} to={`/profile/${profile.handle}`}>@{profile.handle}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                null
            }
        </div>
    )
}

export default SearchDropdown