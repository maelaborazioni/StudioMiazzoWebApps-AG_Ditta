/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"4B913C27-682B-4CEC-8CFD-4C1B4E24BFF1"}
 */
function dc_edit(_event, _triggerForm, _forceForm)
{
	_super.dc_edit(_event, _triggerForm, _forceForm);
	var frm = forms.agd_pres_datigenerali_dtl;
	frm.elements.btn_lkp_tracciato.enabled = true;
	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"9E7D2B29-DDAA-4414-989D-A989F9EE3D07"}
*/
function dc_save(_event, _triggerForm, _forceForm)
{
	_super.dc_save(_event, _triggerForm, _forceForm);
	var frm = forms.agd_pres_datigenerali_dtl;
	frm.elements.btn_lkp_tracciato.enabled = false;
	globals.ma_utl_setStatus(globals.Status.BROWSE,frm.controller.getName());
}


/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"D9E1BCA7-CDC1-4653-B8D3-6575EE220E49"}
*/
function dc_cancel(_event, _triggerForm, _noConfirm) 
{
	_super.dc_cancel(_event, _triggerForm, _noConfirm);
	var frm = forms.agd_pres_datigenerali_dtl;
	frm.elements.btn_lkp_tracciato.enabled = false;
	globals.ma_utl_setStatus(globals.Status.BROWSE,frm.controller.getName());
}
