_         = require('underscore')
copy      = require('copyjs')

class State
  constructor: (@name, @listeners = {}) ->
    # console.log { status: 'State constructor', name: @name, listeners:@listeners }
    if not @name?
      throw 'Ill defined State without a name'

  updateSelf: (obj,cb) ->
    # console.log { status: 'State.updateSelf, override for specific behavior', obj:obj }
    false

  inform: (obj,cb) ->
    # if state changes, update listeners
    if @updateSelf(obj)
      for k,v of @listeners
        v.inform(@) if (obj != v) # avoid recursive object loops... for now
    cb() if cb

  # one object listens to another's changes
  listen: (obj) ->
    # console.log { status: 'StateVal.listen', obj:obj }
    obj.listeners = {} if not obj.listeners?
    obj.listeners[@name] = @

  # two objects connect and listen to each others changes
  connect: (obj) ->
    # console.log { status: 'StateVal.connect', obj:obj }
    # circular reference, states listen to each other's changes
    @listen(obj)
    obj.listen(@)

# value based stats
class StateVal extends State
  constructor: (name, @val, listeners) ->
    super(name, listeners)
    # console.log { status: 'StateVal constructor', name: @name, val:@val, listeners:@listeners }
    @
    
  updateSelf: (obj,cb) ->
    # console.log { status: 'StateVal.updateSelf', obj:obj }
    pre = copy @val
    if typeof obj.val is 'function'
      @val = obj.val()
    else
      @val = obj.val if obj.val?
    # console.log @name, ' going to return ',pre != @val,'pre',pre,'post',@val
    pre != @val





module.exports =
  State: State,
  StateVal: StateVal
