/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"F1B9BC3D-7B97-46AE-9EE2-B7ADC0D8EE31"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	apriGestioneSediPerPosizione(_event);
}

/**
 * Apre la lookup che gestisce l'assegnazione delle sedi di lavoro 
 * alla posizione INAIL selezionata
 * 
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"1B94C0E5-0528-41C2-B689-0DCF130FA986"}
 */
function apriGestioneSediPerPosizione(_event)
{
	if(foundset.ditte_to_ditte_inailgenerale && foundset.ditte_to_ditte_inailgenerale.getSize())
	{
		var params = {
			event : _event,
			returnForm : controller.getName(),
			lookup : 'LEAF_Lkp_DitteSediLavoro',
			allowInBrowse : true,
			multiSelect : true,
			methodToExecuteAfterMultipleSelection : 'AggiornaSelezioneSediInail',
			methodToAddFoundsetFilter : 'FiltraSediInail',
			selectedElements : globals.foundsetToArray(ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailsedi,'iddittasede')
		}
		
		globals.ma_utl_showLkpWindow(params);
	}
	else
	{
		var frmInail = forms.agd_inail_dati_generali_dtl_edit;
	    globals.ma_utl_showFormInDialog(frmInail.controller.getName(),'Inserisci una nuova sede INAIL'); 
	}
}

/**
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"116B9261-1A42-4EB4-931B-15AD42E15487"}
 */
function FiltraSediInail(_fs)
{
	_fs.addFoundSetFilterParam('idditta','=',idditta);
	return _fs;
}

/**
 * @param {Array<JSRecord>} _recs
 *
 * @properties={typeid:24,uuid:"1776D58B-8F0C-4771-9EC7-947E36A6E152"}
 * @AllowToRunInFind
 */
function AggiornaSelezioneSediInail(_recs)
{
	var _idDittaInailPosizione = ditte_to_ditte_inailposizioni.iddittainailposizione;
	
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_inailsedi>}*/
	var fsSediInail = ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailsedi//databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INAIL_SEDI);
	if(fsSediInail.find())
	{
		fsSediInail.iddittainailposizione = _idDittaInailPosizione;
		fsSediInail.search();
		
		while(fsSediInail.getSize())
			if(!fsSediInail.deleteRecord())
			   globals.ma_utl_showErrorDialog('Errore durante l\'eliminazione della sede ' + 
				                              fsSediInail.ditte_inailsedi_to_ditte_sedi.descrizione +
											  ' per la posizione','Sedi INAIL per la posizione');
	}
	
	// fase di inserimento nuovi record
	databaseManager.startTransaction();
	for(var r = 0; r < _recs.length; r++)
	{
		var _idDittaSede = _recs[r];
				
		var recSediInail = fsSediInail.getRecord(fsSediInail.newRecord());
		if(recSediInail)
		{
			recSediInail.iddittainailposizione = _idDittaInailPosizione;
			recSediInail.iddittasede = _idDittaSede;
		}
	}
	
	if(!databaseManager.commitTransaction())
	{
		var failedrecords = databaseManager.getFailedRecords();
		if (failedrecords && failedrecords.length > 0)
		{
			for(var fInd = 0; fInd < failedrecords.length; fInd++)
				application.output(failedrecords[fInd].exception.getErrorCode() + ' - ' + failedrecords[fInd].exception.getMessage(),LOGGINGLEVEL.WARNING);
		}
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Inserimento sedi INAIL per la posizione non riuscito');
	    return;
	}
	
}

/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"5AC5B1E7-3913-4167-A685-09E51084F3B4"}
*/
function dc_edit(event, triggerForm, forceForm) 
{
	apriGestioneSediPerPosizione(event);
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"CBA60E30-5136-4F02-B287-938B3ABDB1FF"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	apriGestioneSediPerPosizione(_event);
}