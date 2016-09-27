import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Character from './Character';

describe('The <Character> component', function() {
  it('should display PhotoList', function() {

    const name = "my-name";
    const description = "my-description";
    const thumbnail = "my-image.jpg";

    const wrapper = shallow(
      <Character
        name={name}
        description={description}
        thumbnail={thumbnail}
      />
    );

    console.log(wrapper.find('.Character__name').text());
    expect(wrapper.find('.Character__name').text()).to.equal(name);

  });
});

//
// describe('PhotoList container', () => {
//   it('should fetch the photos from the api', () => {
//     const photos = [
//       {
//         "id": 1,
//         "thumbnailUrl": "http://placehold.it/150"
//       }
//     ]
//     sinon.stub(api, 'fetchPhotos').returns(new Promise(function () {}));
//     const wrapper = mount(
//       <PhotoListContainer photos={photos}/>
//     );
//     sinon.assert.calledWith(api, null);
//   })
// })
