import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../components/message'

it('should have props', () => {    
    const wrapper = shallow(
        <Message 
            visible 
            header="An error occurred"
            content="Test"
        />
    );

    let header = wrapper.find('.header')
    let content = wrapper.find('.content')

    expect(header.prop('children')).toEqual('An error occurred')
    expect(content.prop('children')).toEqual('Test')
});

it('should have classNames, success and error', () => {    
    const wrapper = shallow(
        <Message 
            visible 
            success
            error
            className="test"
        />
    );

    let message = wrapper.find('.message')

    expect(message.hasClass('message success error test')).toEqual(true)
});

it('should NOT have classNames, success and error', () => {    
    const wrapper = shallow(
        <Message visible />
    );

    let message = wrapper.find('.message')

    expect(message.hasClass('message   ')).toEqual(true)
});