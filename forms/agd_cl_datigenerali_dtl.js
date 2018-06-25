/**
 * @properties={typeid:35,uuid:"CEFC0A3C-1D03-4F39-9432-26BD3162F920",variableType:-4}
 */
var _isInEdit = false;

/**
 * @properties={typeid:35,uuid:"7D09A600-C8C3-4900-AE09-FF8ACB277D48",variableType:-4}
 */
var _idDitta = null;

/**
 * @properties={typeid:35,uuid:"9AB66A76-DE47-4C39-9ABD-52B519803B2F",variableType:-4}
 */
var _idDittaClassificazione = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"62E4C383-E8FC-44A6-979D-1713CF62424A"}
 */
function confermaClassificazione(event) 
{	
	databaseManager.startTransaction();
	
	foundset.idditta = _idDitta;
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
	var selTabName = forms.svy_nav_fr_openTabs.vTabObjects[forms.svy_nav_fr_openTabs.vTabNames[forms.svy_nav_fr_openTabs.vSelectedTab]];
    if(selTabName && selTabName.program == 'AGD_Classificazioni_Esterna')
       globals.updateDatiGeneraliEsterni();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"629B6501-75B4-4013-B02B-76D61DA36641"}
 */
function annullaClassificazione(event) 
{
	databaseManager.revertEditedRecords();
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	var selTabName = forms.svy_nav_fr_openTabs.vTabObjects[forms.svy_nav_fr_openTabs.vTabNames[forms.svy_nav_fr_openTabs.vSelectedTab]];
    if(selTabName && selTabName.program == 'AGD_Classificazioni_Esterna')
       globals.updateDatiGeneraliEsterni();
}

/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"9C2BB29B-15E8-432C-9401-924E1B14B979"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	
	databaseManager.setAutoSave(false);
	databaseManager.revertEditedRecords();
		
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
* @properties={typeid:24,uuid:"ADB1F7B3-25FD-4EF6-84C6-ACDEEAD678AF"}
*/
function onHide(event) 
{
	return annullaClassificazione(event);
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B4A7F686-6EC7-4B3B-9566-B590D8E44974"}
 */
function onDataChangeCodiceClassificazioneDitta(oldValue, newValue, event)
{
	if(newValue && parseInt(newValue) <= 10)
	{
		setStatusWarning('I codici da 1 a 10 sono riservati allo Studio','Classificazioni ditta',1000);
		return false;
	}
	
	setStatusNeutral();
	return true;
}
