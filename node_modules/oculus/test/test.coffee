oculus    = require('../oculus')
State     = oculus.State
StateVal  = oculus.StateVal
_         = require('underscore')
$         = require('jquery')
log       = console.log


# PageElement is a special case of State
# where name corresponds to the #divID
class PageElement extends State
  constructor: (name, listeners) ->
    super(name, listeners)
    console.log { status: 'PageElement constructor', name: @name, listeners: @listeners }
    @

  
  # jQuery get/set: $element.val() and $element.val(val) 
  val: (arg) ->
    console.log { status: 'PageElement.val(arg)', arg: arg }
    if arg?
      $(@name).val(arg)
    else
      $(@name).val()

  # jQuery get/set: $element.html() and $element.html(val) 
  html: (arg) ->
    console.log { status: 'PageElement.html(arg)', arg: arg }
    if arg?
      $(@name).html(arg)
    else
      $(@name).html()

  change: (arg) ->
    console.log { status: 'PageElement.change( arg=function(){} )', arg: arg }
    $(@name).change(arg)

  updateSelf: (obj,cb) ->
    console.log { status: 'PageElement.updateSelf(obj)', obj: obj }
    pre = copy @val()
    if typeof obj.val is 'function'
      @val obj.val()
    else
      @val obj.val if obj.val?
    console.log @name, ' going to return ',pre != @val(),'pre',pre,'post',@val()
    pre != @val()


# new cold StateVal with id cold, val='ooze', and no listeners
console.log 'about to create cold StateVal'
cold = new StateVal('cold','ooze',{})

# elem listens to changes in cold object
elem = new PageElement('#funky', { 'cold': cold} )

cold.inform({ val: 'medina' })
# 'cold going to return true pre 'ooze' post 'medina'

