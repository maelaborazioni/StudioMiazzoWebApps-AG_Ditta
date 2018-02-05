/**
 * @properties={typeid:35,uuid:"6BC544F0-2C7D-401D-A14F-22B8B72B4BDA",variableType:-4}
 */
var _isInEdit = false;

/**
 * @properties={typeid:35,uuid:"AE498863-000B-47C2-A50A-19017785319C",variableType:-4}
 */
var _idDittaClassificazioneDettaglio = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2D62CDDA-5436-48CC-9B8C-8B4820E59754"}
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
 * @properties={typeid:24,uuid:"C7413000-0202-436B-ABDB-B35A863B96EA"}
 */
function annullaClassificazioneDettaglio(event) 
{
	databaseManager.rollbackTransaction();
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"E6206AF8-562B-4A51-AA9E-2C35EE657F3F"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
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
* @properties={typeid:24,uuid:"10B246F9-6147-48ED-A8BE-8E5AD0947C1B"}
*/
function onHide(event) 
{
	return annullaClassificazioneDettaglio(event);
}
