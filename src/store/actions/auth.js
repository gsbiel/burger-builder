import {
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS
} from './actionTypes';

import {
    getApiKey
} from '../../Firebase';

import axios from 'axios';

const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${getApiKey()}`;

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post(AUTH_URL, authData)
            .then(resp => {
                console.log(resp.data);
                dispatch(authSuccess(resp.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail());
            });
    };
};