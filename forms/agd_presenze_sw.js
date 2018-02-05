/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"D6E166A0-D928-4BA5-8D0E-A34745F9AAC1"}
 */
var vCodCategoriaSW = null;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C89D7516-851A-4D08-8B24-F3965466AA6E",variableType:4}
 */
var vChkCodCategoriaSW = 0;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5EFC2027-918D-413A-8F99-8E913C91EEC7"}
 */
function onActionEditCateg(event) 
{
	elements.btn_confirm_categ.enabled = true;
	elements.btn_cancel_categ.enabled = true;
	elements.btn_edit_categ.enabled = false;
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FEA5BAE2-2DFA-41AA-86F9-91204D20E53B"}
 * @AllowToRunInFind
 */
function onActionConfirm(event) 
{
	elements.btn_confirm_categ.enabled = false;
	elements.btn_cancel_categ.enabled = false;
	elements.btn_edit_categ.enabled = true;
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	refreshElenco();
}

/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"678EA5AF-71F1-48ED-8EC0-E7C4A3E70C3E"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	if(firstShow)
	   refreshElenco();
	
}

/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"B19D0696-AC72-4140-9780-D230E73189C9"}
 */
function refreshElenco()
{
//	var frm = forms.agd_presenze_sw;
	var fs = foundset;
	if(fs.find())
	{
		if(vChkCodCategoriaSW)
		{
			var arrIdTabSW = globals.getIdTabSwFromCodice(vCodCategoriaSW);
			fs.idtabsw = arrIdTabSW;
		}
		fs.periodo_al = '^=';
		
		fs.search();
	}
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"74C47E5B-1EAA-46E2-88A5-63990AC2830D"}
 */
function onActionAnnullaCateg(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
}
