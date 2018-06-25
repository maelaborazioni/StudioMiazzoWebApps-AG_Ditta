/**
 * @properties={typeid:24,uuid:"2FEDE148-3E41-4E76-960D-81E5F206C30E"}
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
 * @properties={typeid:24,uuid:"4B05F43D-FE1D-4C5F-B849-608AA75497FF"}
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
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
	
	fs.ditte_classificazioni_to_ditte_classificazionidettaglio.deleteRecord();
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"BBB08533-74CF-4967-BF22-C7667C18E42C"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
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
	frmDtl._idDittaClassificazioneDettaglio = forms.agd_cl_dettaglio_esterni_tbl.iddittaclassificazionedettaglio;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Modifica il dettaglio di classificazione');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"199AE36F-758C-43CB-A01C-9B8E608541E9"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_cl_datigenerali_esterni_tbl;
	var fs = frm.foundset;
	
	if(fs.getSize() == 0)
	{
		globals.ma_utl_showWarningDialog('Nessun classificazione a cui associare un dettaglio','Aggiungi un dettaglio della classificazione');
		return;
	}
	else if(!fs.manuale || fs.codice_int <= 10)
	{
		globals.ma_utl_showWarningDialog('Non è possibile creare un dettaglio per una classificazione creata direttamente dallo Studio','Aggiungi un dettaglio della classificazione');
		return;
	}
	
	var frmDtl = forms.agd_cl_dettaglio_dtl;
	frmDtl._isInEdit = false;
	globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Inserisci un nuovo dettaglio di classificazione');
}