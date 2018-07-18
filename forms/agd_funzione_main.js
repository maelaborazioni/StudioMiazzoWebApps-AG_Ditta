/**
 * @properties={typeid:35,uuid:"5AC13E60-928A-4C02-B6A7-D3B952D9C64C",variableType:-4}
 */
var pkLav = null;

/**
 * @properties={typeid:35,uuid:"FF399660-5A24-4C3E-B999-3F4EAC97B90B",variableType:-4}
 */
var pkRuolo = null;

/**
 * @properties={typeid:35,uuid:"07D618E1-35E0-412B-B9CF-526AEAB3DBB0",variableType:-4}
 */
var pkSede = null;

/**
 * @properties={typeid:35,uuid:"245C146E-C9E0-46BC-A2EA-85BAB349BF12",variableType:-4}
 */
var pkTurno = null;

/**
 * @properties={typeid:24,uuid:"67C76F4C-C477-4B82-8B62-11F2114882BD"}
 */
function getButtonObject()
{
	var fs = getEditFoundset();
	
	var btnObj = _super.getButtonObject();
//		btnObj.btn_new = { enabled: fs && fs.getSize() === 0 };
		btnObj.btn_edit = { enabled: fs && fs.getSize() > 0 };
		btnObj.btn_delete = { enabled: fs && fs.getSize() > 0 };
		
	return btnObj;
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_funzionipersone>} fs
 * 
 * @properties={typeid:24,uuid:"093FBAFB-2372-494B-B3FA-514050C8BABA"}
 * @AllowToRunInFind
 */
function filterData(fs)
{
	if(fs && fs.find())
	{
		fs.datarevoca = '^||>=' + globals.formatForFind(globals.TODAY);
		fs.datacessazione = '^||>=' + globals.formatForFind(globals.TODAY);
		fs.search();
		
		fs && fs.getSize() > 0 && fs.sort(sortFunction);
	}
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_funzionipersone>} fs
 *  
 * @properties={typeid:24,uuid:"670DE91D-A822-4DBE-8E52-247F2A624625"}
 */
function unfilterData(fs)
{
	if(fs)
	{
		fs.loadAllRecords();
		fs && fs.getSize() > 0 && fs.sort(sortFunction);
	}
}

/**
 * @param {JSRecord} first
 * @param {JSRecord} second
 *
 * @properties={typeid:24,uuid:"25A6F805-A59D-4283-A60C-9A968668860C"}
 */
function sortFunction(first, second)
{
	var comparison = globals.nullFirstComparator(first, second, 'datarevoca', globals.OrderType.DESC);
	var secondComparison = globals.nullFirstComparator(first, second, 'datacessazione', globals.OrderType.DESC);
	
	return comparison ? comparison : secondComparison;
}

/**
 * @AllowToRunInFind
 * 
 * @param {JSEvent} event
 * @param {Function} [callback]
 *
 * @properties={typeid:24,uuid:"35EC2781-7E91-4BC3-953A-0680C272BC19"}
 */
