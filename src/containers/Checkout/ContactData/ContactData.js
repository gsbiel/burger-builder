import React,{Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Buttton/Button';
import classes from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state={
        name:'',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        //Esse método configura o evento de se clicar no botão de submit do formulário. Uma coisa a se saber, ao se clicar em um botão dentro de um <form> uma requisição será feita e a página vai ser recarregada. Como não desejamos isso, temos que prevenir o comportamento padrão do <form> para que não percamos os dados do estado do componente que possui o <form>.
        event.preventDefault();

        //Ao clicar no botão Continue, o Spinner deve ser exibido até que a requisição seja completada.
        this.setState({loading:true});

        //Para comunicar com um backend no FireBase, é preciso colocar o formato do dado que vai ser associado à diretiva, nesse caso, a diretiva é /post e o formato é json.
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer:{  // Essa parte é Dumb Code só para deixar o pedido mais realista.
                name: 'Max',
                address:{
                    street: 'TestStreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                // Após a requisição, devemos tanto remover o Spinner quanto o Modal
                this.setState({loading:false});
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false});
            });

    }

    render(){

        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button clickButton={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form=(
                <Spinner />
            );
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}   
            </div>
        );
    }
}

export default ContactData;