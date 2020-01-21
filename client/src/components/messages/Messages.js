import React, {Component} from 'react'
import { ChatkitProvider, TokenProvider} from '@pusher/chatkit-client-react'
import './Messages.css'

const instanceLocator = 'v1:us1:2a2afc79-f1b6-454b-ae89-aa398efbcf65'

const tokenProvider = new TokenProvider({
    url : 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2a2afc79-f1b6-454b-ae89-aa398efbcf65/token'
})

class Messages extends Component{

    constructor(props){
        super(props)

    }

    render(){

        return(
            
            <div className='container col-8 messages'>
                <div className='col-12 current-user'>

                </div>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-4 user-area'>

                        </div>
                        <div className='col-8 container' style={{padding : '0px'}}>
                        <div className='col-12 message-area'>

                        </div>
                        <div className='col-12 message-text-area'>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        )
        
    }
}

export default Messages