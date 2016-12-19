import 'dom4';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, isCompositeComponentWithType} from 'react-addons-test-utils';

import {Grid, Row, Col} from './grid';

describe('Grid', () => {
  const renderComponent = props => renderIntoDocument(<Grid {...props}/>);

  it('should create component', () => {
    isCompositeComponentWithType(renderComponent(), Grid).should.be.true;
  });

  it('should wrap children with div', () => {
    findDOMNode(renderComponent()).should.match('div');
  });

  it('should use passed className', () => {
    findDOMNode(renderComponent({className: 'test-class'})).should.match('.test-class');
  });
});

describe('Row', () => {
  const renderComponent = props => renderIntoDocument(<Row {...props}/>);

  it('should create component', () => {
    isCompositeComponentWithType(renderComponent(), Row).should.be.true;
  });

  it('should wrap children with div', () => {
    findDOMNode(renderComponent()).should.match('div');
  });

  it('should use passed className', () => {
    findDOMNode(renderComponent({className: 'test-class'})).should.match('.test-class');
  });
});

describe('Col', () => {
  const renderComponent = props => renderIntoDocument(<Col {...props}/>);

  it('should create component', () => {
    isCompositeComponentWithType(renderComponent(), Col).should.be.true;
  });

  it('should wrap children with div', () => {
    findDOMNode(renderComponent()).should.match('div');
  });

  it('should use passed className', () => {
    findDOMNode(renderComponent({className: 'test-class'})).should.match('.test-class');
  });
});
