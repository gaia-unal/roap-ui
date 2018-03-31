import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UserValidate } from 'src/features/home/UserValidate';

describe('home/UserValidate', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserValidate {...props} />
    );

    expect(
      renderedComponent.find('.home-user-validate').getElement()
    ).to.exist;
  });
});