function aggiungiResponsabile(event, callback)
{
	try
	{
		databaseManager.setAutoSave(false);
		
		pkRuolo = null;
		showLkpRuolo(event);
		
		if(!pkRuolo)
		{
			databaseManager.revertEditedRecords();
			return;
		}
		
		var ruolo = null;
		
		/** @type {JSFoundSet<db:/ma_anagrafiche/tab_tipifunzione>} */
		var ruoloFs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, 'tab_tipifunzione');
		if(ruoloFs && ruoloFs.find())
		{
			ruoloFs[databaseManager.getTable(ruoloFs.getDataSource()).getRowIdentifierColumnNames()[0]] = pkRuolo
			ruoloFs.search();
			ruolo = ruoloFs.getSelectedRecord();
		}
		else
		{
			databaseManager.revertEditedRecords();
			return;
		}
		
		/** @type {JSRecord<db:/ma_anagrafiche/ditte_funzionipersone>} */
		var newRecord = ditte_to_ditte_funzionipersone.getRecord(ditte_to_ditte_funzionipersone.newRecord());
			newRecord.idditta = idditta;
			newRecord.codtipofunzione = ruolo.codice;
			newRecord.codambito = ruolo.codambito;
			newRecord.numprog = globals.getNextProgNumber(ruolo.codice, idditta);
			
		/**
		 * Esegui eventuali azioni aggiuntive. Interrompi se necessario
		 */
		var stop = false;
		if(callback)
			stop = !callback(event, newRecord);
		
		if(!stop)
		{
			/**
			 * Controlla che il ruolo non sia già ricoperto, in caso di inserimento
			 * di personale attivo
			 */
			if(!isInShowHistory)
				globals.validateFunzionePersona(newRecord);
			
			/**
			 * Compila il responsabile
			 */
			if(!compilaResponsabile(event, newRecord))
				return;
			
//			/**
//			 * Controlla che il ruolo non sia già ricoperto
//			 */
//			if(!isInShowHistory)
//				globals.validateFunzionePersona(newRecord);
//			
//			if(ruolo.abilitatoesterno)
//			{
//				if(!ruolo.abilitatointerno && !ruolo.abilitatoaltrafigura)
//					answer = true;
//				else
//					answer = globals.ma_utl_showYesNoQuestion('Impostare un lavoratore esterno?', 'Responsabile');
//					
//				if(answer)
//				{
//					/**
//					 * Crea sia la funzione sia la persona fisica.
//					 * Poiché la relazine è basata su codice fiscale, che non è conosciuto
//					 * al momento della creazione, è necessario creare due record separati
//					 */
//					
//					newRecord.codicefiscale = 'XXXXXX00X00X000X';
//					newRecord.manuale = 1;
//					newRecord.personainterna = 0;
//					
//					/**
//					 * Crea la persona associata
//					 */
//					newRecord.ditte_funzionipersone_to_persone.newRecord();
//				}
//			}
//			
//			/**
//			 * Gestisci personale non esterno
//			 */
//			if(!answer)
//			{
//				/**
//				 * Lavoratore interno
//				 */
//				if(ruolo.abilitatointerno)
//				{
//					if(!ruolo.abilitatoaltrafigura)
//						answer = true;
//					else
//						answer = globals.ma_utl_showYesNoQuestion('Impostare un lavoratore interno?','Responsabile');
//					
//					if(answer)
//					{
//						newRecord.personainterna = 1
//						var pkLav = showLkpLavoratori(event)
//						if(pkLav)
//						{
//							newRecord.idlavoratore = pkLav;
//							newRecord.codicefiscale = newRecord.ditte_funzionipersone_to_lavoratori.lavoratori_to_persone.codicefiscale;
//						}
//						else
//						{
//							_super.dc_cancel(event,controller.getName(),true)
//							return
//						}
//					}		
//				}
//			
//				/**
//				 * Datore di lavoro
//				 */
//				if(!answer && ruolo.abilitatoaltrafigura)
//				{
//					var descrizione = ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.descrizione;
//					
//					answer = globals.ma_utl_showYesNoQuestion('Coincide con ' + descrizione + '?','Responsabile');
//					if(answer)
//					{
//						var altraFigura = globals.getResponsabile(idditta, ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codice);
//						if(altraFigura)
//						{
//							newRecord.coincidecon = altraFigura.iddittafunzionepersona;
//							newRecord.personainterna = altraFigura.personainterna;
//							newRecord.idlavoratore = altraFigura.idlavoratore;
//							newRecord.codicefiscale = altraFigura.codicefiscale;
//						}
//						else
//						{
//							globals._showInfoDialog(descrizione + ' non presente', 'Responsabile');
//							databaseManager.revertEditedRecords();
//							return;
//						}
//					}
//				}
//				
//				if(!answer)
//				{
//					globals.ma_utl_showErrorDialog('Il ruolo scelto non permette l\'inserimento di alcun altro tipo di personale', 'Responsabile');
//					databaseManager.revertEditedRecords();
//					return;
//				}
//			}
		}
		
		showEditForm(globals.Status.ADD, 'Aggiungi responsabile', newRecord.foundset);
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex);
		
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.revertEditedRecords();
	}
}

