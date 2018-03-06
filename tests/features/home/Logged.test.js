import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Logged } from 'src/features/home';

describe('home/Logged', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Logged />
    );

    expect(
      renderedComponent.find('.home-logged').getElement()
    ).to.exist;
  });
});
