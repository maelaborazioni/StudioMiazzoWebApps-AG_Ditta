/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"C1100FAB-3589-4645-8DF8-44DA523C434C"}
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
 * @properties={typeid:24,uuid:"547FF0B5-CB95-4AE8-9CB1-F4CACE0BCC92"}
 */
function dc_save(_event, _triggerForm) {
	
	var saved = _super.dc_save(_event,_triggerForm);
	if(saved == -1)
	   globals.ma_utl_showErrorDialog('Salvataggio non riuscito, riprovare','Scheda storica');
}

/** 
 * @param _event
 * @param _triggerForm
 *
 *
 * @properties={typeid:24,uuid:"AEB83132-3D23-45CA-AB70-19A609E4782F"}
 */
function dc_cancel(_event, _triggerForm) {
	
	_super.dc_cancel(_event,_triggerForm);
	return;
}

/**
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"9C5DF286-B072-4C7A-9026-DADD9F578EBD"}
 */
function dc_delete(_event)
{
	_super.dc_delete(_event, 'svy_nav_fr_buttonbar_viewer');
}

/** 
 *
 * @properties={typeid:24,uuid:"F51E8A49-63A7-4411-B4AD-E5C1D584CBD1"}
 */
function gotoEdit() {

	_super.gotoEdit();
	setStatus(globals.Status.EDIT);
}

/**
 *
 * @properties={typeid:24,uuid:"9C29D68C-A2E0-40EC-97AF-5FE674DA5032"}
 */
function gotoBrowse() {
	
	_super.gotoBrowse();
	setStatus(globals.Status.BROWSE);
}


/**
 * @param {String} status
 *
 * @properties={typeid:24,uuid:"2C940248-7812-409F-B0E1-6290022BF204"}
 */
function setStatus(status)
{
	var frm = forms.agd_schedastorica_dettaglio_dtl ;
	globals.ma_utl_setStatus(status,frm.controller.getName());	
}