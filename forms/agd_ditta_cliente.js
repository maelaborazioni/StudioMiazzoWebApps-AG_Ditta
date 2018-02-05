/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"B8AC9E1A-0267-4D8C-9807-5F05AAD2BBFA"}
 */
var _partitaIva = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7BD35096-5EF1-4D16-A2D0-24BFBE8D8121",variableType:4}
 */
var _vChkEsclusivoDitta = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"97C12549-1316-41BB-8DEB-9045ACD3AAA8"}
 */
var _note = '';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7C98E404-904F-4B63-A079-B9468FEDA242"}
 */
function confermaNuovaAnagraficaDittaCliente(event) 
{
	if(validaDatiDitta())
	{
		var params = {
	        processFunction: process_save_ditta_cliente,
	        message: '', 
	        opacity: 0.5,
	        paneColor: '#434343',
	        textColor: '#EC1C24',
	        showCancelButton: false,
	        cancelButtonText: '',
	        dialogName : '',
	        fontType: 'Arial,4,25',
	        processArgs: [event]
	    };
		plugins.busy.block(params);
	}
	else
		setStatusWarning('Controlla i dati inseriti prima di proseguire',null,1500);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"96B7EB58-E686-4E61-97D0-2F9AF3DDCA98"}
 */
function process_save_ditta_cliente(event)
{
	try
	{	     
    	var autosave = databaseManager.getAutoSave();
    	
    	databaseManager.setAutoSave(false);
    	databaseManager.startTransaction();
    	
    	// crea la ditta    	
    	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE);
    	
    	/** @type {JSRecord<db:/ma_anagrafiche/ditte>} */
    	var newDitta = fs.getRecord(fs.newRecord());
    	if(!newDitta)
    		throw new Error('Errore durante la creazione della ditta');
    	
    	newDitta.codice = _codice;
    	newDitta.ragionesociale = _ragioneSociale;
    	newDitta.partitaiva = _partitaIva;
    	newDitta.tipologia = globals.Tipologia.CLIENTE; // tipologia = 4 si riferisce alle ditte-clienti commesse 
    	
    	var success = databaseManager.commitTransaction();
    	if(!success)
	    {
	 	   var failedRecords = databaseManager.getFailedRecords();
 		   if (failedRecords && failedRecords.length > 0)
				   throw new Error('Errore durante la creazione della ditta esterna: ' + failedRecords[0].exception.getMessage());
	    }
    	
	    globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
    	globals.svy_mod_closeForm(event);
    	databaseManager.refreshRecordFromDatabase(fs,-1);
	}
	catch(ex)
	{
		application.output(ex.message, LOGGINGLEVEL.ERROR);
		databaseManager.rollbackTransaction();
			
		setStatusError(ex.message,null,1500);
	}
	finally
	{
		databaseManager.setAutoSave(autosave);
		plugins.busy.unblock();
	}
	
	
}

/**
 * Chiude la finestra di inserimento lasciando invariati i dati
 * esistenti
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CF43D017-8F00-41C1-B1FE-532D84437710"}
 */
function annullaInserimentoNuovaAnagraficaDittaCliente(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * @param {JSRecord} _rec
 * 
 * @properties={typeid:24,uuid:"62BFFF96-F85F-4C00-BD43-C4122E79134A"}
 * @AllowToRunInFind
 */
function AggiornaSelezioneDittaEsclusiva(_rec) 
{	
	_idDittaLegata = _rec['idditta'];
	_codiceLegata = _rec['codice'];
	_ragioneSocialeLegata = _rec['ragionesociale'];		
}

/** 
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"9A31A942-B80F-4935-B81B-9592D461F3BD"}
 */
function onShowForm(_firstShow, _event) 
{
	_super.onShowForm(_firstShow, _event);
	
	_codice = null;
	_ragioneSociale = '';
	_codiceLegata = null;
	_ragioneSocialeLegata = '';
	_vChkEsclusivoDitta = 0;
	_note = '';
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
}

