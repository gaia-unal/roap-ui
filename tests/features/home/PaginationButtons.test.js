import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PaginationButtons } from 'src/features/home/PaginationButtons';

describe('home/PaginationButtons', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PaginationButtons {...props} />
    );

    expect(
      renderedComponent.find('.home-pagination-buttons').getElement()
    ).to.exist;
  });
});
