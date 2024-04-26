import React from 'react';
import { useToast } from 'react-native-toast-notifications';
import {About} from '../About'
import {Button, Linking} from 'react-native';
import {render,fireEvent, waitFor} from '@testing-library/react-native'

jest.mock('react-native-toast-notifications',()=>({
    useToast: jest.fn(),
}));

describe('About Compenent Integration Test',()=>{
    it('checking if CallStack website opens after button clicking',async()=>{
        const openURLSpy = jest.spyOn(Linking,'openURL');
        const showToastMock=jest.fn();

        (useToast as jest.Mock).mockReturnValue({
            show:showToastMock,
        });

        (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

        const {getByText}=render(<About/>);

        const button=getByText('Callstack website');
        fireEvent.press(button);

        await waitFor(()=>{});
        expect(Linking.canOpenURL).toHaveBeenCalledWith('https://www.callstack.com/',);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.callstack.com/');
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.callstack.com/');

        expect(showToastMock).not.toHaveBeenCalled();

        openURLSpy.mockRestore();
        (useToast as jest.Mock).mockRestore();
        (Linking.canOpenURL as jest.Mock).mockRestore();
    })
})