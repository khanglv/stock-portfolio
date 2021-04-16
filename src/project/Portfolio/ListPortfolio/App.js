import React, {Component} from 'react';
import FirstHeaderChil from '../../FirstHeaderChil';

import {connect} from 'react-redux';

import ListPortfolio from './ListPortfolio';
import PortfolioInvesting from './PortfolioInvesting';

import {css} from 'emotion';

const mainTrading = css`
    height: calc(100vh - 85px);
    padding-top: 10px;
    padding-bottom: 1em;
    padding-right: 12vw;
    padding-left: 12vw;
    overflow: auto;
    @media only screen and (max-width: 1600px) {
        height: calc(100vh - 100px);
        padding-top: 10px;
        padding-right: 10vw;
        padding-left: 10vw;
        padding-bottom: 1em;
    }

    @media only screen and (max-width: 1200px) {
        height: calc(100vh - 100px);
        padding-top: 10px;
        padding-right: 5vw;
        padding-left: 5vw;
        padding-bottom: 1em;
    }
    
    @media only screen and (max-width: 992px) {
        padding-right: 0.5rem;
        padding-left: 0.5rem;
        padding-bottom: 1em;
        height: auto;
        overflow: hidden;
    }
`

class AppListPortfolio extends Component{
    constructor(props){
        super(props);
        this.state= {
            
        }
    }

    componentWillMount(){
        this.props.setDefaultNumberPage();
    }

    render(){

        return(
            <div>
                <FirstHeaderChil />
                <div className={mainTrading}>
                    {(() => {
                        switch (this.props.numberDetailPage) {
                            case 1:
                                return <ListPortfolio />;
                            case 2:
                                return <PortfolioInvesting />;
                            default:
                                return ;
                        }
                    })()}  
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        numberDetailPage: state.portFolio['NUMBER.LIST_PORTFOLIO.PAGE']
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        setDefaultNumberPage: ()=> dispatch({
            type: 'NUMBER.LIST_PORTFOLIO.PAGE',
            data: 1
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppListPortfolio);