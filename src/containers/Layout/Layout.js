import React,{Component} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

//Layout é um componente baseado em classe pois nele estão os componentes toolbar e o sidedrawer. então, como devemos ter uma lógica para exibir ou não o sidedrawer, precisamos gerenciar um estado para isso. Esse é o melhor componente para fazer isso.
class Layout extends Component {

    constructor(props){
        super(props);
        this.state = {
            showSideDrawer: true
        }
    }

    sideDrawerClosedHandler = () =>{
        const actualState = {...this.state};
        const newState = {...actualState, showSideDrawer: false};
        this.setState(newState);
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            const actualState = {...prevState};
            const newState = {...actualState, showSideDrawer: !actualState.showSideDrawer}
            return newState;
        });
    }

    render(){
        return(
            <React.Fragment>
                <Toolbar toggleHandler={this.sideDrawerToggleHandler}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment> 
        );
    }      
}

export default Layout;