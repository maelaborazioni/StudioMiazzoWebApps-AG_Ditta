/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"4027F3E7-7127-4B0B-8541-CA2137DAF604"}
 */
function dc_new(_event, _triggerForm) {
	
	_super.dc_new(_event,_triggerForm);
	
    databaseManager.setAutoSave(false);
    setStatus(globals.Status.EDIT);

    return;
}

/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"96D619E4-F791-498B-8303-1C1AACA28023"}
 */
function dc_save(_event, _triggerForm) {
	
	if(validaDati())
	{
		
        var saved = _super.dc_save(_event,_triggerForm);
	    if(saved == -1)
	       globals.ma_utl_showErrorDialog('Salvataggio non riuscito, riprovare','Altre festività ditta');

	}else
		globals.ma_utl_showErrorDialog('Controllare i valori inseriti prima di proseguire','Altre festività ditta');
}

/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"19362189-F365-4D48-B356-284B06784D48"}
 */
function dc_cancel(_event, _triggerForm) {
	
	_super.dc_cancel(_event,_triggerForm);
	
	return;
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"F15147D1-B322-4853-BC5E-993F42D7FD39"}
 */
function dc_delete(_event)
{
	var answer = globals.ma_utl_showYesNoQuestion('Sei sicuro di voler cancellare questo record?','Elimina festività');
	if(answer && !foundset.deleteRecord())
	   globals.ma_utl_showWarningDialog('Errore durante l\'eliminazione, riprovare','Elimina festività');	
}

/** 
 *
 * @properties={typeid:24,uuid:"68D86A9B-05DE-49FA-94FA-EE651C9B833F"}
 */
function gotoEdit() {

	_super.gotoEdit();
	setStatus(globals.Status.EDIT);	
}

/**
 *
 * @properties={typeid:24,uuid:"CE9C3DDF-5AF2-4058-AEC1-200DB4B61FDA"}
 */
function gotoBrowse() {
	
	_super.gotoBrowse();
	setStatus(globals.Status.BROWSE);
}


/**
 * @param {String} status
 *
 * @properties={typeid:24,uuid:"4846B479-F768-4914-AEC7-9FECB3CC2C08"}
 */
function setStatus(status)
{
	var frm = forms.agd_pres_af_dtl;
	globals.ma_utl_setStatus(status,frm.controller.getName());	
}

/**
 * @properties={typeid:24,uuid:"5DE5FFBC-579D-4A30-98F1-63D636477D1C"}
 */
function validaDati()
{
	if(validodal != null
		&& descrizione != null	
		&& idfestenazionali != null 
		&& idtabtipofestivita != null
		&& classerateo != null)
	   return true;
    
    return false;
}



