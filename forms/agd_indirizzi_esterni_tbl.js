/**
 * @properties={typeid:24,uuid:"F042E5AB-8094-4D94-9149-CF55456E8709"}
 */
function getButtonObject()
{
	var _enabled = globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA;
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: _enabled };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: _enabled };
		btnObj.btn_duplicate = { enabled: false };
		
	return btnObj;
}


/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"C095373A-4081-4053-A1EC-6E60ED6F65BB"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_indirizzo_esterno_edit;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica l\'indirizzo esterno');
//	return _super.dc_edit(_event, _triggerForm, _forceForm)
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"6AB25843-8D62-4758-B5EA-F50DD14E6CCE"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_indirizzo_esterno_edit;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Nuovo indirizzo esterno');
//	return _super.dc_new(_event, _triggerForm, _forceForm)
}
