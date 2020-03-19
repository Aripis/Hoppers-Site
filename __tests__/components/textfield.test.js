import React from 'react';
import { shallow } from 'enzyme';
import Textfield from '../../components/textfield'

it('should have props', () => {    
    const wrapper = shallow(
        <Textfield
            id="test"
            style={{color: "red"}}
            type="text"
            value="Test"
            required
            placeholder="Test"
            label="Test"
        />
    );

    let input = wrapper.find('.input')

    expect(input.prop('id')).toEqual('test')
    expect(input.prop('style')).toHaveProperty('color', 'red')
    expect(input.prop('type')).toEqual('text')
    expect(input.prop('value')).toEqual('Test')
    expect(input.prop('placeholder')).toEqual('Test')
    expect(input.prop('required')).toEqual(true)
});

it('should have classNames and error', () => {    
    const wrapper = shallow(
        <Textfield
            className="test"
            error
        />
    );

    let input = wrapper.find('.input')

    expect(input.hasClass('input error test')).toEqual(true)
});

it('should NOT have classNames and error', () => {    
    const wrapper = shallow(
        <Textfield />
    );

    let input = wrapper.find('.input')

    expect(input.hasClass('input  ')).toEqual(true)
});