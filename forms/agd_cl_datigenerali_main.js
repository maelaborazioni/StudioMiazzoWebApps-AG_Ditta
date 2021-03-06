/**
 * @properties={typeid:24,uuid:"E4A02E42-DBF7-42F8-98F8-2A570A13099E"}
 */
function getButtonObject()
{
	var btnObj = _super.getButtonObject();
		
	var enabled = globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
	              || globals.getTipologiaDitta(idditta) ==  globals.Tipologia.ESTERNA ? true : false;

	// TODO ticket 13106 : setting enable to true...
	enabled = true;
	
	btnObj.btn_new = { enabled : enabled };
	btnObj.btn_edit = { enabled : enabled };
	btnObj.btn_delete = { enabled : enabled };
	btnObj.btn_duplicate = { enabled : false };
	
	return btnObj;
}
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
	var frmDtl = forms.agd_cl_datigenerali_dtl;
	frmDtl._idDitta = forms.agd_header_dtl.idditta;
	frmDtl._isInEdit = false;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Inserisci una nuova classificazione');
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
	var frm = forms.agd_cl_datigenerali_tbl;
	var fs = frm.foundset;
	
	if(fs.getSize() == 0)
	{
		globals.ma_utl_showWarningDialog('Nessuna classificazione da eliminare','Modifica la classificazione');
		return;
	}
	else if(fs.codice && parseInt(fs.codice) <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile modificare una classificazione avente codice (da 1 a 10) riservato allo Studio','Modifica la classificazione');
		return;
	}
	else if(!fs.manuale)
	{
		globals.ma_utl_showWarningDialog('Non è possibile modificare una classificazione creata direttamente dallo Studio','Modifica la classificazione');
		return;
	}
	
	var frmDtl = forms.agd_cl_datigenerali_dtl;
	frmDtl._isInEdit = true;
	frmDtl._idDittaClassificazione = fs.iddittaclassificazione;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Modifica la classificazione');
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
	var frm = forms.agd_cl_datigenerali_tbl;
	var fs = frm.foundset;
	
	if(fs.getSize() == 0)
	{
		globals.ma_utl_showWarningDialog('Nessuna classificazione da eliminare','Elimina la classificazione');
		return false;
	}
	else if(fs.codice && parseInt(fs.codice) <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile eliminare una classificazione avente codice (da 1 a 10) riservato allo Studio','Elimina la classificazione');
		return false;
	}
	else if(!fs.manuale)
	{
		globals.ma_utl_showWarningDialog('Non è possibile eliminare una classificazione creata direttamente dallo Studio','Elimina la classificazione');
		return false;
	}
	
	if(fs.deleteRecord(fs.getSelectedRecord()))
		databaseManager.refreshRecordFromDatabase(fs,-1);
	
	return true;
}