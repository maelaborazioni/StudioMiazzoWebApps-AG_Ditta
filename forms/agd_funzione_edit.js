/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"98425C02-DB9A-45A0-98AD-75C47A2608F0",variableType:-4}
 */
var _close = false;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E4A3ACE7-7DD8-4D49-A90C-2175115BFCB5"}
 */
var validationProgram = 'AG_Req_Funzionipersone';

///**
// * @properties={typeid:24,uuid:"EFEF5D6F-FBEF-4B61-8323-50A2AA0448F5"}
// */
//function onHide(event)
//{
//	if(_super.onHide(event))
//	{
//		gotoBrowse();
//		return _close;
//	}
//	
//	return false;
//}

/**
 * @properties={typeid:24,uuid:"024C1B45-1EA7-442F-BDA3-77BDE819AD5E"}
 */
function gotoBrowse()
{
	_super.gotoBrowse();
	setFormStatus(globals.Status.BROWSE);
}

/**
 * @properties={typeid:24,uuid:"AA1DAD43-CDB6-411F-840B-C5DBFE22D394"}
 */
function gotoEdit()
{
	_super.gotoEdit();
	setFormStatus(globals.Status.EDIT);
}

/** *
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_funzionipersone>} _foundset
 *
 * @properties={typeid:24,uuid:"AF48B294-9181-4FB2-9543-4B8FCD2B01DB"}
 */
function dc_save_pre(_foundset)
{
	var retValue = _super.dc_save_pre(_foundset);
	if(_foundset.ditte_funzionipersone_to_persone && _foundset.ditte_funzionipersone_to_persone.codicefiscale !== _foundset.codicefiscale)
		_foundset.codicefiscale = _foundset.ditte_funzionipersone_to_persone.codicefiscale;
		
	return retValue;
}

/**
 * @properties={typeid:24,uuid:"007AFC27-3AEE-4C69-8DA5-D1C7903F1189"}
 */
function setFormStatus(status)
{
	databaseManager.setAutoSave(false);
	
	// interno
	elements.datianagrafici_tabless.tabIndex = 1;
	
	/**
	 *  Abilita o disabilita i dettaglio della persona in base alla tipologia
	 */
	var editDisabledIndex = 0;
	var funzione = foundset.getSelectedRecord();
	
	if(!funzione)
		throw new Error('Nessuna funzione definita');

	// La funzione coincide con un altra figura
	if(funzione.coincidecon > 0)
	{
		
		var altraFigura = funzione.ditte_funzionipersone_to_ditte_funzionipersone_coincidecon;
		if (altraFigura.idlavoratore && (altraFigura.personainterna || !altraFigura.manuale))
			// altra figura interna
			elements.datianagrafici_tabless.tabIndex = 'altrafigura_lavoratore_tab';
		else
			// altra figura esterna
			elements.datianagrafici_tabless.tabIndex = 'altrafigura_persona_tab';
	}
	// Persona manuale o funzione non coincidente con altra figura
	else
	if(funzione.manuale && funzione.codicefiscale)
	{
		// esterno
		if(!funzione.personainterna)
			editDisabledIndex = 1;
		
		elements.datianagrafici_tabless.tabIndex = 'persona_tab';
	}
	
	var tabIndex = elements.datianagrafici_tabless.tabIndex;
	
	/** @type {RuntimeTabPanel} */
	var datianagraficiTabless = forms[elements.datianagrafici_tabless.getTabFormNameAt(tabIndex)].elements['datianagrafici_tabless'];
	var tabForms = globals.getPanelForms(datianagraficiTabless);
	
	var i;
	for(i = 0; i < editDisabledIndex; i++)
		globals.ma_utl_setStatus(status, tabForms[i], null, 'AG_Req_Persona');
	
	for(i = editDisabledIndex; i < tabForms.length; i++)
		globals.ma_utl_setStatus(globals.Status.BROWSE, tabForms[i]);
}

