import React from 'react';
import { shallow } from 'enzyme';
import Product from '../../components/product'

it('should have props', () => {    
    const wrapper = shallow(
        <Product
            // id={product.id}
            image="test"
            name="Test"
            price={200}
            currency="лв"
            available
        />
    );

    let cardImage = wrapper.find('.card-image')
    let contentName = wrapper.find('.content-name')
    let infoPrice = wrapper.find('.info-price')
    let contentAvailable = wrapper.find('.content-available')

    expect(cardImage.prop('style')).toHaveProperty('backgroundImage', "url('test')")
    expect(contentName.prop('children')).toEqual('Test')
    expect(contentAvailable.prop('children')).toEqual('in stock')
});

it('should have classNames', () => {    
    const wrapper = shallow(
        <Product className="test" />
    );

    let wrpCard = wrapper.find('.wrp-card')

    expect(wrpCard.hasClass('wrp-card test')).toEqual(true)
});

it('should NOT have classNames', () => {    
    const wrapper = shallow(
        <Product />
    );

    let wrpCard = wrapper.find('.wrp-card')

    expect(wrpCard.hasClass('wrp-card ')).toEqual(true)
});