/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E7EF2E33-DCEE-401C-9858-819FA925CEA3"}
 */
var _codInailDitta
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2D6B628A-04C7-4CEA-81EA-627E82623417"}
 */
var _controCodice
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2929C83D-8D17-4D8B-9587-38268C0D749E"}
 */
var _codSedeInail
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BEEB4793-A8C3-440F-BD53-ACF771630B01"}
 */
var _descSedeInail
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C4451408-C62F-4A9B-BD1D-3FEA0B6D90F9"}
 */
var _codComune
/**
 * @properties={typeid:24,uuid:"E7E382DF-6FDE-4B7B-826E-3B5B3BD383AA"}
 */
function AggiornaSedeInail(_rec)
{
	_codSedeInail = _rec['codice'];
	_descSedeInail = _rec['descrizione'];
	_codComune = _rec['codcomune'];
}
/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"DFEA3F74-AC4C-4339-A6F7-48BEC36EBDBA"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B79B60D8-F63B-41C7-A6B8-4DBB69AB7C73"}
 */
function onActionConferma(event) 
{
	databaseManager.startTransaction();
	
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte_inailgenerale>}*/
	var fsInail = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INAIL);
	var rec = fsInail.getRecord(fsInail.newRecord());
	if(rec)
	{
		rec.idditta = forms.agd_header_dtl.idditta;
		rec.codinailditta = _codInailDitta;
		rec.controcodice = _controCodice;
		rec.codsedeinail = _codSedeInail;
	
		if(!databaseManager.commitTransaction())
		{
			var failedrecords = databaseManager.getFailedRecords();
			if (failedrecords && failedrecords.length > 0)
			{
				for(var fInd = 0; fInd < failedrecords.length; fInd++)
					application.output(failedrecords[fInd].exception.getErrorCode() + ' - ' + failedrecords[fInd].exception.getMessage(),LOGGINGLEVEL.WARNING);
			}
			databaseManager.rollbackTransaction();
			globals.ma_utl_showErrorDialog('Inserimento indirizzo non riuscito');
		    return;
		}
		
		databaseManager.refreshRecordFromDatabase(fsInail,-1);
	}
	else
	{
		globals.ma_utl_showErrorDialog('Errore durante la creazione del nuovo record, si prega di riprovare');
		databaseManager.rollbackTransaction();
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
 * @properties={typeid:24,uuid:"CA09C9A5-298C-4A9D-AF8C-DB1525885C24"}
 */
function onActionAnnulla(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}
