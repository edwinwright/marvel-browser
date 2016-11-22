import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PageHeader from './PageHeader';
import GlobalNav from './GlobalNav';

describe('<PageHeader />', function () {
  it('has the correct class', function () {
    const wrapper = shallow(<PageHeader />);
    expect(wrapper.hasClass('PageHeader')).to.equal(true);
  });

  it('has a <GlobalNav />', function () {
    const wrapper = shallow(<PageHeader />);
    expect(wrapper.contains(<GlobalNav />)).to.equal(true);
  });
});
