import store from '../../store'
import { Provider} from 'react-redux'
import {render, waitFor} from '@testing-library/react-native';
import LotteryForm from '../Form';
import React from 'react';


describe('LotteryForm',()=>{
    it('should render submit and form fields',()=>{
        const {getByPlaceholderText,getByRole}=render(
            <Provider store={store}>
                <LotteryForm onSubmit={()=>{}} onNavigateBack={()=>{}} />
            </Provider>,
        );

        const priceInput=getByPlaceholderText('Lottery Prize')
        const nameInput=getByPlaceholderText('Lottery Name');

        const submitButton=getByRole('button',{name:'ADD'});

        waitFor(()=>{
            expect(priceInput).toBeTruthy();
            expect(nameInput).toBeTruthy();
            expect(submitButton).toBeTruthy();
        });
    });
});