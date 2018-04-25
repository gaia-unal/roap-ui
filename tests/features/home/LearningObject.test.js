import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LearningObject } from 'src/features/home/LearningObject';

describe('home/LearningObject', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LearningObject {...props} />
    );

    expect(
      renderedComponent.find('.home-learning-object').getElement()
    ).to.exist;
  });
});
