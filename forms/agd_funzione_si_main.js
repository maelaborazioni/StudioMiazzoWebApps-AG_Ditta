/**
 * @properties={typeid:24,uuid:"E1454E07-6C20-43A4-A0C4-6C70E15EA342"}
 */
function filterData(fs)
{
	_super.filterData(ditte_to_ditte_funzionipersone_sicurezza);
}

/**
 * @properties={typeid:24,uuid:"FF0175B6-B53C-478B-9E68-8C452C39E7B2"}
 */
function unfilterData(fs)
{
	_super.unfilterData(ditte_to_ditte_funzionipersone_sicurezza)
}

/**
 * @properties={typeid:24,uuid:"1675EB91-1863-47F4-92AA-842037BABD0B"}
 */
function sortFoundset(fs)
{
	_super.sortFoundset(ditte_to_ditte_funzionipersone_sicurezza);
}

/**
 * @properties={typeid:24,uuid:"154D43D7-26E4-480E-B3F9-F998E755DACC"}
 */
function aggiungiResponsabile(event, callback)
{
	_super.aggiungiResponsabile(
		 event
		,impostaSedeTurno
	);
}

/**
 * @properties={typeid:24,uuid:"482A2EE9-CC30-4B84-9BC0-50CA291179A1"}
 */
function compilaResponsabile(event,record)
{
	var success = _super.compilaResponsabile(event,record);
	if(success && record && record.coincidecon && record.codtipofunzione === globals.codDATORELAVORO)
	{
		/**
		 * Imposta "Il datore coincide con il legale rappresentante" se necessario
		 */
		/** @type {JSFoundSet<db:/ma_anagrafiche/tab_tipifunzione>} */
		var fs = record.foundset.ditte_funzionipersone_to_tab_tipifunzione;
		if(fs && fs.tab_tipifunzione_to_tab_tipifunzione_altrafigura && fs.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codice === globals.codLEGALERAPPRESENTANTE)
		{
			var sicurezzaFs = ditte_to_sicurezza_datigenerali;
			if(sicurezzaFs)
			{
				sicurezzaFs.datorelegalerapp = 1;
			}
			return true;
		}
	}
	
	return success;
}

/**
 * @protected 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"4EDD264A-15D0-4A6A-ADAF-D25BDD6E3A3C"}
 */
function filterRuolo(fs)
{
	fs.addFoundSetFilterParam('codambito', 'LIKE', globals.codSICUREZZA + '%');

	return fs;
}

/**
 * @protected 
 * @param {JSFoundset} _foundset
 *
 *
 * @properties={typeid:24,uuid:"153AFB01-E04D-440A-A2F3-D33FA7E0061F"}
 */
function filterSede(_foundset)
{
	_foundset = _super.filterSede(_foundset);
	_foundset.addFoundSetFilterParam('codtiposede', '=', globals.codSEDEOPERATIVA, 'sicurezza2TipoSedeFilter');
	return _foundset;
}

/**
 * @properties={typeid:24,uuid:"93900827-5F4B-4A1F-9220-CC70A4A6118D"}
 */
function getEditFormName()
{
	return forms.agd_funzione_si_edit.controller.getName();
}

/**
 * @properties={typeid:24,uuid:"8449BFDA-36F9-4AA2-9A84-43B41A922444"}
 */
function showLkpSede(event)
{
	return globals.ma_utl_showLkpWindow({ event: event, returnForm: controller.getName(), lookup: 'AG_Lkp_Sede', methodToAddFoundsetFilter: 'filterSede', allowInBrowse: true, verbose: false });
}

/**
 * @properties={typeid:24,uuid:"46386D04-835F-4A15-AB8C-7BCECDC323C7"}
 */
function showLkpTurno(event)
{
	return globals.ma_utl_showLkpWindow({ event: event, returnForm: controller.getName(), lookup: 'AG_Lkp_Turno', methodToAddFoundsetFilter: 'filterTurno', allowInBrowse: true, verbose: false });
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4DC24D93-985D-47A3-B405-494C92E5FD65"}
 */
function editRecord(event)
{
	/**
	 * Chiedi di nuovo di specificare turno e sede per i responsabili della sicurezza
	 */
	if(impostaSedeTurno(event, getEditFoundset().getSelectedRecord()))	
		_super.editRecord(event);
}

/**
 * @properties={typeid:24,uuid:"890D05FC-407E-4C47-BFF7-01032D72E20D"}
 */
function impostaSedeTurno(event, record)
{
	 // TODO Rimuovere, poiché il tab è automaticamente disabilitato
	 /**
	  * Controlla che il datore di lavoro sia nominato. Altrimenti l'inserimento
	  * dei responsabili della sicurezza è disabilitato.
	  */
	 var sicurezzaFoundset = ditte_to_sicurezza_datigenerali
	 if(sicurezzaFoundset && !ditte_to_sicurezza_datigenerali.datorenominato)
		 throw new Error('Il datore di lavoro non è nominato ai sensi del dlgs 81');
	 
	 /**
	  * Il datore di lavoro non è associato ad alcuna sede o turno
	  */
	 if(record.codtipofunzione !== globals.codDATORELAVORO)
	 {
		 /**
		  * Imposta la sede, se presente
		  */
		 if(sicurezzaFoundset && sicurezzaFoundset.abilitatosede && ditte_to_ditte_sedi)
		 {
			 pkSede = null;
			 pkSede = showLkpSede(event);
			 
			 if(pkSede)
			 {
				 var newSedeRecord = record.ditte_funzionipersone_to_ditte_funzionipersonesedi.getRecord(record.ditte_funzionipersone_to_ditte_funzionipersonesedi.newRecord());
				 	 newSedeRecord.iddittasede = pkSede;
			 }
		 }
			
		 /**
		  * Imposta il turno, se presente
		  */
		 if(sicurezzaFoundset && sicurezzaFoundset.abilitatoturni && ditte_to_ditte_turni)
		 {
			 pkTurno = null;
			 pkTurno = showLkpTurno(event);
			 
			 if(pkTurno)
			 {
				 var newTurnoRecord = record.ditte_funzionipersone_to_ditte_funzionipersoneturni.getRecord(record.ditte_funzionipersone_to_ditte_funzionipersoneturni.newRecord());
				 	 newTurnoRecord.iddittaturno = pkTurno;
			 }
		 }
	 }
		 
	 return true;
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_funzionipersone>} fs
 * @param {Boolean} multiDelete
 *
 * @properties={typeid:24,uuid:"B3ACB666-3318-4B35-AAD1-F5FC9267559C"}
 */
function dc_delete_pre_action(fs, multiDelete)
{
	/**
	 * Se sto eliminando il datore di lavoro attivo, e questi coincide con il
	 * legale rappresentante, imposta tale variabile a false.
	 */
	var dl = globals.getDatoreLavoro(fs.idditta);
	if (dl && dl.iddittafunzionepersona === fs.iddittafunzionepersona)
	{
		var sicurezzaFs = fs.ditte_funzionipersone_to_ditte && fs.ditte_funzionipersone_to_ditte.ditte_to_sicurezza_datigenerali;
		if(sicurezzaFs)
			sicurezzaFs.datorelegalerapp = sicurezzaFs.datorelegalerapp && 0;
	}
}
