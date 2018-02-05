/**
 * @properties={typeid:35,uuid:"21DDD5D2-C70B-429C-8BD4-41CAD279A04D",variableType:-4}
 */
var _isInEdit = false;

/**
 * @properties={typeid:35,uuid:"D46C8988-DBAC-4556-A30D-78D4E0ABBE9F",variableType:-4}
 */
var _idDittaClassificazione = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D900D7CB-32BA-4CC4-B018-7E77213347A9"}
 */
function confermaClassificazione(event) 
{
	databaseManager.startTransaction();
	
	foundset.idditta = forms.agd_header_dtl.idditta;
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
 * @properties={typeid:24,uuid:"936DE41B-DA75-46D9-A1A6-C5D2FED43CB2"}
 */
function annullaClassificazione(event) 
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
* @properties={typeid:24,uuid:"028AA018-BF62-4437-AF0F-D719B7A0979E"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());

	if(_isInEdit)
		foundset.loadRecords(_idDittaClassificazione);
	else
	    foundset.getRecord(foundset.newRecord());
		
}

/**
*
* @param {JSEvent} event
*
* @properties={typeid:24,uuid:"88068769-0A58-4C62-9E80-4EE5BB77E356"}
*/
function onHide(event) 
{
	return annullaClassificazione(event);
}
