/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 * @param {Boolean} _noConfirm
 *
 * @properties={typeid:24,uuid:"C311A4AA-8DDA-4DAF-B551-C12D8ECB3833"}
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	ditte_classificazioni_to_ditte_classificazionidettaglio.deleteRecord();
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"7C2A8690-471B-45DE-B831-FDFB01B7B782"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_dettaglio_dtl;
	frm._isInEdit = true;
	frm._idDittaClassificazioneDettaglio = forms.agd_cl_dettaglio_tbl.iddittaclassificazionedettaglio;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica il dettaglio di classificazione');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"70B8ABCC-A467-43E5-8294-F37A3A7056CB"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_dettaglio_dtl;
	frm._isInEdit = false;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuovo dettaglio di classificazione');
}

/**
 *
 * @param {JSEvent} _event
 * @param {String} _form
 *
 * @properties={typeid:24,uuid:"400D3E28-9581-4E05-965B-99E446CD550E"}
 */
function onRecordSelection(_event, _form)
{
	_super.onRecordSelection(_event, _form);
//	forms.agl_cl_classificazioni_tbl.onRecordSelection(_event);
}
