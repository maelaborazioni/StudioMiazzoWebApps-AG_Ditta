/**
 * @type {String}
 * @properties={typeid:35,uuid:"875E3971-1CB4-42F2-881B-618E84831032"}
 */
var _telefono = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"D3DE28AE-61FC-4F2E-81CE-904BDE43FC7C"}
 */
var _fax = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"B2BF4224-4826-49EC-A6FA-4A6C50ECE6D5"}
 */
var _email = null;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D175DEEB-6AB9-4FBF-86E7-AC7CF40E950A"}
 */
function confermaNuovoIndirizzoEsterno(event) 
{
	try
	{
		databaseManager.startTransaction();
		
		/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_indirizziesterni>} */
		var fsIndirizzoEst = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,'ditte_indirizziesterni');
		/** @type {JSRecord<db:/ma_anagrafiche/ditte_indirizziesterni>} */
		var newDittaIndirizzoEst = fsIndirizzoEst.getRecord(fsIndirizzoEst.newRecord());
		if(!newDittaIndirizzoEst)
			throw new Error('Errore durante la creazione dell\'indirizzo della nuova anagrafica');
			
		newDittaIndirizzoEst.idditta = forms.agd_header_dtl.idditta;
		newDittaIndirizzoEst.indirizzo = _indirizzo;
		newDittaIndirizzoEst.codcomune = _codComune;
		newDittaIndirizzoEst.telefono = _telefono;
		newDittaIndirizzoEst.fax = _fax;
		newDittaIndirizzoEst.email = _email;
		
		var success = databaseManager.commitTransaction();
		if(!success)
	    {
	 	   var failedRecordsEst = databaseManager.getFailedRecords();
			   if (failedRecordsEst && failedRecordsEst.length > 0)
				   throw new Error('Errore durante il salvataggio dell\indirizzo del nuovo indirizzo: ' + failedRecordsEst[0].exception.getMessage());
	    }
		
	    databaseManager.refreshRecordFromDatabase(fsIndirizzoEst,-1);
	}
	catch(ex)
	{
		application.output(ex.message, LOGGINGLEVEL.ERROR);
		databaseManager.rollbackTransaction();
		globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
    	globals.svy_mod_closeForm(event);
		globals.ma_utl_showErrorDialog('Inserimento non riuscito. Contattare lo studio');
	}
	finally
	{
		return true;
	}
}
