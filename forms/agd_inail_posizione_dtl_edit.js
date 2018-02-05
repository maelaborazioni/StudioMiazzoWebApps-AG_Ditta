/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"145412BB-B8AE-42B2-99E8-F64BE5859590",variableType:8}
 */
var _posInail
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"159EEAC3-6D83-4DF4-8F08-6708C442247F"}
 */
var _descPosInail
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6B24B6FF-D816-4CA1-8393-4DF16E8EB6A3"}
 */
var _numPosizAssic
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E730671D-D979-45AE-9061-27847C852043"}
 */
var _codComune
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D206FFD8-371C-4F68-A0CF-4EF647BAE4B3"}
 */
var _comune
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EEC57100-6103-4898-A992-29BE195CB7E7"}
 */
var _provincia
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BC478892-0308-4C69-ADCB-3E9C19E3D14C"}
 */
var _cap
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D226B2C1-AF57-44F1-AD33-9195E0C5FB6A"}
 */
var _codContrPosAssic
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A3A7011C-A36D-4747-B64F-EA11407A9688"}
 */
var _codSedeInail
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"2A26558A-E649-4BA1-B004-8BE81032F951",variableType:93}
 */
var _dataInizioAttivita
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"9A546222-C6A5-4F80-A38A-E6486755F40E",variableType:93}
 */
var _dataCessazAttivita
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F8732E7F-0A57-43F9-8733-F5BC2F9F023D",variableType:8}
 */
var _vecchiaNormativa = 0;

/**
 * @properties={typeid:35,uuid:"2253CCF7-C081-4DF2-BE71-41715AE17DA8",variableType:-4}
 */
var _isInEdit = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"B9DE38B1-D437-4C2F-B133-AE2F4EA305E2",variableType:8}
 */
var _idInailPos = null;

/**
 * TODO generated, please specify type and doc for the params
 * @param _rec
 *
 * @properties={typeid:24,uuid:"EDFC3A8A-4903-4BCE-8D1A-5716EB99AE66"}
 */
function AggiornaAnagraficaComune(_rec)
{
	_codComune = _rec['codcomune'];
	_comune = _rec['descrizione'];
	_cap = _rec['cap'];
	_provincia = _rec['provincia'];
}
/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"557E0D97-79AB-4EE1-A2B2-607ED84EACC9"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	var fs = forms.agd_inail_datigenerali_main.ditte_to_ditte_inailposizioni;
	if(_isInEdit)
	{
		_posInail  = fs.posizioneinail;
	    _descPosInail = fs.descrizione;
		_numPosizAssic = fs.numposizassic;
		_codComune = fs.ditte_inailposizioni_to_tab_comuniitalia.codcomune;
		_comune = fs.ditte_inailposizioni_to_tab_comuniitalia.descrizione;		
		_provincia = fs.ditte_inailposizioni_to_tab_comuniitalia.provincia;
		_cap = fs.ditte_inailposizioni_to_tab_comuniitalia.cap;
		_codContrPosAssic = fs.codcontrposassic;
		_codSedeInail = fs.codsedeinail;
		_dataInizioAttivita = fs.datainizioattivita;
		_dataCessazAttivita  = fs.datacessazattivita;
		_vecchiaNormativa = fs.vecchianormativa;
	}
	else
	{
		_posInail  = null;
	    _descPosInail = null;
		_numPosizAssic = null;
		_codComune = null;
		_comune = null;		
		_provincia = null;
		_cap = null;
		_codContrPosAssic = null;
		_codSedeInail = null;
		_dataInizioAttivita = null;
		_dataCessazAttivita  = null;
		_vecchiaNormativa = 0;
	}
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F36E8DDE-DA8E-4DCE-A5C1-2DD1205F007E"}
 */
function onActionConferma(event)
{
	databaseManager.startTransaction();
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte_inailposizioni>}*/
	var fsInail = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INAIL_POSIZIONI);
	var rec;
	if(_isInEdit)
	{
		foundset.loadRecords(_idInailPos);
		rec = foundset.getSelectedRecord();
	}
	else
		rec = fsInail.getRecord(fsInail.newRecord());
	
	if(rec)
	{
		rec.idditta = forms.agd_inail_datigenerali_main.idditta;
		rec.posizioneinail = _posInail;
		rec.descrizione = _descPosInail;
		rec.numposizassic = _numPosizAssic;
		rec.codcomune770 = _codComune;
		rec.codcontrposassic = _codContrPosAssic;
		rec.codsedeinail = _codSedeInail;
		rec.datainizioattivita = _dataInizioAttivita;
		rec.datacessazattivita = _dataCessazAttivita;
		rec.vecchianormativa = _vecchiaNormativa;
		rec.manuale = 1;
	
		if(!databaseManager.commitTransaction())
		{
			var failedrecords = databaseManager.getFailedRecords();
			if (failedrecords && failedrecords.length > 0)
			{
				for(var fInd = 0; fInd < failedrecords.length; fInd++)
					application.output(failedrecords[fInd].exception.getErrorCode() + ' - ' + failedrecords[fInd].exception.getMessage(),LOGGINGLEVEL.WARNING);
			}
			databaseManager.rollbackTransaction();
			globals.ma_utl_showErrorDialog('Inserimento posizione INAIL non riuscito');
		    return;
		}
		
		databaseManager.refreshRecordFromDatabase(fsInail,-1);
	}
	else
	{
		globals.ma_utl_showErrorDialog('Errore durante la creazione del nuovo record, si prega di riprovare');
		databaseManager.rollbackTransaction();
	}
	
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
 * @properties={typeid:24,uuid:"137E25B4-21C5-4751-89F1-9EFAF5B03879"}
 */
function onActionAnnulla(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}
