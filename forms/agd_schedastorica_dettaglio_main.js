/** 
 * @param _event
 * @param _triggerForm
 *
 *
 *
 * @properties={typeid:24,uuid:"B98905ED-A526-49AD-B07C-27962A3C5B8F"}
 */
function dc_new(_event, _triggerForm) {
	
	databaseManager.setAutoSave(false);
    
	var _fs = forms.agd_schedastorica_dettaglio_dtl.foundset;
	if(_fs.newRecord(false) > -1)
	{
	   _fs.iddittaschedastorica = forms.agd_schedastorica_tbl.iddittaschedastorica;
	   setStatus(globals.Status.EDIT);
	   //abilitiamo i pulsanti sulla buttonbar per confermare/annullare
	   forms.svy_nav_fr_buttonbar_viewer.elements.btn_save.enabled = true;
	   forms.svy_nav_fr_buttonbar_viewer.elements.btn_cancel.enabled = true;
	}
	else
		globals.ma_utl_showWarningDialog('Creazione nuovo record non riuscita, riprovare','Dettaglio scheda storica');
    
    return;
}

/** 
 * @param _event
 * @param _triggerForm
 *
 *
 *
 * @properties={typeid:24,uuid:"2E72A768-C097-4055-8B20-428808290834"}
 */
function dc_save(_event, _triggerForm) {

	var saved = _super.dc_save(_event);
	
//	var _frm = forms.agd_schedastorica_dettaglio_dtl;
//	var _fs = _frm.foundset;
//	
//	if(!databaseManager.commitTransaction())
	if(!saved)
	{	
	   globals.ma_utl_showErrorDialog('Salvataggio non riuscito, riprovare','Dettaglio scheda storica');
       databaseManager.rollbackTransaction();
	}   
	
	setStatus(globals.Status.BROWSE);
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param  _event
 * @param  _triggerForm
 *
 * @properties={typeid:24,uuid:"44221D04-B0D6-4C67-9855-02453A56E8D9"}
 */
function dc_edit(_event, _triggerForm){
	
	var _frm = forms.agd_schedastorica_dettaglio_tbl;
	var _fs = _frm.foundset;
	
	if(_fs.getSize() > 0)
	{
		gotoEdit();
		//abilitiamo i pulsanti sulla buttonbar per confermare/annullare
		forms.svy_nav_fr_buttonbar_viewer.elements.btn_save.enabled = true;
		forms.svy_nav_fr_buttonbar_viewer.elements.btn_cancel.enabled = true;
	}
	else
	    globals.ma_utl_showWarningDialog('Nessun dettaglio da modificare','Dettaglio scheda storica');
}

/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"87C10BC3-7C2A-4664-A09B-F080705F1400"}
 */
function dc_cancel(_event, _triggerForm) {
	
	_super.dc_cancel(_event,_triggerForm);
	return;
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"9687C68C-D148-4196-89E6-A2258629FCE3"}
 */
function dc_delete(_event)
{
	var _frm = forms.agd_schedastorica_dettaglio_tbl;
	var _fs = _frm.foundset;
	
	if(_fs.getSize() > 0)
	{
		if(!_fs.deleteRecord())
			globals.ma_utl_showErrorDialog('Eliminazione non riuscita, riprovare','Dettaglio scheda storica');
	}
	else
		globals.ma_utl_showWarningDialog('Nessun dettaglio da eliminare','Dettaglio scheda storica');
	
	return;	
}

/** 
 *
 * @properties={typeid:24,uuid:"EA51D5AB-4CDE-40A1-9A43-FCB5B67BCD2D"}
 */
function gotoEdit() {

	_super.gotoEdit();
	setStatus(globals.Status.EDIT);
}

/**
 *
 * @properties={typeid:24,uuid:"C7DEAD66-1F60-429F-8B14-F531B84086DC"}
 */
function gotoBrowse() {
	
	_super.gotoBrowse();
	setStatus(globals.Status.BROWSE);
}


/**
 * @param {String} status
 *
 * @properties={typeid:24,uuid:"6BF0B09D-2ED5-4B13-A911-7F346AA941F8"}
 */
function setStatus(status)
{
	var frm = forms.agd_schedastorica_dettaglio_dtl;
	globals.ma_utl_setStatus(status,frm.controller.getName());	
}
