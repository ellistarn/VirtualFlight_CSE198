![oculus](https://github.com/victusfate/oculus/raw/master/oculus.jpg)
oculus is a tool to simplify object transition, and communication of state (sorta observer pattern) through the use of named objects (unique id)
===

	cold = new StateVal('cold','ooze',{})

	// funky listens to changes in cold object
	funky = new StateVal('funky', { 'cold': cold} )

	// update cold state, and inform its listeners
	cold.inform({ val: 'medina' })
	// 'cold going to return true pre 'ooze' funky->cold-> 'medina'

license: BSD