/**
 * @properties={typeid:24,uuid:"A79BEC00-A13C-421A-A947-6DEF43A16889"}
 * @AllowToRunInFind
 */
function dc_save_validate(_foundset, _program)
{
	try
	{
		var fs = foundset;
		
		var relName = 'ditte_funzionipersone_to_lavoratori';
		var validationObjects = [];
		if(fs.personainterna)
		{
			validationObjects.push(
					// Data revoca
					 { dateToValidate: 'datarevoca', dateToCompareWith: relName + '.assunzione'	  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di revoca deve essere maggiore o uguale alla data di assunzione (@dateToCompareWith)' }
					,{ dateToValidate: 'datarevoca', dateToCompareWith: relName + '.cessazione'	  , operator: globals.ComparisonOperator.LE, overwrite: true }
					,{ dateToValidate: 'datarevoca', dateToCompareWith: 'datanomina'		   	  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di revoca deve essere maggiore o uguale alla data di nomina' }
					,{ dateToValidate: 'datarevoca', dateToCompareWith: 'datascadenza'		   	  , operator: globals.ComparisonOperator.LE, errorMessage: 'La data di revoca deve essere minore o uguale alla data di scadenza' }
					
					// Data scadenza
					,{ dateToValidate: 'datascadenza', dateToCompareWith: relName + '.assunzione' , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di scadenza deve essere maggiore o uguale alla data di assunzione (@dateToCompareWith)'}
					,{ dateToValidate: 'datascadenza', dateToCompareWith: relName + '.cessazione' , operator: globals.ComparisonOperator.LE, overwrite: true }
					,{ dateToValidate: 'datascadenza', dateToCompareWith: 'datanomina'			  , operator: globals.ComparisonOperator.GT, errorMessage: 'La data di scadenza deve essere maggiore o uguale alla data di nomina' }
					
					// Data nomina
					,{ dateToValidate: 'datanomina', dateToCompareWith: relName + '.assunzione'	  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di nomina deve essere maggiore o uguale alla data di assunzione (@dateToCompareWith)' }
					,{ dateToValidate: 'datanomina', dateToCompareWith: relName + '.cessazione'	  , operator: globals.ComparisonOperator.LE, overwrite: true }
					
					// Data firma
					,{ dateToValidate: 'datafirma', dateToCompareWith: relName + '.assunzione'	  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di assunzione (@dateToCompareWith)' }
					,{ dateToValidate: 'datafirma', dateToCompareWith: relName + '.cessazione'	  , operator: globals.ComparisonOperator.LE, overwrite: true }
					,{ dateToValidate: 'datafirma', dateToCompareWith: 'datanomina'				  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di nomina' }
					
					// Data scadenza formazione
					,{ dateToValidate: 'datascadenzaformazione', dateToCompareWith: relName + '.assunzione'	  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di assunzione (@dateToCompareWith)' }
					,{ dateToValidate: 'datascadenzaformazione', dateToCompareWith: relName + '.cessazione'	  , operator: globals.ComparisonOperator.LE, overwrite: true }
					,{ dateToValidate: 'datascadenzaformazione', dateToCompareWith: 'datanomina'			  , operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di nomina' }
			);
		
			// Persona interna coincide con un altro responsabile, interno o meno
			/** @type {JSRecord<db:/ma_anagrafiche/ditte_funzionipersone>} */
			var coincideCon = fs.ditte_funzionipersone_to_ditte_funzionipersone_coincidecon && fs.ditte_funzionipersone_to_ditte_funzionipersone_coincidecon.getSelectedRecord();
			if(coincideCon)
			{
				var descrizione = coincideCon.ditte_funzionipersone_to_tab_tipifunzione.descrizione;
				validationObjects.push(
					 { dateToValidate: 'datarevoca'		, dateToCompareWith: coincideCon.datanomina, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di revoca deve essere maggiore o uguale alla data di nomina del<br/>' + descrizione }
					,{ dateToValidate: 'datascadenza'	, dateToCompareWith: coincideCon.datanomina, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di scadenza deve essere maggiore o uguale alla data di nomina del<br/>' + descrizione }
					,{ dateToValidate: 'datanomina'		, dateToCompareWith: coincideCon.datanomina, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di nomina deve essere maggiore o uguale alla data di nomina del<br/>' + descrizione }
					,{ dateToValidate: 'datafirma'		, dateToCompareWith: coincideCon.datanomina, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di nomina del<br/>' + descrizione }
				);
			}
		}
		else
		{
			validationObjects.push(
					// Data revoca
					 { dateToValidate: 'datarevoca'				, dateToCompareWith: 'datanomina'	, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di revoca deve essere maggiore o uguale alla data di nomina' }
					,{ dateToValidate: 'datarevoca'				, dateToCompareWith: 'datascadenza'	, operator: globals.ComparisonOperator.LE, errorMessage: 'La data di revoca deve essere minore o uguale alla data di scadenza' }
					
					// Data scadenza
					,{ dateToValidate: 'datascadenza'			, dateToCompareWith: 'datanomina'	, operator: globals.ComparisonOperator.GT, errorMessage: 'La data di scadenza deve essere maggiore o uguale alla data di nomina' }
					
					// Data scadenza formazione
					,{ dateToValidate: 'datascadenzaformazione'	, dateToCompareWith: 'datanomina'	, operator: globals.ComparisonOperator.GT, errorMessage: 'La data di scad. formazione deve essere maggiore o uguale alla data di nomina' }
					
					// Data firma
					,{ dateToValidate: 'datafirma'				, dateToCompareWith: 'datanomina'	, operator: globals.ComparisonOperator.GE, errorMessage: 'La data di firma deve essere maggiore o uguale alla data di nomina' }
			);
		}
		
		var success = _super.dc_save_validate(_foundset, validationProgram) !== -1 && _super.dc_save_validate(_foundset, 'AG_Req_Persona') !== -1;
			success = success && globals.validateDate(fs.getSelectedRecord(), validationObjects);
		
		/**
		 * Valida i dati anagrafici
		 */
		if(!coincidecon && !personainterna && manuale)
			success = success && globals.validatePerson(ditte_funzionipersone_to_persone.getSelectedRecord(), forms.agp_datianagrafici_dtl.vLookForDuplicates);
					
		return success  ? 0 : -1;
	}
	catch(ex)
	{
		if(ex.pk)
		{
			var pk = ex.pk;
			
			/**
			 * Chiedi se caricare una persona già presente nel DB
			 */
			var answer = globals.ma_utl_showYesNoQuestion(ex.message + ', caricare i dati relativi?');
			if(answer)
			{
				/**
				 * Elimina la persona creata precedentemente ed imposta quella già esistente
				 */
				// Memorizza il record da eliminare
				var recordToDelete = ditte_funzionipersone_to_persone.getSelectedRecord();
				
				databaseManager.startTransaction();
				
				// Imposta un codice fiscale fasullo per evitare la cancellazione dei dati
				// anagrafici collegati alla persona già esistente
				codicefiscale = 'XXXXXX00X00X000X';
				ditte_funzionipersone_to_persone.codicefiscale = 'XXXXXX00X00X000X';
				
				// Elimina il record corrente
				recordToDelete.foundset.deleteRecord(recordToDelete);
				
				// Imposta la nuova persona
				codicefiscale = pk;
				ditte_funzionipersone_to_persone.loadAllRecords();
				
				databaseManager.commitTransaction();
				
				// Ricarica i dati da db
				databaseManager.refreshRecordFromDatabase(ditte_funzionipersone_to_persone, -1);
				
				/**
				 * Imposta la persona come manuale interna
				 */
				personainterna = 1;
				
				return 0;
			}
			
			return -1;
		}
		
		globals.ma_utl_showErrorDialog(ex);
		application.output(ex, LOGGINGLEVEL.ERROR);
		
		return -1;
	}
}
