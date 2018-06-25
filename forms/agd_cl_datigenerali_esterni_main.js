/**
 * @properties={typeid:24,uuid:"D2810EAE-1122-49F8-9A63-B6C427B362B8"}
 */
function getButtonObject()
{
	var btnObj = _super.getButtonObject();
		
	var enabled = globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA) 
	              || globals.getTipologiaDitta(idditta) ==  globals.Tipologia.ESTERNA ? true : false;

	// ticket 13106 : setting enable to true...
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
 * @properties={typeid:24,uuid:"B3958FB7-BFB5-4480-8274-CDA18754393E"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_dtl;
	frm._idDitta = forms.agd_header_esterni_dtl.idditta;
	frm._isInEdit = false;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova classificazione');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"18CF439D-19F2-4409-9C89-F31BCEB437AC"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
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
* @properties={typeid:24,uuid:"5C2C966B-18CC-4617-A189-D2AE22CFBA14"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
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

/**
 * @param {Boolean} _firstShow
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"B172411D-61C7-49B5-8A66-95ADC48C1125"}
 * @AllowToRunInFind
 */
function onShowForm(_firstShow, _event) 
{
	_super.onShowForm(_firstShow, _event);
	globals.updateDatiGeneraliEsterni();
}