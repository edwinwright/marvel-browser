import ImagePreloader from './ImagePreloader'

describe('ImagePreloader module', function() {

  describe('queue() function', function() {

    it('should add paths to the items', function() {

      var ip = new ImagePreloader
      ip.queue('hi')
      expect(ip.items).toEqual(['hi'])

    })

  })

})




