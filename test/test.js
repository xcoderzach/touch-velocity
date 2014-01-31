var Velocity = require('../')
  , sinon = require('sinon')

describe('when I add some positions', function() {
  before(function() {
    this.velocity = new Velocity
    this.clock = sinon.useFakeTimers(0, "Date")

    this.velocity.updatePosition(0)
    this.clock.tick(50)
    this.velocity.updatePosition(100)
  })

  after(function() {
    this.clock.restore()
  })

  it('should calculate the correct velocity', function() {
    this.velocity.getVelocity().should.equal(2000)
  })

  it('should be zero when the user hasn\'t moved in a while', function() {
    this.clock.tick(5000)
    this.velocity.updatePosition(200)
    this.velocity.getVelocity().should.equal(0)
  })
})
