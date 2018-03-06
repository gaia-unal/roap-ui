import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Home } from 'src/features/home/Home';

describe('home/Home', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Home {...props} />
    );

    expect(
      renderedComponent.find('.home-home').getElement()
    ).to.exist;
  });
});
