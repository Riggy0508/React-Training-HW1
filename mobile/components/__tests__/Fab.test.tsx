import Fab from '../Fab'
import React from 'react'
import {render,fireEvent} from '@testing-library/react-native'

jest.mock('@expo/vector-icons');

describe('Fab',()=>{
    it('should call onPress',()=>{
        const onPressMock=jest.fn();
        const {getByTestId}=render(<Fab onPress={onPressMock}/>);
        const fab =getByTestId('fab');
    })
    
    it('should render the FAB component',()=>{
        const onPressMock=jest.fn();
        const {getByTestId}=render(<Fab onPress={onPressMock}/>);
        const fab = getByTestId('fab');
        expect(fab).toBeTruthy();
        
        fireEvent.press(fab);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    })
})
