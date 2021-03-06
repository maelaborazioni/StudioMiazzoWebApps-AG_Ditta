/**
 * @properties={typeid:24,uuid:"EAFFB65F-93B5-410F-963D-E481ED995397"}
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
 * @param {Boolean} _noConfirm
 *
 * @properties={typeid:24,uuid:"C311A4AA-8DDA-4DAF-B551-C12D8ECB3833"}
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	var frm = forms.agd_cl_datigenerali_tbl;
	var fs = frm.foundset;
	
	if(fs.getSize() == 0)
	{
		globals.ma_utl_showWarningDialog('Nessuna dettaglio di classificazione da eliminare','Elimina il dettaglio della classificazione');
		return;
	}
	else if(!fs.manuale || fs.codice_int <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile eliminare una classificazione creata direttamente dallo Studio','Elimina il dettaglio della classificazione');
		return;
	}
	
	ditte_to_ditte_classificazioni.ditte_classificazioni_to_ditte_classificazionidettaglio.deleteRecord();
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
	var frm = forms.agd_cl_datigenerali_tbl;
	var fs = frm.foundset;
	
	if(fs.getSize() == 0)
	{
		globals.ma_utl_showWarningDialog('Nessun dettaglio di classificazione da modificare','Modifica il dettaglio della classificazione');
		return;
	}
	else if(!fs.manuale || fs.codice_int <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile modificare una classificazione creata direttamente dallo Studio','Modifica il dettaglio della classificazione');
		return;
	}
	
	var frmDtl = forms.agd_cl_dettaglio_dtl;
	frmDtl._isInEdit = true;
	frmDtl._idDittaClassificazioneDettaglio = forms.agd_cl_dettaglio_tbl.iddittaclassificazionedettaglio;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Modifica il dettaglio di classificazione');
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
	var frm = forms.agd_cl_datigenerali_tbl;
	var fs = frm.foundset;
	
	if(!fs.manuale || fs.codice_int <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile aggiungere un dettaglio ad una classificazione creata direttamente dallo Studio','Aggiungi un dettaglio della classificazione');
		return;
	}
	
	var frmDtl = forms.agd_cl_dettaglio_dtl;
	frmDtl._isInEdit = false;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Inserisci una nuovo dettaglio di classificazione');
}