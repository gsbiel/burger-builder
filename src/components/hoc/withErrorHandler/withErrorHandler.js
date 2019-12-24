import React,{Component} from 'react';

import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.state = {
                error: null
            }
        }

        componentWillMount(){
            // Criando os interceptors
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(res => res,error=>{
                this.setState({error: error});
            }); 
        }

        componentWillUnmount(){
            // Removendo os interceptors:
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }
        render(){
            return( <React.Fragment>
                        <Modal 
                            show={this.state.error}
                            modalClose={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </React.Fragment>
            )}
    }
}

export default withErrorHandler;