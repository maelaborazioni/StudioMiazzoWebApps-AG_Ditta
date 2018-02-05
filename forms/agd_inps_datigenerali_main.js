/**
 * @properties={typeid:24,uuid:"3650B676-FC2D-41DE-86F0-AFB82A4422AA"}
 * @AllowToRunInFind
 */
function filterData(fs)
{
	fs = ditte_to_ditte_inps;
	if(fs && fs.find())
	{
		fs.datafineelaborazione = '^||>=' + globals.formatForFind(globals.TODAY);
		fs.search();
	}
}

/**
 * @properties={typeid:24,uuid:"FF9D73AF-37B4-4B7A-B2D3-F7452FB5A87A"}
 */
function unfilterData(fs)
{
	fs = ditte_to_ditte_inps;
	if(fs)
	{
		fs.loadAllRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"21AE31E5-A79F-48D7-9DD5-80D0E6AC78D8"}
 */
function getEditFormName()
{
	return forms.agd_inps_datigenerali_dtl.controller.getName();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param _event
 * @param _triggerForm
 *
 * @properties={typeid:24,uuid:"295B0776-602C-4D63-ACE2-50EE3541F471"}
 */
function dc_new(_event,_triggerForm)
{
	var frm = forms.agd_inps_datigenerali_dtl_edit;
	frm.isInEdit = false;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci nuova posizione INPS');
}
/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"DC346046-F752-4415-98DE-C175DCC45784"}
*/
function dc_edit(event, triggerForm, forceForm) 
{
	var frm = forms.agd_inps_datigenerali_dtl_edit;
	// TODO precompilare dati
	frm.isInEdit = true;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci nuova posizione INPS');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"D54BC429-1BFC-45F3-ACF6-BDCF8B1F13F5"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	if(ditte_to_ditte_inps)
	   ditte_to_ditte_inps.deleteRecord();
}
