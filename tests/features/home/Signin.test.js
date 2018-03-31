import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Signin } from 'src/features/home/Signin';

describe('home/Signin', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Signin {...props} />
    );

    expect(
      renderedComponent.find('.home-signin').getElement()
    ).to.exist;
  });
});
