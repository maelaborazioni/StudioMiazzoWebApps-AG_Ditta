/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B15587B8-21AB-47A6-A23D-2A3AAE5D73C0"}
 */
function addTurni(event) 
{
	try
	{
		databaseManager.startTransaction();
		
		var pks = globals.ma_utl_showLkpWindow(
				{
					 event: event
					,allowInBrowse: true
					,multiSelect: true
					,lookup: 'AG_Lkp_Turno'
					,methodToAddFoundsetFilter: 'filterTurni'
				}
			);
		
		for(var pk in pks)
		{
			if(ditte_sedi_to_ditte_sediturni)
			{
				var newRecord = ditte_sedi_to_ditte_sediturni.getRecord(ditte_sedi_to_ditte_sediturni.newRecord());
					newRecord.iddittaturno = pks[pk];
			}
		}
		
		databaseManager.commitTransaction();
		
		ditte_sedi_to_ditte_sediturni.sort('ditte_sediturni_to_ditte_turni.codice asc');
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.rollbackTransaction();
	}
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"BCDA3553-A1E6-4AA8-9A71-F2C948D7D270"}
 */
function filterTurni(fs)
{
	fs.addFoundSetFilterParam('idditta', '=', idditta);
	fs.addFoundSetFilterParam('iddittaturno', 'NOT IN', globals.foundsetToArray(ditte_sedi_to_ditte_sediturni, 'iddittaturno'));
	return fs;
}
