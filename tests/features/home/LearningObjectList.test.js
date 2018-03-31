import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LearningObjectList } from 'src/features/home/LearningObjectList';

describe('home/LearningObjectList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LearningObjectList {...props} />
    );

    expect(
      renderedComponent.find('.home-learning-object-list').getElement()
    ).to.exist;
  });
});
