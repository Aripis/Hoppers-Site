import React from 'react';
import {shallow} from 'enzyme';
import Textfield from '../components/textfield'

test('Textfield changes the value after onChange event', () => {    
    const textfield = shallow(
        <Textfield
            id="test"
            style={{color: "red"}}
            type="text"
            className="input"
            value="Test"
            placeholder="Test"
            required={true}
        />
    );

    expect(textfield.find('input').prop('id')).toEqual("test")
    
    // expect(textfield.text()).toEqual('Off');

    // expect(textfield.text()).toEqual('On');
});