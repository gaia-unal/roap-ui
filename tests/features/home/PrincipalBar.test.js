import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PrincipalBar } from 'src/features/home/PrincipalBar';

describe('home/PrincipalBar', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PrincipalBar {...props} />
    );

    expect(
      renderedComponent.find('.home-principal-bar').getElement()
    ).to.exist;
  });
});
