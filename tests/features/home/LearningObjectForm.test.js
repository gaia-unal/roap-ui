import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LearningObjectForm } from 'src/features/home';

describe('home/LearningObjectForm', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LearningObjectForm />
    );

    expect(
      renderedComponent.find('.home-learning-object-form').getElement()
    ).to.exist;
  });
});
