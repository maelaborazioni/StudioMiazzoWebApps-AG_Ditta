/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"CDD86221-AF88-40A9-BDE6-37A9A2C99DD3"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_dtl;
	frm._isInEdit = false;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova classificazione');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"94632B9A-C6F1-436B-B3D2-DEB61426D569"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_dtl;
	frm._isInEdit = true;
	frm._idDittaClassificazione = iddittaclassificazione;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica la classificazione');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"F22D9192-7F41-4B98-966F-CC502683AF7D"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	return _super.dc_delete(_event, _triggerForm, _forceForm, _noConfirm)
}
