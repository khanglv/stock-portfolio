import React, {Component} from 'react';
// import * as socket from '../../project/Socket/Socket';
// import {actionCheckToken} from '../../api/api';

export default class Home extends Component{

    componentWillMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            // await actionCheckToken();
        } catch (error) {
            
        }
    }

    componentDidMount(){
        // const accountInfo = JSON.parse(localStorage.getItem('accountInfoKey'));
        // if(accountInfo){
        //     socket.connectNotify(accountInfo, ()=>{});
        // }
    }

    render(){
        return(
            <div style={styles.mainBackground}>
                
            </div>
        )
    }
}

const styles = {
    mainBackground: {
        backgroundImage: `url(${'images/background/main_dashboard.jpg'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        backgroundPosition: 'center'
    }
}