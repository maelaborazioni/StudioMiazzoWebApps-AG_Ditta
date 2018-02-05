/**
 * @type {String}
 * @properties={typeid:35,uuid:"59E6703A-7767-4854-9945-72C73DBCFF43"}
 */
var codiceSede = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"DEFE375E-5229-43F4-8139-7D79A94CA2A6"}
 */
var descrizioneSede = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"21D47988-2C70-4803-9953-DB654545DB78",variableType:93}
 */
var aperturaSede = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"73922C62-BAD6-4FF4-8788-28AC48ADD38D",variableType:93}
 */
var cessazioneSede =null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"E809F301-D6E3-4876-9388-70683984A47C",variableType:93}
 */
var dataPatrono = null;
/**
 * @properties={typeid:35,uuid:"C839583D-3557-4FDA-8139-B3BA9E018724",variableType:-4}
 */
var codComune = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"F24C2877-B9BD-4C54-816D-6B3410D80D03"}
 */
var comune = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"1C9D4C14-DF8C-4462-A9D0-81A1E1B2CC9D"}
 */
var cap = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"75F361A3-89B7-44A9-BB6C-D93E612D8718"}
 */
var indirizzo = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"635BED17-9C9B-46D1-B8BF-37F01A479918"}
 */
var provincia = null;

/**
 * @properties={typeid:35,uuid:"146DC28B-C66E-4705-B63D-1020AE87D00F",variableType:-4}
 */
var isInEdit = false;

/**
 * TODO generated, please specify type and doc for the params
 * @param _rec
 *
 * @properties={typeid:24,uuid:"72C0F13F-F22C-4047-A8C1-8E8C6B4AC92A"}
 */
function AggiornaAnagraficaComune(_rec)
{
	codComune = _rec['codcomune'];
	comune = _rec['descrizione'];
	cap = _rec['cap'];
	provincia = _rec['provincia'];
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FD2A03FF-C7F0-495B-8951-C520E8C72D98"}
 */
function onActionAnnulla(event) 
{
	databaseManager.rollbackTransaction();
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
 * @properties={typeid:24,uuid:"1496A8E5-71A6-4E4D-828E-0F434255AB41"}
 */
function onActionConferma(event) 
{
	databaseManager.startTransaction();
	var recInd;
	if(isInEdit)
	{
		recInd = forms.agd_sdl_sedidilavoro_tbl.ditte_sedi_to_ditte_indirizzi.getSelectedRecord();
		
	}
	else
	{
		/** @type {JSFoundset<db:/ma_anagrafiche/ditte_indirizzi>} */
		var fsInd = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INDIRIZZI);
	    recInd = fsInd.getRecord(fsInd.newRecord());
	}
	recInd.idditta = forms.agd_sdl_sedidilavoro_main.idditta;
	recInd.cap = cap;
	recInd.codcomune = codComune;
	recInd.codstatoestero = 1;
	recInd.codtipoindirizzo = 'UO';
	recInd.datadecorrenza = null;
	recInd.datarilevazione = new Date;
	recInd.descrizione = 'Unità operativa';
	recInd.indirizzo = indirizzo;
	recInd.manuale = 1;

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
	
	databaseManager.startTransaction();
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte_sedi>} */
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_SEDI);
	var rec;
	if(isInEdit)
		rec = forms.agd_sdl_sedidilavoro_tbl.ditte_sedi_to_ditte_indirizzi.getSelectedRecord();
	else
		rec = fs.getRecord(fs.newRecord());
	
	rec.idditta = forms.agd_sdl_sedidilavoro_main.idditta;
	rec.codice = codiceSede;
	rec.descrizione = descrizioneSede;
	rec.dataapertura = aperturaSede;
	rec.datachiusura = cessazioneSede;
	rec.festapatronale = dataPatrono == null ? null : utils.stringRight(globals.dateFormat(dataPatrono,globals.ISO_DATEFORMAT).toString(),2) 
	                                                  + utils.stringMiddle(globals.dateFormat(dataPatrono,globals.ISO_DATEFORMAT).toString(),5,2); 
	rec.codtiposede = 'SO';
	rec.iddittaindirizzo = recInd.iddittaindirizzo;
	rec.abilitataturni = 0;
	rec.manuale = 1;
	
	if(!databaseManager.commitTransaction())
	{		
		var failedrecords = databaseManager.getFailedRecords();
		if (failedrecords && failedrecords.length > 0)
		{
			for(var f = 0; f < failedrecords.length; f++)
				application.output(failedrecords[f].exception.getErrorCode() + ' - ' + failedrecords[f].exception.getMessage(),LOGGINGLEVEL.WARNING);
		}
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Inserimento sede di lavoro non riuscito');
	    return;
	}
	databaseManager.refreshRecordFromDatabase(fs,-1);
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"7A05C2A1-C2EB-441D-9C15-8A948D71504D"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	var fs = forms.agd_sdl_sedidilavoro_tbl.foundset;
	
	if(isInEdit)
	{
		codiceSede = fs.codice;
		descrizioneSede = fs.descrizione;
		aperturaSede = fs.dataapertura;
		cessazioneSede = fs.datachiusura;
		dataPatrono = new Date(globals.TODAY.getFullYear(),parseInt(utils.stringRight(fs.festapatronale,2)),parseInt(utils.stringLeft(fs.festapatronale,2)));
		indirizzo = fs.ditte_sedi_to_ditte_indirizzi.indirizzo;
		codComune = fs.ditte_sedi_to_ditte_indirizzi.codcomune;
		cap = fs.ditte_sedi_to_ditte_indirizzi.cap;
		provincia = fs.ditte_sedi_to_ditte_indirizzi.ditte_indirizzi_to_tab_comuniitalia.provincia;
		comune = fs.ditte_sedi_to_ditte_indirizzi.ditte_indirizzi_to_tab_comuniitalia.descrizione;
	}
	else
	{
		codiceSede = null;
		descrizioneSede = null;
		aperturaSede = null;
		cessazioneSede = null;
		dataPatrono = null;
		indirizzo = null;
		codComune = null;
		provincia = null;
		cap = null;
		comune = null;
	}
	
	_super.onShowForm(firstShow, event, svyNavBaseOnShow)
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}
