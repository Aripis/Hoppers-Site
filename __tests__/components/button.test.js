import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/button'

it('should have props', () => {    
    const wrapper = shallow(
        <Button
            id="test" 
            style={{color: "red"}}
            type="submit"
        >
            Test
        </Button>
    );

    let button = wrapper.find('button')
    let span = wrapper.find('span')

    expect(button.prop('id')).toEqual('test')
    expect(button.prop('style')).toHaveProperty('color', 'red')
    expect(button.prop('type')).toEqual('submit')
    expect(span.prop('children')).toEqual('Test')
});

it('should be loading and have classNames', () => {    
    const wrapper = shallow(
        <Button
            className="test"
            loading
        >
            Test
        </Button>
    );

    let button = wrapper.find('.button')
    let span = wrapper.find('span')

    expect(button.hasClass('button test')).toEqual(true)
    expect(span.prop('style')).toHaveProperty('visibility', 'hidden')
});

it('should NOT be loading and NOT have classNames', () => {    
    const wrapper = shallow(
        <Button>
            Test
        </Button>
    );

    let button = wrapper.find('.button')
    let span = wrapper.find('span')

    expect(button.hasClass('button ')).toEqual(true)
    expect(span.prop('style')).toHaveProperty('visibility', 'visible')
});