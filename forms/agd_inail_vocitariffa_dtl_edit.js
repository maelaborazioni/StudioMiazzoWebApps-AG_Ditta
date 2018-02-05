/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AD618089-9FE9-479E-9216-7BA963AE1CA8",variableType:8}
 */
var _idInailVociTariffa
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7A28B4DC-3C26-424A-98BE-D17D8FD25035"}
 */
var _voceTariffa
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"46D18DB4-F547-4C31-BA7C-D128500AAD46"}
 */
var _descVoceTariffa

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3FC0C427-3402-4E6F-AAD6-4D2163D2F556"}
 */
var _descInquadramento

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"85074614-DDBA-4F19-BC2C-6FE354513EC7",variableType:8}
 */
var _percInfortuniSaldo
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"89E9B951-474F-4822-BF78-2A2D5DF8C5FC",variableType:8}
 */
var _percMalProfSaldo
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"57348B87-EC4A-46B6-97C6-EF22BC4B39E4",variableType:8}
 */
var _percInfortuniAccon
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1AACA21C-B380-4987-849E-C2F5059D4732",variableType:8}
 */
var _percMalProfAccon
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"120F7F7E-12E0-4233-AE82-C9618418390D",variableType:93}
 */
var _periodoRischioDal
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"59439CFB-35EB-4598-9ABA-F956A2126F7C",variableType:93}
 */
var _periodoRischioAl
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"61AD590C-F023-4E4E-92E3-4CA9C3658400",variableType:8}
 */
var _percPonderazRetrib
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AF5CA3FF-5852-45AA-8028-9EA002CF47CE",variableType:8}
 */
var _tipoRiduzionePremi
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"049A6A28-03F0-43C7-B948-1B5C28514A11",variableType:8}
 */
var _rischioSilicosi

/**
 * @properties={typeid:35,uuid:"AA9D9339-19A2-4999-BD93-19A20343DB55",variableType:-4}
 */
var _isInEdit = false;

/**
 * TODO generated, please specify type and doc for the params
 * @param _rec
 *
 * @properties={typeid:24,uuid:"87E724EB-D550-414A-B44D-555E775F1E79"}
 */
function AggiornaSelezioneVoceTariffa(_rec)
{
	_idInailVociTariffa = _rec['idinailvocitariffa'];
	_voceTariffa = _rec['ditte_inailvocitariffa_to_tab_inailvocitariffa.vocetariffa'];
	_descVoceTariffa = _rec['ditte_inailvocitariffa_to_tab_inailvocitariffa.descrizione'];
	_descInquadramento = _rec['ditte_inailvocitariffa_to_tab_inailvocitariffa.tab_inailvocitariffa_to_tab_inquadramento.descrizione'];
}

/**
*
* @param {Boolean} firstShow
* @param {JSEvent} event
* @param {Boolean} svyNavBaseOnShow
*
* @properties={typeid:24,uuid:"6EC00BFA-E8EC-4D85-A775-F69E9520D0E4"}
*/
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	
	var fs = forms.agd_inail_vocitariffa_main.ditte_to_ditte_inailposizioni.ditte_inailposizioni_to_ditte_inailvocitariffa;
	if(_isInEdit)
	{
		_idInailVociTariffa = fs.iddittainailvocetariffa;
		_voceTariffa = fs.ditte_inailvocitariffa_to_tab_inailvocitariffa.vocetariffa;
		_descVoceTariffa = fs.ditte_inailvocitariffa_to_tab_inailvocitariffa.descrizione;
	    _descInquadramento = fs.ditte_inailvocitariffa_to_tab_inailvocitariffa.tab_inailvocitariffa_to_tab_inquadramento.descrizione;
	    _percInfortuniSaldo = fs.percinfortunisaldo;
		_percMalProfSaldo = fs.percmalprofsaldo;
		_percInfortuniAccon = fs.percinfortuniaccon;
		_percMalProfAccon = fs.percmalprofaccon;
		_periodoRischioDal = fs.periodorischiodal;
		_periodoRischioAl = fs.periodorischioal;
		_percPonderazRetrib = fs.percponderazretrib;
		_tipoRiduzionePremi = fs.tiporiduzionepremi;
		_rischioSilicosi = fs.rischiosilicosi;		
	}
	else
	{
		_idInailVociTariffa = null;
		_voceTariffa = null;
		_descVoceTariffa = null;
	    _descInquadramento = null;
	    _percInfortuniSaldo = null;
		_percMalProfSaldo = null;
		_percInfortuniAccon = null;
		_percMalProfAccon = null;
		_periodoRischioDal = null;
		_periodoRischioAl = null;
		_percPonderazRetrib = null;
		_tipoRiduzionePremi = null;
		_rischioSilicosi = null;
	}
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"39D33DC5-3EC3-40AF-B9FE-497F4F21E805"}
 */
function onActionConferma(event) 
{
	databaseManager.startTransaction();
	
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte_inailvocitariffa>}*/
	var fsInail = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_INAIL_VOCI_TARIFFA);
	var rec;
	
	if(_isInEdit)
	{
		foundset.loadRecords(_idInailVociTariffa);
		rec = foundset.getSelectedRecord();
	}
	else
	   rec = fsInail.getRecord(fsInail.newRecord());
	
	if(rec)
	{
		rec.idditta = forms.agd_inail_vocitariffa_main.idditta;
		rec.iddittainailposizione = forms.agd_inail_vocitariffa_main.ditte_to_ditte_inailposizioni.iddittainailposizione;
		rec.idinailvocitariffa = _idInailVociTariffa;
		rec.percinfortunisaldo = _percInfortuniSaldo;
		rec.percmalprofsaldo = _percMalProfSaldo;
		rec.percinfortuniaccon = _percInfortuniAccon;
		rec.percmalprofaccon = _percMalProfAccon;
		rec.periodorischiodal = _periodoRischioDal;
		rec.periodorischioal = _periodoRischioAl;
		rec.percponderazretrib = _percPonderazRetrib;
		rec.rischiosilicosi = _rischioSilicosi;
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
 * @properties={typeid:24,uuid:"9EA933A5-C874-4C9B-A48A-5D5DD71B446A"}
 */
function onActionAnnulla(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

