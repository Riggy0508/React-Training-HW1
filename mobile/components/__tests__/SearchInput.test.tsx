import React from 'react';
import {render, fireEvent} from '@testing-library/react-native'
import Search from '../SearchInput'

jest.mock('expo-font');


describe('Search',()=>{
    it('display value in input field',()=>{
        const{getByLabelText}=render(
            <Search value='sample text' onSearch={()=>{}}/>,
        )
        const input=getByLabelText('Text input field');
        expect(input.props.value).toBe('sample text');
    })

    it('render the search component',()=>{
        const { getByLabelText } = render(<Search value="" onSearch={() => {}} />);
        const input = getByLabelText('Text input field');
        expect(input).toBeTruthy();
  })
})
