import React, {Component} from 'react';

import {connect} from 'react-redux';

import {css} from 'emotion';

const rootMain = css`
    
`

class PortfolioInvesting extends Component{
    constructor(props){
        super(props);
        this.state= {
            
        }
    }

    render(){
        return(
            <div className={rootMain}>
                Hahaa
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        numberDetailPage: state.portFolio['NUMBER.DETAIL.PAGE']
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setDefaultNumberPage: ()=> dispatch({
            type: 'NUMBER.DETAIL.PAGE',
            data: 1
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PortfolioInvesting);