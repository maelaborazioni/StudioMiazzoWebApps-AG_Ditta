/**
 * Salva la nuova anagrafica esterna ditta ed i dati inseriti per la gestione presenze 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"19904CD6-8EAF-4445-9536-A43C0599F980"}
 */
function confermaNuovaDittaEsterna(event) 
{
	if(validaDatiDitta())
    {
		var params = {
	        processFunction: process_save_ditta_esterna,
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
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"99E0078A-B8B6-455F-98B9-0457899B10BE"}
 */
function process_save_ditta_esterna(event)
{
	try {

		databaseManager.setAutoSave(false);
		databaseManager.startTransaction();

		// crea l'anagrafica ditta
		var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE);

		/** @type {JSRecord<db:/ma_anagrafiche/ditte>} */
		var newDitta = fs.getRecord(fs.newRecord());
		if (!newDitta)
			throw new Error('Errore durante la creazione della ditta');

		newDitta.codice = _codice;
		newDitta.ragionesociale = _ragioneSociale;
		newDitta.tipologia = globals.Tipologia.ESTERNA;

		if (_codTipoSoggetto)
			newDitta.codtiposoggetto = _codTipoSoggetto;
		if (_codNaturaGiuridica)
			newDitta.codnaturagiuridica = _codNaturaGiuridica;
		if (_partitaIVA)
			newDitta.partitaiva = _partitaIVA;
		if (_codiceFiscale)
			newDitta.codicefiscale = _codiceFiscale;

		/** @type {JSRecord<db:/ma_anagrafiche/ditte_indirizzi>} */
		var newDittaIndirizzo = newDitta.ditte_to_ditte_indirizzi.getRecord(newDitta.ditte_to_ditte_indirizzi.newRecord());
		if (!newDittaIndirizzo)
			throw new Error('Errore durante la creazione dell\'indirizzo della nuova ditta esterna');
		newDittaIndirizzo.indirizzo = _indirizzoSedeLegale;
		newDittaIndirizzo.codtipoindirizzo = globals.TipiIndirizzoDitta.SEDE_LEGALE;
		newDittaIndirizzo.descrizione = 'Sede legale';
		newDittaIndirizzo.codcomune = _codComuneSedeLegale;
		newDittaIndirizzo.cap = _capSedeLegale;
		newDittaIndirizzo.codstatoestero = '1';

		var _dataRilevazione = new Date();
		newDittaIndirizzo.datarilevazione = _dataRilevazione;

		// nel caso di ditta di tipologia esterna vanno compilati i dati
		// relativi al legame con una ditta standard ed alla gestione delle ore
		if (newDitta.tipologia == globals.Tipologia.ESTERNA) {
			// crea il record in ditte_legami per le ditte esterne di tipo interinale
			if (_tipoEsterni == 0) {
				/** @type {JSRecord<db:/ma_anagrafiche/ditte_legami>} */
				var newDittaLegame = newDitta.ditte_to_ditte_legami.getRecord(newDitta.ditte_to_ditte_legami.newRecord());
				if (!newDittaLegame)
					throw new Error('Errore durante la creazione del legame della ditta esterna');

				newDittaLegame.iddittariferimento = _idDittaLegata;
				newDittaLegame.idditta = newDitta.idditta;
				newDittaLegame.tipoesterni = _tipoEsterni;
			}

			// crea il record in ditte_presenze per la gestione con EpiWeb
			/** @type {JSRecord<db:/ma_anagrafiche/ditte_presenze>} */
			var newDittaGestEpiWeb = newDitta.ditte_to_ditte_presenze.getRecord(newDitta.ditte_to_ditte_presenze.newRecord());

			if (!newDittaGestEpiWeb)
				throw new Error('Errore durante la creazione del record relativo alle presenze');

			newDittaGestEpiWeb.ore_gestioneepi2 = 1;
			newDittaGestEpiWeb.ore_iniziogestione = _periodoInizioGestione;
			newDittaGestEpiWeb.ore_finegestione = _periodoFineGestione;
			newDittaGestEpiWeb.ore_gestionemp = _mesePrecedente;
			newDittaGestEpiWeb.ore_gestioneturno = _gestioneTurnisti;
			newDittaGestEpiWeb.ore_utilizzatracciato = _usaTracciato;
			newDittaGestEpiWeb.timbrature_gestioneorologio = _gestioneOrologio;
			newDittaGestEpiWeb.timbrature_ggsuccessivo = _gestioneGGSucc;
		}

		var success = databaseManager.commitTransaction();
		if (!success) {
			var failedRecords = databaseManager.getFailedRecords();
			if (failedRecords && failedRecords.length > 0)
				throw new Error('Errore durante la creazione della ditta esterna: ' + failedRecords[0].exception.getMessage());
		}

		if (_indirizzoAggiuntivo != '' || _codComuneAggiuntivo != '') {
			databaseManager.startTransaction();

			// gestiamolo momentaneamente come un indirizzo di tipo UNITA' OPERATIVA
			/** @type {JSRecord<db:/ma_anagrafiche/ditte_indirizzi>} */
			var newDittaIndirizzoAgg = newDitta.ditte_to_ditte_indirizzi.getRecord(newDitta.ditte_to_ditte_indirizzi.newRecord());
			if (!newDittaIndirizzoAgg)
				throw new Error('Errore durante la creazione dell\'indirizzo della nuova ditta');
			newDittaIndirizzoAgg.indirizzo = _indirizzoAggiuntivo;
			newDittaIndirizzoAgg.codtipoindirizzo = globals.TipiIndirizzoDitta.UNITA_OPERATIVA;
			newDittaIndirizzoAgg.descrizione = 'Unità operativa';
			newDittaIndirizzoAgg.codcomune = _codComuneAggiuntivo;
			newDittaIndirizzoAgg.cap = _capAggiuntivo;
			newDittaIndirizzoAgg.codstatoestero = '1';
			newDittaIndirizzoAgg.datarilevazione = _dataRilevazione;

			success = databaseManager.commitTransaction();
			if (!success) {
				var failedRecordsEst = databaseManager.getFailedRecords();
				if (failedRecordsEst && failedRecordsEst.length > 0)
					throw new Error('Errore durante il salvataggio dell\'indirizzo della ditta esterna: ' + failedRecordsEst[0].exception.getMessage());
			}
			setStatusSuccess('Salvataggio ditta avvenuto!', null, 1000);
		}

		databaseManager.refreshRecordFromDatabase(fs, -1);
		globals.lookupFoundset(newDitta.idditta, forms.agd_header_dtl.foundset);
		globals.ma_utl_setStatus(globals.Status.BROWSE, controller.getName());
		globals.svy_mod_closeForm(event);

	} catch (ex) {
		application.output(ex.message, LOGGINGLEVEL.ERROR);
		databaseManager.rollbackTransaction();
		globals.ma_utl_setStatus(globals.Status.BROWSE, controller.getName());
		globals.svy_mod_closeForm(event);
		setStatusError('Inserimento ditta esterna non riuscito. Contattare lo studio', null, 1000);
	} finally {
		databaseManager.setAutoSave(false);
		plugins.busy.unblock();
	}
	
}

/**
 * Handle changed data.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9323C980-CD56-48A8-B2EA-7AEA7F5C4975"}
 */
function onDataChangeTipoLegame(oldValue, newValue, event) 
{
	if(newValue == 0)
	{
		_codiceLegata = null;
		_ragioneSocialeLegata = null;
	}
	
    elements.fld_codice_legata.enabled =
	   elements.fld_ragione_sociale_legata.enabled = 
		   elements.lbl_codice_legata.enabled = 
			   elements.lbl_ragione_sociale_legata.enabled =
				   elements.btn_selditta.enabled = newValue;
				   
	return true;			   
}

/**
*
* @param _firstShow
* @param _event
*
* @properties={typeid:24,uuid:"B7CEB1D5-A4BB-4674-938B-9EE0D86EB527"}
*/
function onShowForm(_firstShow, _event) 
{
	_super.onShowForm(_firstShow, _event);
	plugins.busy.prepare();
}
