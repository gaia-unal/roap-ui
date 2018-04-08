import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CreateLearningObject } from 'src/features/home/CreateLearningObject';

describe('home/CreateLearningObject', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateLearningObject {...props} />
    );

    expect(
      renderedComponent.find('.home-create-learning-object').getElement()
    ).to.exist;
  });
});
