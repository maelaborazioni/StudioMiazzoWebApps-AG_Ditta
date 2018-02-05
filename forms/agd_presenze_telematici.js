/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6C8D57CF-E6A1-4AC4-AA26-04BDBB3BC2C4",variableType:4}
 */
var vChkGestionePresenze = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"45B03A46-7AD7-4E3C-8F6B-2A877B3A1327",variableType:4}
 */
var vChkSoloAttive = 1;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"176D4EDE-8A6F-494C-82D2-F0D10274704C"}
 */
function onActionEdit(event) 
{
	elements.btn_edit.enabled = false;
	elements.btn_confirm.enabled = 
		elements.btn_cancel.enabled = 
			elements.chk_solo_attive.enabled = 
				elements.chk_solo_gestite.enabled = true;
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"228748FF-C42E-4EEB-8D10-1B04568FB246"}
 */
function onActionConfirm(event) 
{
	elements.btn_edit.enabled = true;
	elements.btn_confirm.enabled = 
		elements.btn_cancel.enabled = 
			elements.chk_solo_attive.enabled = 
				elements.chk_solo_gestite.enabled = false;
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	
	refreshElenco();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E42F4D7-5D6E-4B82-98C2-DB4FD35BFA7F"}
 */
function onActionCancel(event) 
{
	elements.btn_edit.enabled = true;
	elements.btn_confirm.enabled = 
		elements.btn_cancel.enabled = 
			elements.chk_solo_attive.enabled = 
				elements.chk_solo_gestite.enabled = false;
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
}

/**
 * @properties={typeid:24,uuid:"3A1908D4-9F5E-498A-9A9D-99AB15126DB3"}
 * @AllowToRunInFind
 */
function refreshElenco()
{
	var fs = foundset;
	if(fs.find())
	{
		if(vChkGestionePresenze)
		   fs.ore_gestioneepi2 = 1;
				
		if(vChkSoloAttive)
		   fs.ore_finegestione = '^=';
				
		fs.search();
	}
}

/**
*
* @param {Boolean} _firstShow
* @param {JSEvent} _event
*
* @properties={typeid:24,uuid:"48BF973F-2EF5-48AB-91E8-DCFA7A437A45"}
*/
function onShowForm(_firstShow, _event) 
{
	_super.onShowForm(_firstShow, _event);
	refreshElenco();
}