/**
 * @param {JSEvent} event
 * @param {JSRecord<db:/ma_anagrafiche/ditte_funzionipersone>} record
 *
 * @properties={typeid:24,uuid:"D2A55F86-71C2-4821-B3DE-8792B63A9BC9"}
 */
function compilaResponsabile(event, record)
{
	var answer = false;
	
	var ruolo = record.ditte_funzionipersone_to_tab_tipifunzione;
	if (ruolo.abilitatoesterno)
	{
		if(!ruolo.abilitatointerno && !ruolo.abilitatoaltrafigura)
			answer = true;
		else
			answer = globals.ma_utl_showYesNoQuestion('Impostare un lavoratore esterno?', 'Responsabile');
			
		if(answer)
		{
			/**
			 * Crea sia la funzione sia la persona fisica.
			 * Poiché la relazione è basata su codice fiscale, che non è conosciuto
			 * al momento della creazione, è necessario creare due record separati
			 */
			record.codicefiscale = 'XXXXXX00X00X000X';
			record.manuale = 1;
			record.personainterna = 0;
			
			/**
			 * Crea la persona associata
			 */
			record.ditte_funzionipersone_to_persone.newRecord();
			
			return true;
		}
	}
	
	/**
	 * Gestisci personale non esterno
	 */
	if(!answer)
	{
		/**
		 * Lavoratore interno
		 */
		if(ruolo.abilitatointerno)
		{
			if(!ruolo.abilitatoaltrafigura)
				answer = true;
			else
				answer = globals.ma_utl_showYesNoQuestion('Impostare un lavoratore interno?','Responsabile');
			
			if(answer)
			{
				record.personainterna = 1;

				pkLav = null;
				pkLav = showLkpLavoratori(event);
				
				if(pkLav)
				{
					record.idlavoratore = pkLav;
					record.codicefiscale = record.ditte_funzionipersone_to_lavoratori.lavoratori_to_persone.codicefiscale;
				}
				else
				{
					return false;
				}
			}		
		}
	
		/**
		 * Altra figura
		 */
		if(!answer && ruolo.abilitatoaltrafigura)
		{
			var descrizione = ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.descrizione;
			
			answer = globals.ma_utl_showYesNoQuestion('Coincide con ' + descrizione + '?','Responsabile');
			if(answer)
			{
				var altraFigura = null;
				if(ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codambito, ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codice !== globals.codLEGALERAPPRESENTANTE)
					altraFigura = globals.getResponsabile(idditta, ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codambito, ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codice);
				else
					altraFigura = globals.getResponsabile(idditta, ruolo.tab_tipifunzione_to_tab_tipifunzione_altrafigura.codambito);
					
				if(altraFigura)
				{
					record.coincidecon = altraFigura.iddittafunzionepersona;
					record.personainterna = 1;
					record.idlavoratore = altraFigura.idlavoratore;
					record.codicefiscale = altraFigura.codicefiscale;
				}
				else
				{
					throw descrizione + ' non presente';
				}
			}
		}
		
		if(!answer)
		{
			throw 'Il ruolo scelto non permette l\'inserimento di alcun altro tipo di personale';
		}
		
		return true;
	}
	
	return false;
}

/**
 * @properties={typeid:24,uuid:"E05E58AE-96B3-4C81-A235-C9A0608570D9"}
 */
function filterRuolo(fs)
{
	return fs;
}

/**
 * @properties={typeid:24,uuid:"C944B76A-8694-4346-A946-8C4BA21DFABB"}
 */
function filterSede(fs)
{
	fs.addFoundSetFilterParam('idditta', '=', idditta, 'ftr_ditta');
	return fs;
}

/**
 * @properties={typeid:24,uuid:"FEA46CC6-D1F9-4978-8F7D-AD76862DD2B8"}
 */
