module.exports = Velocity

function Velocity() {
  this.positionQueue = []
  this.timeQueue = []
}

Velocity.prototype.pruneQueue = function() {
  //pull old values off of the queue
  while(this.timeQueue.length && this.timeQueue[0] < (Date.now() - 200)) {
    this.timeQueue.shift()
    this.positionQueue.shift()
  }

  var length = this.positionQueue.length
  if(length > 2) {
    var dir = this.positionQueue[length - 1] - this.positionQueue[length - 2] > 0
      , toRemove = 0

    for(var i = length - 2 ; i >= 1 ; i--) {
      if(dir !== (this.positionQueue[i] - this.positionQueue[i - 1] > 0)) {
        toRemove = i
        break
      }
    }

    this.positionQueue.splice(0, toRemove)
    this.timeQueue.splice(0, toRemove)
  }
}

Velocity.prototype.updatePosition = function(position) {
  this.positionQueue.push(position)
  this.timeQueue.push(Date.now())
  this.pruneQueue()
}

Velocity.prototype.getVelocity = function() {
  var length = this.timeQueue.length
  if(length === 1) return 0

  var distance = this.positionQueue[length-1] - this.positionQueue[0]
    , time = (this.timeQueue[length-1] - this.timeQueue[0]) / 1000

  return distance / time
}
