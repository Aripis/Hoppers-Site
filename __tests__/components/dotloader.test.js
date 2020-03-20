import React from 'react';
import { shallow } from 'enzyme';
import Dotloader from '../../components/dotloader'

it('should have classNames', () => {    
    const wrapper = shallow(
        <Dotloader className="test" />
    );

    let div = wrapper.find('div')

    expect(div.hasClass('dotloader test')).toEqual(true)
});

it('should NOT have classNames', () => {    
    const wrapper = shallow(
        <Dotloader />
    );

    let div = wrapper.find('div')

    expect(div.hasClass('dotloader ')).toEqual(true)
});