import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UserList } from 'src/features/home/UserList';

describe('home/UserList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserList {...props} />
    );

    expect(
      renderedComponent.find('.home-user-list').getElement()
    ).to.exist;
  });
});
