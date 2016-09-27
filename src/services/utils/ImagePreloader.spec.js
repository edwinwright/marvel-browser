import chai, { expect, assert } from 'chai';
chai.should();

import ImagePreloader from './ImagePreloader';



describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      this.timeout(2500);
      setTimeout(done, 1000);
    });
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});




describe('The ImagePreloader', function () {

  describe('queue() function', function () {

    it('should add paths to the items', function () {

      var ip = new ImagePreloader;
      ip.queue('hi');
      // expect(ip.items).toEqual(['hi']);
      //
      //

    });

  });

});
