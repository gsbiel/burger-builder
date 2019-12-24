import React,{Component} from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

//Em React, um modal é basicamente um componente que envelopa qualquer tipo de conteúdo que é passado a ele como argumento.
// Esse componente era baseado em função, mas o professor trocou para classe com o objetivo de implementar o método shouldComponentUpdate. Você poderia ter mantido o mesmo como função e ter usado o React.Memo para obter o mesmo resultado.
class Modal extends Component{

    // Aqui estamos configurando o Modal para ser atualizado apenas quando o props.show ou quando o props.children for alterado
    //O props.show indica se o
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} clickBackdrop={this.props.modalClose}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;