function filterTurno(fs)
{
	fs.addFoundSetFilterParam('idditta', '=', idditta, 'ftr_ditta');
	return fs;
}

/**
 * @properties={typeid:24,uuid:"3ED2EE1C-7801-4385-86A4-95AE3E99DFA2"}
 */
function showLkpRuolo(event)
{
	return globals.ma_utl_showLkpWindow({ returnForm: controller.getName(), returnField: 'pkRuolo', lookup: 'AG_Lkp_Ruolo', methodToAddFoundsetFilter: 'filterRuolo', allowInBrowse: true });
}

/**
 * @properties={typeid:24,uuid:"1DDFC736-38EC-4215-8AF2-BA9877C0BB76"}
 */
function showLkpLavoratori(event)
{
	return globals.ma_utl_showLkpWindow({ returnForm: controller.getName(), returnField: 'pkLav', lookup: 'AG_Lkp_Lavoratorisede', methodToAddFoundsetFilter: 'filterLavoratori', allowInBrowse: true });
}

/** *
 * @param _event
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"45CE6C6A-E125-4B66-A142-2F2A6AEF7FBA"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	aggiungiResponsabile(_event);
}

/** *
 * @param _event
 * @param _triggerForm
 * @param _forceForm
 * @param _noConfirm
 *
 * @properties={typeid:24,uuid:"C6B6AC58-F9A5-4CC0-A328-3A4D8E0EBD19"}
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	_super.dc_delete(_event, _triggerForm, elements.elenco_tabless.getTabFormNameAt(1), _noConfirm);
}

/** *
 * @param _foundset
 * @param _multiDelete
 *
 * @properties={typeid:24,uuid:"37955037-B7A2-47EB-A6B2-62C8EF94F600"}
 */
function dc_delete_pre(_foundset, _multiDelete)
{
	var success = _super.dc_delete_pre(_foundset, _multiDelete) !== -1;
	
	/**
	 * Cancella anche le persone correlate, se non interne e non coincidenti con altre figure
	 */
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_funzionipersone>} */
	var funzioniFs = foundset[elements.elenco_tabless.getTabRelationNameAt(1)];
	if(success && funzioniFs && !funzioniFs.coincidecon && !funzioniFs.personainterna && funzioniFs.manuale)
	{
		success = funzioniFs.ditte_funzionipersone_to_persone && funzioniFs.ditte_funzionipersone_to_persone.deleteRecord();
	}
	
	if(success && globals.isDatore(funzioniFs.getSelectedRecord()) && ditte_to_sicurezza_datigenerali && ditte_to_sicurezza_datigenerali.datorelegalerapp)
	{
		ditte_to_sicurezza_datigenerali.datorelegalerapp = 0;
		success = true;
	}
	
	return success ? 0 : -1;
}

/**
 * @properties={typeid:24,uuid:"C67A0CB0-FF3E-4105-AABE-E140B6026259"}
 */
function getRequiredFieldsProgram()
{
	return isInShowHistory ? 'AG_Req_Funzionipersone' : null;
}

/**
 * @properties={typeid:24,uuid:"99C4E13B-4174-4585-9D21-549EB03A8277"}
 */
function getEditFormName()
{
	return forms.agd_funzione_edit.controller.getName();
}

/**
 * @properties={typeid:24,uuid:"85EA471E-B2A0-439C-8F56-0376333B0E55"}
 * 
 * @return {JSFoundset}
 */
function getEditFoundset()
{
	return foundset[elements.elenco_tabless.getTabRelationNameAt(1)];
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"2FDF50A5-3C5B-4997-A00E-242955C4ABCE"}
 * @AllowToRunInFind
 */
function filterLavoratori(_foundset)
{
	_foundset.addFoundSetFilterParam('idditta','=',idditta)
	_foundset.addFoundSetFilterParam('cessazione','^||>',globals.TODAY)
	
	return _foundset
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"F0A730D1-DF9C-4127-A871-53E774E5C491"}
 */
function onShowForm(firstShow, event) 
{
	return _super.onShowForm(firstShow, event, true)
}
