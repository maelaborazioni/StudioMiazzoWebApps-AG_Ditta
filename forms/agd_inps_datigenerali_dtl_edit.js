/**
 * @properties={typeid:35,uuid:"1A72AA62-CAA9-427D-998C-263C24B61EF6",variableType:-4}
 */
var isInEdit = false;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"C18850E7-EEA5-4C98-B8B9-D5A23A1D9FDB",variableType:8}
 */
var posInps = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"98B95D41-0C9C-4029-AFF6-28EAF12C44F9",variableType:8}
 */
var matricolaInps = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"5E39ED87-FB88-431F-B965-35CA8B99F08D",variableType:8}
 */
var codInps = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"F6B2CE8F-C45D-4CAC-AF2F-FE443F34E4FF"}
 */
var descInps = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"745AFB0A-A34D-4A8F-BA68-795DC990A373"}
 */
var csc = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"4B08C439-7D9F-441C-A8EB-282543170406"}
 */
var codAut = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"0475995F-AE74-4E78-B7E3-49E913AFDDBB",variableType:93}
 */
var fineElaborazione = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"F7E36D55-CB1B-448F-A9C3-52FB2EE37C3E"}
 */
var indirizzo = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"D1B8535D-D272-4C30-90A2-FAA3A1A93DFC"}
 */
var comune = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"CA628031-6001-4810-96C7-59A65FEE83CF"}
 */
var codComune = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"4E10141A-DF8E-40E0-8626-274DB4792BB3"}
 */
var provincia = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"8DCD614D-65A2-4EA2-B36C-8ED5DE7DB4BF"}
 */
var cap = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"BB281730-82A8-41D7-86FF-2CB93CB26AB0",variableType:8}
 */
var codAteco = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"999B9F9D-8F62-4851-83CC-678B73506CE0"}
 */
var descAteco = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"245CB075-AA6D-425A-BEF2-11BEAD22CB5D",variableType:8}
 */
var nprattivita = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"E53D1D44-162D-4308-A263-54B1C978525B",variableType:8}
 */
var codSettoreAppartenenza = null;
/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"B0346513-EB4E-430B-8E6A-02DB79ED3146"}
 */
var descSettoreAppartenenza = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"401F7155-8822-4C50-A5F2-3022086A516E",variableType:8}
 */
var numDip = null;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D9A96BB1-DFF1-4397-82AA-FD5E10921A52"}
 */
function onActionAnnulla(event) 
{
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
 * @properties={typeid:24,uuid:"448706F5-9535-4404-945E-474696CE5A70"}
 */
function onActionConferma(event) 
{
	databaseManager.startTransaction();
	
	var recInd;
	if(isInEdit)
	{
		recInd = forms.agd_inps_datigenerali_tbl.ditte_inps_to_ditte_indirizzi.getSelectedRecord();
	}
	else
	{
		/** @type {JSFoundset<db:/ma_anagrafiche/ditte_indirizzi>} */
		var fsInd = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INDIRIZZI);
	    recInd = fsInd.getRecord(fsInd.newRecord());
	}
	recInd.idditta = forms.agd_inps_datigenerali_main.idditta;
	recInd.cap = cap;
	recInd.codcomune = codComune;
	recInd.codstatoestero = 1;
	recInd.codtipoindirizzo = globals.TipiIndirizzoDitta.UNITA_OPERATIVA;
	recInd.datadecorrenza = null;
	recInd.datarilevazione = new Date;
	recInd.descrizione = globals.getDescrizioneTipoIndirizzo(globals.TipiIndirizzoDitta.UNITA_OPERATIVA);
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
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte_inps>}*/
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INPS);
	var rec;
	if(isInEdit)
	   rec = forms.agd_inps_datigenerali_tbl.ditte_inps_to_ditte_indirizzi.getSelectedRecord();
	else
	   rec = fs.getRecord(fs.newRecord());
	
	rec.codattivita = nprattivita;
	rec.codautorizzazione = codAut;
	rec.codcsc = csc;
	rec.codsedeinps = codInps;
	rec.codsettore = codSettoreAppartenenza;
	rec.idditta = forms.agd_inps_datigenerali_main.idditta;
	rec.iddittaindirizzo = recInd.iddittaindirizzo;
	rec.matricola = matricolaInps;
	rec.numdipcontributi = numDip;
	rec.posizioneinps = posInps;
	rec.datafineelaborazione = fineElaborazione;
	
	if(!databaseManager.commitTransaction())
	{
		var failedrecords = databaseManager.getFailedRecords();
		if (failedrecords && failedrecords.length > 0)
		{
			for(var f = 0; f < failedrecords.length; f++)
				application.output(failedrecords[f].exception.getErrorCode() + ' - ' + failedrecords[f].exception.getMessage(),LOGGINGLEVEL.WARNING);
		}
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Inserimento posizione INPS non riuscita');
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
 * @properties={typeid:24,uuid:"8FF2B4B5-9FE9-4103-88BE-8B1F92F3B58F"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow)
    globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());	
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"D6BC9BAE-46A7-4E69-AAEA-ECFDFF8E4BC1"}
 */
function AggiornaComune(_rec)
{
	codComune = _rec['codcomune'];	
	comune = _rec['descrizione'];	
	provincia = _rec['provincia'];
	cap = _rec['cap'];
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"BB57B08D-D554-4D45-9C12-B946E5477998"}
 */
function AggiornaSedeINPS(_rec)
{
	codInps = _rec['codice'];
	descInps = _rec['descrizione']
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"DF9A874C-02EE-4F26-8F2D-53E77A6B156E"}
 */
function AggiornaAttivitaDitta(_rec)
{
	nprattivita = _rec['nprattivita'];
	codAteco = _rec['codateco'];
	descAteco = _rec['descrizioneateco'];
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"3B6B13FC-2EBC-4370-96E5-92525BF91F24"}
 */
function AggiornaSettoreAttivita(_rec)
{
	codSettoreAppartenenza = _rec['codsettore'];
	descSettoreAppartenenza = _rec['descrizione'];
}
