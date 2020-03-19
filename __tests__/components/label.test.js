import React from 'react';
import { shallow } from 'enzyme';
import Label from '../../components/label'

it('should have props', () => {    
    const wrapper = shallow(
        <Label 
            id="test"
            style={{color: "red"}}
            htmlFor="test"
            content="Test"
            on="input" 
        />
    );

    let label = wrapper.find('label')

    expect(label.prop('id')).toEqual('test')
    expect(label.prop('style')).toHaveProperty('color', 'red')
    expect(label.prop('htmlFor')).toEqual('test')
    expect(label.prop('children')).toEqual('Test')
});

it('should have classNames, error and required', () => {    
    const wrapper = shallow(
        <Label 
            className="test"
            required
            error
        />
    );

    let label = wrapper.find('label')

    expect(label.hasClass('label required error test')).toEqual(true)
});

it('should NOT have classNames, error and required', () => {    
    const wrapper = shallow(
        <Label />
    );

    let label = wrapper.find('label')

    expect(label.hasClass('label  ')).toEqual(true)
});