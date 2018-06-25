/**
 * @properties={typeid:35,uuid:"460DBE29-8D8D-448F-A2E0-33EA6F44CA9C",variableType:-4}
 */
var _isInEdit = false;

/**
 * @properties={typeid:35,uuid:"A68B87E9-BA6D-45C9-98F3-5435A19E4119",variableType:-4}
 */
var _idDittaClassificazioneDettaglio = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5E5E2009-B908-467A-B226-D53710760760"}
 */
function confermaClassificazioneDettaglio(event) 
{	
	databaseManager.startTransaction();	
	
	foundset.iddittaclassificazione = forms.agd_cl_datigenerali_tbl.iddittaclassificazione;
	foundset.manuale = 1;
	
	if(!databaseManager.commitTransaction())
	{
		var failedrecordsInd = databaseManager.getFailedRecords();
		if (failedrecordsInd && failedrecordsInd.length > 0)
		{
			for(var fInd = 0; fInd < failedrecordsInd.length; fInd++)
				application.output(failedrecordsInd[fInd].exception.getErrorCode() + ' - ' + failedrecordsInd[fInd].exception.getMessage(),LOGGINGLEVEL.WARNING);
		}
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Inserimento classificazione non riuscito');
	    return;
	}
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6C4039ED-C8B1-4617-AEBA-44A5E09F5F03"}
 */
function annullaClassificazioneDettaglio(event) 
{
	databaseManager.revertEditedRecords();
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"262D5788-5EDC-4881-9B30-69CBF8A97572"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);

	databaseManager.setAutoSave(false);
	databaseManager.revertEditedRecords();
		
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
 	
	if(_isInEdit)
		foundset.loadRecords(_idDittaClassificazioneDettaglio);
	else
	    foundset.getRecord(foundset.newRecord());
		
}

/**
*
* @param {JSEvent} event
*
* @properties={typeid:24,uuid:"FA30C162-AD7F-4997-ADC9-8756F7271944"}
*/
function onHide(event) 
{
	return annullaClassificazioneDettaglio(event);
}
