/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"16B01867-468E-47FD-915A-FEF7E0885686",variableType:-4}
 */
var pkArchivio = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6F5D686A-94EA-4256-8EF4-9DEE872369AE"}
 * @AllowToRunInFind
 */
function addArchivio(event) 
{
	try
	{
		pkArchivio = null;
		pkArchivio = showLkpArchivio(event);
		
		if(pkArchivio)
		{
			databaseManager.setAutoSave(false);

			var fs = ditte_funzionipersone_to_privacy_archiviofunzionipersone;
			
			var newRecord = fs.getRecord(fs.newRecord());
				newRecord.idprivacydittaarchivio = pkArchivio;
				newRecord.idditta = idditta;
			
			forms.ag_pri_responsabili_permessi_tbl.showEditForm(fs, globals.Status.ADD);
		}
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message);
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.revertEditedRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"963B3249-94BF-4105-ACF4-F839DFC69F7A"}
 */
function showLkpArchivio(event)
{
	return globals.ma_utl_showLkpWindow(
			{
				 event: event
				,lookup: 'AG_Lkp_Archivio'
				,returnField: 'pkArchivio'
				,methodToAddFoundsetFilter: 'filterArchivio'
				,allowInBrowse: true
			}
		);
}

/**
 * @param {JSFoundset<db:/ma_hr/privacy_dittaarchivio>} fs
 * @properties={typeid:24,uuid:"7363CCC4-63A1-40F9-A19B-8C48E7A1262A"}
 * @AllowToRunInFind
 */
function filterArchivio(fs)
{
//	fs.addFoundSetFilterParam('idditta', '=', idditta, 'dittaArchivioFilter');
	fs.addFoundSetFilterParam('idditta', '=', ditte_funzionipersone_to_ditte.idditta_sede, 'dittaArchivioFilter');
	
	/**
	 * Escludi gli archivi già mappati
	 */
	/** @type {JSFoundset<db:/ma_hr/privacy_archiviofunzionipersone>} */
	var archivioFunzioniFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'privacy_archiviofunzionipersone');
	if(archivioFunzioniFs && archivioFunzioniFs.find())
	{
		archivioFunzioniFs.iddittafunzionepersona = iddittafunzionepersona;
		archivioFunzioniFs.search();
		
		fs.addFoundSetFilterParam('idprivacydittaarchivio', 'NOT IN', globals.foundsetToArray(archivioFunzioniFs, 'idprivacydittaarchivio'));
		return fs;
	}
	
	throw 'Error when entering find mode';
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"ADE8257A-E232-4E82-9AB0-5163C8F92699"}
 */
function deleteArchivi(event) 
{
	globals.deleteAllRecords(ditte_funzionipersone_to_privacy_archiviofunzionipersone);
}
