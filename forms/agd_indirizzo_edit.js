/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C1B74558-6641-4DD6-930A-BA98E728A98E"}
 * @AllowToRunInFind
 */
function confermaNuovoIndirizzo(event) 
{
	databaseManager.startTransaction();
	
	var rec
	if(_isInEdit)
	   rec = foundset.getSelectedRecord();
	else
		rec = foundset.getRecord(foundset.newRecord());
	rec.idditta = forms.agd_header_dtl.idditta;
	rec.cap = _cap;
	rec.codcomune = _codComune;
	rec.codstatoestero = 1;//_codStatoEstero;
	rec.codtipoindirizzo = _codTipoIndirizzo;
	rec.datarilevazione = new Date();
	rec.datadecorrenza = _dataDecorrenza;
	rec.descrizione = globals.getDescrizioneTipoIndirizzo(_codTipoIndirizzo);
	rec.indirizzo = _indirizzo;
	rec.manuale = 1;
	
	if(!databaseManager.commitTransaction())
	{
		var failedrecordsInd = databaseManager.getFailedRecords();
		if (failedrecordsInd && failedrecordsInd.length > 0)
		{
			for(var fInd = 0; fInd < failedrecordsInd.length; fInd++)
				application.output(failedrecordsInd[fInd].exception.getErrorCode() + ' - ' + failedrecordsInd[fInd].exception.getMessage(),LOGGINGLEVEL.WARNING);
		}
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Inserimento indirizzo non riuscito');
	    return;
	}
	
	if(!_isInEdit)
	{
		databaseManager.startTransaction();
		
		/** @type {JSFoundset<db:/ma_anagrafiche/ditte_sedi>}*/
		var fsSedi = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_SEDI);
		var recSedi = fsSedi.getRecord(fsSedi.newRecord());
		recSedi.codice = 0;
		recSedi.codtiposede = rec.codtipoindirizzo;
		recSedi.dataapertura = null;
		recSedi.datachiusura = null;
		recSedi.descrizione = rec.indirizzo;
		recSedi.iddittaindirizzo = rec.iddittaindirizzo;
		recSedi.idditta = rec.idditta;
		recSedi.manuale = 1;
	
		if(!databaseManager.commitTransaction())
		{
			var failedrecords = databaseManager.getFailedRecords();
			if (failedrecords && failedrecords.length > 0)
			{
				for(var f = 0; f < failedrecords.length; f++)
					application.output(failedrecords[f].exception.getErrorCode() + ' - ' + failedrecords[f].exception.getMessage(),LOGGINGLEVEL.WARNING);
			}
			databaseManager.rollbackTransaction();
			globals.ma_utl_showErrorDialog('Inserimento nuova sede non riuscito');
		    return;
		}
	}
		
	databaseManager.refreshRecordFromDatabase(foundset,-1);
	
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
 * @properties={typeid:24,uuid:"28FD275B-2619-4899-9D9C-8FBDD8928389"}
 */
function annullaNuovoIndirizzo(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"967AA5FE-3B0D-4B24-930F-C7C7808641C8"}
 * @AllowToRunInFind
 */
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
	if(_isInEdit)
	{
		foundset.find();
		foundset.iddittaindirizzo = _idIndEdit;
		foundset.search();
		_codComune = foundset.codcomune;
		_cap = foundset.cap;
		_codStatoEstero = foundset.codstatoestero;
		_codTipoIndirizzo = foundset.codtipoindirizzo;
		_comune = foundset.ditte_indirizzi_to_tab_comuniitalia.descrizione;
		_dataDecorrenza = foundset.datadecorrenza;
		_indirizzo = foundset.indirizzo;
		_provincia = foundset.ditte_indirizzi_to_tab_comuniitalia.provincia;
		_statoEstero = foundset.ditte_indirizzi_to_tab_statiesteri.descrizione;
	}
	
}
