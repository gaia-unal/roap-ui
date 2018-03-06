import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Table } from 'src/features/home/Table';

describe('home/Table', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Table {...props} />
    );

    expect(
      renderedComponent.find('.home-table').getElement()
    ).to.exist;
  });
});
