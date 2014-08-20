#touch-velocity

  Calculate (nearly) instantaneous velocity for a thing.  Things like touch or
mouse events.  Calculating the velocity by looking at the last two events is
wildly inaccurate, since the time difference between the two events being fired
is often &lt; 1ms.

  This library smooths that out a bit by calculating over the last 100ms.

##example

```javascript
  var Velocity = require('touch-velocity')
    , velocity = new Velocity
    , touchTarget = document.querySelector('#touch-target')
  
  touchTarget.addEventListener('touchmove', function(evt) {
    velocity.updatePosition(evt.touches[0].pageX)
  })

  touchTarget.addEventListener('touchend', function(evt) {
    console.log(velocity.getVelocity())
  })
```

##api

###updatePosition(newPosition)

  Updates the current position of the thing whose velocity you are tracking.
You should do this any time you know that the thing's position has changed i.e. 
a touch event.

###getVelocity()

  Gets the (nearly) instantaneous velocity of the thing you're tracking.

###TODO

  * Work with 2d, accept both x and y positions.
  * Accept event objects 
